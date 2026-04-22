import { useState, useRef } from 'react';
import { BackgroundBeams } from '../components/ui/BackgroundBeams';
import { FadeIn } from '../components/ui/FadeIn';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Zap, AlertCircle, ArrowRight, CheckCircle2, Download } from 'lucide-react';
import { SignaturePad } from '../components/ui/SignaturePad';
import type { SignaturePadRef } from '../components/ui/SignaturePad';
import jsPDF from 'jspdf';
import { supabase } from '../lib/supabase';

export function PromoPage() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    
    // Step 1 State
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    
    // Step 2 State (Mocked data received from backend)
    const [officinaName, setOfficinaName] = useState('');
    const [turnover, setTurnover] = useState(1500);
    const [activationDate, setActivationDate] = useState<string | null>(null);

    // Step 3 State
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const signatureRef = useRef<SignaturePadRef>(null);
    const [finalSignature, setFinalSignature] = useState<string>('');

    const validateEmail = (e: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    };

    // Note: We keep GOOGLE_SCRIPT_URL for email lookup if needed, 
    // but we use Supabase for persistent and secure storage.
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwiYZiJoEZ4xagiDqlvN4LOhf19kFBoUsfJwF3kyBHrAxHnk4am_f-sjzQTVYijTtxf/exec';

    const handleEmailLookup = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMessage('Inserisci un indirizzo email aziendale valido.');
            return;
        }

        setStatus('loading');
        
        try {
            // Send as text/plain to bypass CORS preflight restrictions on Google Apps Script
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify({ action: 'findUser', email })
            });

            const data = await response.json();
            
            if (data.success) {
                if (data.activationDate) {
                    setActivationDate(data.activationDate);
                    setStatus('error');
                    setErrorMessage(`Spiacente, hai già attivato questa promozione in data: ${data.activationDate}`);
                    return;
                }
                setOfficinaName(data.officinaName);
                setStatus('idle');
                setStep(2);
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Email non trovata nel nostro database.');
            }
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(`Errore: ${error.message || 'di connessione al server'}`);
            console.error('Fetch error:', error);
        }
    };

    const handleFinalSubmit = async () => {
        if (!acceptedTerms) {
            setStatus('error');
            setErrorMessage('Devi accettare le condizioni per attivare la promozione.');
            return;
        }

        if (signatureRef.current?.isEmpty()) {
            setStatus('error');
            setErrorMessage('La firma è obbligatoria per completare l\'attivazione.');
            return;
        }

        setStatus('loading');

        try {
            const signatureData = signatureRef.current?.getTrimmedDataURL();
            if (!signatureData) throw new Error('Errore nella cattura della firma');
            
            setFinalSignature(signatureData); // Save for the PDF instance

            // 1. Generate PDF document
            const doc = getPDFDocument(signatureData);
            const pdfBlob = doc.output('blob');
            
            // 2. Encrypt PDF (Optional, but highly recommended)
            // For simplicity and to avoid large memory issues with encryption of binary blobs 
            // in this specific demo, we'll store the PDF securely with Supabase RLS.
            // However, we can still encrypt it if the user wants.
            
            // 3. Upload PDF to Supabase Storage
            const fileName = `Contratto_${Date.now()}_${email.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
            const { error: uploadError } = await supabase.storage
                .from('signatures')
                .upload(fileName, pdfBlob);

            if (uploadError) throw uploadError;

            // 4. Save Record to Database
            const { error: dbError } = await supabase
                .from('promo_activations')
                .insert({
                    email,
                    officina_name: officinaName,
                    turnover,
                    contract_path: fileName
                });

            if (dbError) throw dbError;

            // 5. Update Google Sheet status (Notification only, no sensitive data)
            try {
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain;charset=utf-8',
                    },
                    body: JSON.stringify({ action: 'signPromo', email })
                });
            } catch (googleError) {
                console.warn('Google Sheet update failed, but Supabase record is safe.', googleError);
            }

            setStatus('success');
            setStep(4);
        } catch (error: any) {
            setStatus('error');
            setErrorMessage(`Errore durante l'attivazione: ${error.message || 'di connessione'}`);
            console.error(error);
        }
    };

    const getPDFDocument = (signatureToUse?: string) => {
        const doc = new jsPDF();
        const sig = signatureToUse || finalSignature;
        
        // Background and Box
        doc.setFillColor(245, 247, 250);
        doc.rect(0, 0, 210, 297, 'F'); // A4 Background

        doc.setFillColor(255, 255, 255);
        doc.setDrawColor(200, 200, 200);
        doc.rect(15, 15, 180, 267, 'FD'); // Main White Container
        
        // Header
        const logoUrl = 'https://i.postimg.cc/L5JPryzM/cra_logo_default_05_(1).png';
        try {
            doc.addImage(logoUrl, 'PNG', 25, 15, 30, 30);
        } catch (e) {
            console.warn("Could not load logo for PDF", e);
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(30, 41, 59);
        doc.text("Centro Ricambi Auto Srl", 185, 25, { align: "right" });
        
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text("P.IVA: IT 06795941217", 185, 30, { align: "right" });
        doc.text("Via Nuova Poggioreale 48, 80143, Napoli (NA)", 185, 35, { align: "right" });
        doc.text("Email: info@centroricambiautosrl.it", 185, 40, { align: "right" });
        doc.text("Tel: +39 081 281732 | WhatsApp: +39 02 846 3035", 185, 45, { align: "right" });

        // Title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(18);
        doc.setTextColor(30, 41, 59); // Slate 800
        doc.text("ATTESTATO DI ADESIONE PROMOZIONE", 105, 65, { align: "center" });
        doc.setLineWidth(0.5);
        doc.setDrawColor(253, 197, 67); // Accent Yellow
        doc.line(70, 70, 140, 70);

        // Client Details Section
        doc.setFillColor(248, 250, 252); // Slate 50
        doc.setDrawColor(226, 232, 240); // Slate 200
        doc.rect(25, 85, 160, 45, 'FD'); // Details Box

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(71, 85, 105); // Slate 500
        doc.text("DATI INTESTATARIO", 30, 95);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        doc.setTextColor(15, 23, 42); // Slate 900
        doc.text(`Officina:`, 30, 105);
        doc.setFont('helvetica', 'bold');
        doc.text(`${officinaName}`, 60, 105);
        
        doc.setFont('helvetica', 'normal');
        doc.text(`Email Aut.:`, 30, 113);
        doc.setFont('helvetica', 'bold');
        doc.text(`${email}`, 60, 113);

        doc.setFont('helvetica', 'normal');
        doc.text(`Fatturato (Stima):`, 30, 121);
        doc.setFont('helvetica', 'bold');
        doc.text(`€ ${turnover}`, 65, 121);

        // Body Text
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(71, 85, 105); // Slate 500
        doc.text("CONDIZIONI SOTTOSCRITTE", 25, 145);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(51, 65, 85); // Slate 700
        const termsText = "Con la presente e apponendo la firma sottostante, il titolare/referente dell'officina dichiara di aderire formalmente all'iniziativa di incentivazione commerciale promossa da Centro Ricambi Auto Srl.\n\nSi prende atto e si accetta che il 3% del fatturato generato sul portale web e-commerce verrà calcolato a fine periodo e regolarmente erogato sotto forma di \"Crediti Targhe\" per il servizio di ricerca (valore unitario 0,25€ cad.), a partire dal primo giorno del mese successivo.";
        const splitTerms = doc.splitTextToSize(termsText, 160);
        doc.text(splitTerms, 25, 155, { lineHeightFactor: 1.5 });

        // Signature Area
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Firma Digitale Apposta Dalla Officina:", 25, 205);

        if (sig) {
            try {
                // Add a border for the signature
                doc.setDrawColor(226, 232, 240);
                doc.rect(25, 210, 80, 35);
                doc.addImage(sig, 'PNG', 25, 210, 80, 35);
            } catch (e) {
                console.warn("Could not load signature into PDF", e);
            }
        }

        // Footer Date and System ID
        doc.setFontSize(9);
        const datetime = new Date().toLocaleString('it-IT');
        doc.text(`Autenticato in data: ${datetime}`, 185, 240, { align: "right" });

        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Documento generato automaticamente. Promo B2B - Centro Ricambi Auto Srl - L2F", 105, 275, { align: "center" });

        return doc;
    };

    const generatePDF = () => {
        const doc = getPDFDocument();
        // Download the PDF
        doc.save(`Contratto_Promo_${officinaName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
    };

    return (
        <div className="min-h-screen bg-bg-main text-text-main font-sans selection:bg-accent-primary/30 relative overflow-hidden">
            <BackgroundBeams />
            
            <div className="relative z-10 max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
                <FadeIn>
                    <div className="text-center space-y-6 mb-12">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-accent-primary/20 bg-accent-primary/5 text-accent-primary text-xs font-mono tracking-widest uppercase mb-4">
                            <span className="w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
                            Promo Attiva
                        </div>
                        {step < 4 ? (
                            <>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                                    La tua <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-yellow-200">Promo Esclusiva</span>
                                </h1>
                                <p className="text-xl text-text-muted max-w-2xl mx-auto">
                                    Riservata esclusivamente alle officine attive sul nostro network.
                                </p>
                            </>
                        ) : null}
                    </div>
                </FadeIn>

                <div className="w-full max-w-2xl bg-bg-card/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-purple-600 rounded-3xl opacity-10 blur-xl pointer-events-none" />

                    <div className="relative z-10">
                        {step === 1 && (
                            <form onSubmit={handleEmailLookup} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="space-y-2 text-center mb-8">
                                    <h2 className="text-3xl font-bold text-white">Verifica Identità</h2>
                                    <p className="text-text-muted">Inserisci l'email con cui operi abitualmente per accedere al tuo regalo aziendale.</p>
                                </div>
                                
                                <div className="space-y-4">
                                    <label htmlFor="lookup-email" className="text-xs font-mono uppercase tracking-widest text-accent-primary">
                                        Email Registrata <span className="text-white">*</span>
                                    </label>
                                    <Input
                                        id="lookup-email"
                                        type="email"
                                        placeholder="es. amministrazione@officinarossi.it"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status === 'error') setStatus('idle');
                                        }}
                                        disabled={status === 'loading'}
                                        error={status === 'error'}
                                        className="h-16 text-lg bg-bg-main/70 border-white/20 focus:border-accent-primary focus:bg-bg-main/90 font-mono"
                                    />
                                    
                                    {status === 'error' && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                            <p className="text-sm text-red-400 font-mono">{errorMessage}</p>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={status === 'loading' || !email.trim()}
                                    className="w-full h-16 text-lg bg-accent-primary text-bg-main hover:bg-yellow-400 font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(253,197,67,0.2)] hover:shadow-[0_0_50px_rgba(253,197,67,0.4)] transition-all flex items-center justify-center gap-3 group"
                                >
                                    {status === 'loading' ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-bg-main/20 border-t-bg-main rounded-full animate-spin" />
                                            VERIFICA IN CORSO...
                                        </>
                                    ) : (
                                        <>
                                            VERIFICA EMAIL
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                        
                        {step === 2 && (
                            <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
                                <div className="text-center space-y-4">
                                    <h2 className="text-3xl font-bold text-white">
                                        Ciao <span className="text-accent-primary">{officinaName}</span>,
                                    </h2>
                                    <p className="text-lg text-text-muted leading-relaxed">
                                        abbiamo una sorpresa esclusiva per te. Per premiare la tua fedeltà come cliente speciale e attivo sul nostro e-commerce, abbiamo attivato un programma di cashback unico.
                                    </p>
                                    <p className="text-lg text-white font-medium bg-accent-primary/10 border border-accent-primary/20 p-4 rounded-xl mt-4">
                                        Riceverai il <span className="text-accent-primary font-bold">3% del tuo fatturato web</span> trasformato automaticamente in <span className="text-accent-primary font-bold">crediti targhe</span> ogni primo del mese.
                                    </p>
                                </div>

                                <div className="bg-bg-main/50 border border-white/10 p-6 rounded-2xl space-y-6">
                                    <h3 className="text-xl font-bold text-center flex items-center justify-center gap-2">
                                        <Zap className="w-5 h-5 text-accent-primary" />
                                        Simulatore Vantaggi
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <label className="text-sm font-mono text-text-muted uppercase tracking-widest flex justify-between">
                                            <span>Stima Fatturato Mensile</span>
                                            <span className="text-accent-primary font-bold">{turnover} €</span>
                                        </label>
                                        <input 
                                            type="range" 
                                            min="100" 
                                            max="5000" 
                                            step="50"
                                            value={turnover}
                                            onChange={(e) => setTurnover(Number(e.target.value))}
                                            className="w-full h-2 bg-bg-main rounded-lg appearance-none cursor-pointer accent-accent-primary"
                                        />
                                        <div className="flex justify-between text-xs text-text-muted font-mono">
                                            <span>100 €</span>
                                            <span>5.000 €+</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                        <div className="bg-bg-card/50 p-4 rounded-xl text-center border border-white/5 relative overflow-hidden">
                                            <p className="text-xs text-text-muted font-mono uppercase tracking-wider mb-2">Cashback (3%)</p>
                                            <p className="text-3xl font-bold text-white">{((turnover * 3) / 100).toFixed(2)} €</p>
                                        </div>
                                        <div className="bg-accent-primary/10 p-4 rounded-xl text-center border border-accent-primary/20 relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-accent-primary/5 group-hover:bg-accent-primary/10 transition-colors" />
                                            <p className="text-xs text-accent-primary font-mono uppercase tracking-wider mb-2 flex items-center justify-center gap-1">
                                                Targhe Omaggio
                                            </p>
                                            <p className="text-4xl font-black text-accent-primary drop-shadow-[0_0_15px_rgba(253,197,67,0.5)]">
                                                +{Math.floor(((turnover * 3) / 100) / 0.25)}
                                            </p>
                                            <p className="text-[10px] text-text-muted mt-1 opacity-70">Valore unitario: 0,25€</p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => setStep(3)}
                                    className="w-full h-16 text-lg bg-accent-primary text-bg-main hover:bg-yellow-400 font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(253,197,67,0.2)] hover:shadow-[0_0_50px_rgba(253,197,67,0.4)] transition-all flex items-center justify-center gap-3 group"
                                >
                                    CONTINUA
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-8">
                                <div className="text-center space-y-2 mb-8">
                                    <h2 className="text-3xl font-bold text-white">Conferma Attivazione</h2>
                                    <p className="text-text-muted">Firma il modulo per attivare formalmente la promozione sul tuo account.</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Legal Checkbox */}
                                    <div className="flex items-start gap-4 p-4 bg-bg-main/50 rounded-xl border border-white/5">
                                        <div className="relative flex items-center h-6 mt-1">
                                            <input
                                                id="promo-terms"
                                                type="checkbox"
                                                checked={acceptedTerms}
                                                onChange={(e) => {
                                                    setAcceptedTerms(e.target.checked);
                                                    if (status === 'error') setStatus('idle');
                                                }}
                                                className="peer w-6 h-6 cursor-pointer appearance-none rounded-md border-2 border-slate-600 bg-bg-main checked:bg-accent-primary checked:border-accent-primary transition-all"
                                            />
                                            <CheckCircle2 className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-bg-main w-6 h-6 transition-opacity" />
                                        </div>
                                        <label htmlFor="promo-terms" className="text-sm text-text-muted cursor-pointer select-none leading-relaxed">
                                            Dichiaro di voler aderire all'iniziativa di incentivazione e accetto che il 3% del fatturato web generato venga erogato sotto forma di crediti per il servizio ricerca targhe il mese successivo.
                                        </label>
                                    </div>

                                    {/* Signature Area */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-mono uppercase tracking-widest text-accent-primary">
                                            Firma Titolare / Referente
                                        </label>
                                        <SignaturePad 
                                            ref={signatureRef} 
                                            error={status === 'error' && signatureRef.current?.isEmpty()}
                                            onEnd={() => status === 'error' && setStatus('idle')}
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 animate-in shake">
                                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                                            <p className="text-sm text-red-400 font-mono">{errorMessage}</p>
                                        </div>
                                    )}

                                    <Button
                                        onClick={handleFinalSubmit}
                                        disabled={status === 'loading'}
                                        className="w-full h-16 text-lg bg-green-500 text-white hover:bg-green-400 font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_50px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-3 group border border-green-400/50 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12" />
                                        {status === 'loading' ? (
                                            <span className="flex items-center justify-center gap-3 relative z-10">
                                                <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                ELABORAZIONE...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2 relative z-10">
                                                <CheckCircle2 className="w-6 h-6" />
                                                CONFERMA E ATTIVA
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="animate-in zoom-in-50 fade-in duration-700 flex flex-col items-center py-12 space-y-6 text-center">
                                <div className="w-24 h-24 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.3)]">
                                    <CheckCircle2 className="w-12 h-12 fill-current" />
                                </div>
                                <div className="space-y-4 mb-2">
                                    <h3 className="text-4xl font-bold text-white tracking-tight">PROMO ATTIVATA</h3>
                                    <p className="text-text-muted text-lg max-w-md mx-auto">
                                        Grazie <span className="text-white font-medium">{officinaName}</span>. La tua richiesta è stata registrata. Riceverai i tuoi primi crediti targa all'inizio del prossimo mese!
                                    </p>
                                </div>
                                
                                <Button 
                                    onClick={generatePDF}
                                    className="w-full h-14 bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary border border-accent-primary/30 flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    SCARICA CONTRATTO (PDF)
                                </Button>

                                <Button 
                                    onClick={() => window.location.href = '/'}
                                    className="mt-4 text-sm bg-transparent hover:bg-white/5 text-text-muted border-none underline underline-offset-4"
                                >
                                    Torna alla Home
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
