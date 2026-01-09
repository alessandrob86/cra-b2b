import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle2, AlertCircle, Zap, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TermsModal } from '../ui/TermsModal';
import { BackgroundBeams } from '../ui/BackgroundBeams';

export function ContactForm() {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already_submitted'>('idle');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const hasSubmitted = localStorage.getItem('nomad_form_submitted');
        if (hasSubmitted) {
            setStatus('already_submitted');
        }
    }, []);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZYwrgS5sW7GwMQHyLRctx7XoJ5qntds_nSsHwdGTx869cXkTvuw_HJM8k1FSReOsX/exec';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!companyName.trim()) {
            setStatus('error');
            setErrorMessage('Il nome dell\'officina è obbligatorio');
            return;
        }

        if (!validateEmail(email)) {
            setStatus('error');
            setErrorMessage('Inserisci un indirizzo email valido');
            return;
        }

        if (email !== confirmEmail) {
            setStatus('error');
            setErrorMessage('Le email non corrispondono');
            return;
        }

        if (!acceptedTerms) {
            setStatus('error');
            setErrorMessage('Devi accettare i termini e le condizioni');
            return;
        }

        setStatus('loading');

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({ email, companyName })
            });

            setStatus('success');
            setEmail('');
            setConfirmEmail('');
            setCompanyName('');
            setAcceptedTerms(false);
            localStorage.setItem('nomad_form_submitted', 'true');

        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMessage('Errore di connessione. Riprova.');
        }
    };

    if (status === 'already_submitted') {
        return (
            <section id="activation-form" className="relative py-32 px-4 overflow-hidden min-h-[80vh] flex items-center justify-center">
                <BackgroundBeams />
                <div className="relative z-10 max-w-xl mx-auto text-center w-full">
                    <div className="bg-bg-main/80 backdrop-blur-xl p-8 rounded-2xl border border-accent-primary/30 shadow-[0_0_50px_rgba(253,197,67,0.1)]">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-primary rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-primary rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-primary rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-primary rounded-br-lg" />

                        <div className="flex flex-col items-center py-8 space-y-6">
                            <div className="w-20 h-20 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">SYSTEM ACTIVATED</h3>
                                <p className="text-text-muted font-mono text-sm">
                                    Richiesta già processata. Controlla il terminale di posta.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="activation-form" className="relative py-32 px-4 overflow-hidden">
            <BackgroundBeams />
            <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded border border-accent-primary/20 bg-accent-primary/5 text-accent-primary text-xs font-mono tracking-widest uppercase mb-4"
                    >
                        <Terminal className="w-3 h-3" />
                        <span>Secure Connection Established</span>
                    </motion.div>

                    <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                        Inizia la <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-yellow-200">Rivoluzione</span>
                    </h2>
                    <p className="text-lg text-text-muted max-w-2xl mx-auto">
                        Inserisci i dati del terminale per inizializzare la piattaforma.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <motion.div
                        className="relative bg-bg-card/30 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl overflow-hidden group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Futuristic Borders */}
                        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
                        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-primary/50 to-transparent" />
                        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent-primary/20 to-transparent" />
                        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-accent-primary/20 to-transparent" />

                        {/* Animated Glow Spot */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent-primary to-purple-600 rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition duration-1000" />

                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="flex flex-col items-center py-12 space-y-6 relative z-10"
                                >
                                    <div className="w-24 h-24 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_50px_rgba(34,197,94,0.3)] animate-pulse">
                                        <Zap className="w-12 h-12 fill-current" />
                                    </div>
                                    <div className="text-center space-y-2">
                                        <h3 className="text-3xl font-bold text-white tracking-widest uppercase">Accesso Autorizzato</h3>
                                        <p className="text-text-muted font-mono">
                                            Credenziali di accesso in invio al terminale remoto.
                                        </p>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.form
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={handleSubmit}
                                    className="space-y-6 text-left relative z-10"
                                >
                                    {/* Header Promo */}
                                    <div className="bg-accent-primary/10 border border-accent-primary/20 p-4 rounded-lg flex items-center justify-between mb-8 group-hover:bg-accent-primary/15 transition-colors">
                                        <div>
                                            <p className="text-accent-primary font-bold text-lg tracking-wide">MODULO GRATUITO ATTIVO</p>
                                            <p className="text-accent-primary/70 text-xs font-mono uppercase">Offerta attivazione sbloccata</p>
                                        </div>
                                        <div className="h-2 w-2 rounded-full bg-accent-primary animate-ping" />
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2 group/input">
                                            <label htmlFor="companyName" className={`text-xs font-mono uppercase tracking-widest transition-colors ${focusedField === 'company' ? 'text-accent-primary' : 'text-text-muted'}`}>
                                                Identificativo Officina <span className="text-accent-primary">*</span>
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="companyName"
                                                    type="text"
                                                    placeholder="Es. Officina Rossi snc"
                                                    value={companyName}
                                                    onChange={(e) => {
                                                        setCompanyName(e.target.value);
                                                        if (status === 'error') setStatus('idle');
                                                    }}
                                                    onFocus={() => setFocusedField('company')}
                                                    onBlur={() => setFocusedField(null)}
                                                    error={status === 'error' && !companyName.trim()}
                                                    disabled={status === 'loading'}
                                                    className="pl-4 h-14 bg-bg-main/50 border-white/10 focus:border-accent-primary focus:bg-bg-main/80 focus:ring-1 focus:ring-accent-primary transition-all duration-300 font-mono text-lg placeholder:font-sans"
                                                />
                                                {focusedField === 'company' && (
                                                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-accent-primary animate-pulse rounded-r-md" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label htmlFor="email" className={`text-xs font-mono uppercase tracking-widest transition-colors ${focusedField === 'email' ? 'text-accent-primary' : 'text-text-muted'}`}>
                                                    Email Aziendale <span className="text-accent-primary">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        placeholder="nome@officina.it"
                                                        value={email}
                                                        onChange={(e) => {
                                                            setEmail(e.target.value);
                                                            if (status === 'error') setStatus('idle');
                                                        }}
                                                        onFocus={() => setFocusedField('email')}
                                                        onBlur={() => setFocusedField(null)}
                                                        error={status === 'error' && !validateEmail(email)}
                                                        disabled={status === 'loading'}
                                                        className="pl-4 h-14 bg-bg-main/50 border-white/10 focus:border-accent-primary focus:bg-bg-main/80 focus:ring-1 focus:ring-accent-primary transition-all duration-300 font-mono"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label htmlFor="confirmEmail" className={`text-xs font-mono uppercase tracking-widest transition-colors ${focusedField === 'confirm' ? 'text-accent-primary' : 'text-text-muted'}`}>
                                                    Conferma Email <span className="text-accent-primary">*</span>
                                                </label>
                                                <div className="relative">
                                                    <Input
                                                        id="confirmEmail"
                                                        type="email"
                                                        placeholder="Ripeti email"
                                                        value={confirmEmail}
                                                        onChange={(e) => {
                                                            setConfirmEmail(e.target.value);
                                                            if (status === 'error') setStatus('idle');
                                                        }}
                                                        onFocus={() => setFocusedField('confirm')}
                                                        onBlur={() => setFocusedField(null)}
                                                        error={status === 'error' && email !== confirmEmail}
                                                        disabled={status === 'loading'}
                                                        className="pl-4 h-14 bg-bg-main/50 border-white/10 focus:border-accent-primary focus:bg-bg-main/80 focus:ring-1 focus:ring-accent-primary transition-all duration-300 font-mono"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Terms Checkbox */}
                                        <div className="flex items-start gap-4 pt-2 group/terms">
                                            <div className="relative flex items-center h-6">
                                                <input
                                                    id="terms"
                                                    type="checkbox"
                                                    checked={acceptedTerms}
                                                    onChange={(e) => {
                                                        setAcceptedTerms(e.target.checked);
                                                        if (status === 'error') setStatus('idle');
                                                    }}
                                                    className="peer w-5 h-5 cursor-pointer appearance-none rounded border border-slate-600 bg-bg-main/50 checked:bg-accent-primary checked:border-accent-primary transition-all"
                                                />
                                                <CheckCircle2 className="absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-bg-main w-5 h-5 transition-opacity" />
                                            </div>
                                            <label htmlFor="terms" className="text-sm text-text-muted cursor-pointer select-none group-hover/terms:text-white transition-colors">
                                                Dichiaro di aver letto i <button type="button" onClick={() => setShowTermsModal(true)} className="text-accent-primary hover:text-yellow-300 font-bold uppercase tracking-wider text-xs border-b border-accent-primary/20 pb-0.5">protocolli di servizio</button>.
                                            </label>
                                        </div>

                                        {status === 'error' && (
                                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3">
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                                <p className="text-sm text-red-400 font-mono">
                                                    ERRORE: {errorMessage}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full text-lg h-16 bg-accent-primary text-bg-main hover:bg-yellow-400 font-bold shadow-[0_0_30px_rgba(253,197,67,0.3)] hover:shadow-[0_0_50px_rgba(253,197,67,0.5)] transition-all duration-300 relative group overflow-hidden uppercase tracking-widest border border-yellow-300"
                                        disabled={status === 'loading'}
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 skew-y-12" />
                                        {status === 'loading' ? (
                                            <span className="flex items-center justify-center gap-3 relative z-10">
                                                <span className="w-5 h-5 border-2 border-bg-main/20 border-t-bg-main rounded-full animate-spin" />
                                                INITIALIZING...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2 relative z-10">
                                                ATTIVA PROTOCOLLO
                                                <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                            </span>
                                        )}
                                    </Button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
