import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactForm() {
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
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

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxaWBN3mnszB9YpfNfaoiD2x30uYcNzZDtCNCUm7CEjl2bt1W0j0iEy_VrSFrQ5zodx/exec';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

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
                body: JSON.stringify({ email })
            });

            setStatus('success');
            setEmail('');
            setConfirmEmail('');
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
                <div className="mb-8 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Attiva ora il nuovo e-commerce
                    </h2>
                    <p className="text-lg text-text-muted">
                        Inserisci l’email con cui operi abitualmente. <br />
                        Ti invieremo le istruzioni per completare l’attivazione.
                    </p>
                </div>

                <div className="bg-bg-main p-8 rounded-2xl border border-slate-700 shadow-xl">
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
                                <h3 className="text-xl font-semibold text-white">Email ricevuta correttamente</h3>
                                <p className="text-text-muted">
                                    A breve riceverai le istruzioni per accedere al nuovo e-commerce e impostare la password.
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
                                        <label htmlFor="email" className="text-sm font-medium text-text-muted">
                                            Email aziendale
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
                                                error={status === 'error'}
                                                disabled={status === 'loading'}
                                                className="pl-4 pr-10"
                                            />
                                            {status === 'error' && !errorMessage.includes('corrispondono') && (
                                                <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 w-5 h-5" />
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="confirmEmail" className="text-sm font-medium text-text-muted">
                                            Conferma Email
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
                                                error={status === 'error'}
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
                                    className="w-full text-lg h-12"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <span className="flex items-center gap-2">
                                            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Elaborazione...
                                        </span>
                                    ) : (
                                        'Richiedi attivazione'
                                    )}
                                </Button>

                                <p className="text-xs text-center text-text-muted pt-2">
                                    Riservato ai clienti con Partita IVA attiva.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
