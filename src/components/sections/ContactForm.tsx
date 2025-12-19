import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactForm() {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'already_submitted'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Countdown Logic
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        const targetDate = new Date('2025-12-31T23:59:59').getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft(null);
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
            localStorage.setItem('nomad_form_submitted', 'true');

        } catch (err) {
            console.error(err);
            setStatus('error');
            setErrorMessage('Errore di connessione. Riprova.');
        }
    };

    if (status === 'already_submitted') {
        return (
            <section id="activation-form" className="py-24 px-4 bg-bg-card border-t border-slate-800">
                <div className="max-w-xl mx-auto text-center">
                    <div className="bg-bg-main p-8 rounded-2xl border border-slate-700 shadow-xl">
                        <div className="flex flex-col items-center py-8 space-y-4">
                            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">Richiesta già inviata</h3>
                            <p className="text-text-muted">
                                Hai già inviato una richiesta di attivazione. <br />
                                Controlla la tua casella di posta, riceverai le istruzioni a breve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="activation-form" className="py-24 px-4 bg-bg-card border-t border-slate-800">
            <div className="max-w-xl mx-auto text-center">
                <div className="mb-12 space-y-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Attiva ora <span className="text-accent-primary">GRATIS</span>
                    </h2>

                    {/* Countdown Box */}
                    {timeLeft && (
                        <div className="flex justify-center gap-4 py-4">
                            {[
                                { label: 'Giorni', value: timeLeft.days },
                                { label: 'Ore', value: timeLeft.hours },
                                { label: 'Minuti', value: timeLeft.minutes },
                                { label: 'Secondi', value: timeLeft.seconds }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center p-3 bg-bg-main border border-slate-700 rounded-lg min-w-[70px]">
                                    <span className="text-2xl font-bold text-white font-mono">{String(item.value).padStart(2, '0')}</span>
                                    <span className="text-xs text-text-muted uppercase tracking-wider">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl max-w-2xl mx-auto">
                        <p className="text-emerald-400 font-semibold text-lg">
                            Richiedi ora l'attivazione e per un anno hai tutto GRATIS!
                        </p>
                        <p className="text-emerald-500/80 text-sm mt-1">
                            (Valore moduli ecommerce = 260€ + iva)
                        </p>
                    </div>

                    <p className="text-lg text-text-muted">
                        Inserisci i dati della tua officina. <br />
                        Ti invieremo le istruzioni per completare l'attivazione.
                    </p>
                </div>

                <div className="bg-bg-main p-8 rounded-2xl border border-slate-700 shadow-xl max-w-xl mx-auto">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center py-8 space-y-4"
                            >
                                <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">Richiesta inviata!</h3>
                                <p className="text-text-muted">
                                    A breve riceverai le istruzioni per accedere al nuovo e-commerce.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-4 text-left"
                            >
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="companyName" className="text-sm font-medium text-text-muted">
                                            Nome Officina <span className="text-accent-primary">*</span>
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
                                                error={status === 'error' && !companyName.trim()}
                                                disabled={status === 'loading'}
                                                className="pl-4"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-text-muted">
                                            Email aziendale <span className="text-accent-primary">*</span>
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
                                                error={status === 'error' && !validateEmail(email)}
                                                disabled={status === 'loading'}
                                                className="pl-4 pr-10"
                                            />
                                            {status === 'error' && !validateEmail(email) && email.length > 0 && (
                                                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="confirmEmail" className="text-sm font-medium text-text-muted">
                                            Conferma Email <span className="text-accent-primary">*</span>
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="confirmEmail"
                                                type="email"
                                                placeholder="Ripeti la tua email"
                                                value={confirmEmail}
                                                onChange={(e) => {
                                                    setConfirmEmail(e.target.value);
                                                    if (status === 'error') setStatus('idle');
                                                }}
                                                error={status === 'error' && email !== confirmEmail}
                                                disabled={status === 'loading'}
                                                className="pl-4 pr-10"
                                            />
                                        </div>
                                    </div>

                                    {status === 'error' && (
                                        <p className="text-sm text-red-500 animate-in slide-in-from-top-1">
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full text-lg h-14 bg-accent-primary text-bg-main hover:bg-yellow-400 font-bold shadow-lg shadow-accent-primary/20"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-bg-main/20 border-t-bg-main rounded-full animate-spin" />
                                            Elaborazione...
                                        </span>
                                    ) : (
                                        'RICHIEDI ATTIVAZIONE ORA'
                                    )}
                                </Button>

                                <p className="text-xs text-center text-text-muted pt-2">
                                    Offerta valida fino al 31/12/2025.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
