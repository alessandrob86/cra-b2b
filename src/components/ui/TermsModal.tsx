import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface TermsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
                    >
                        <div className="bg-bg-card border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-slate-700">
                                <h3 className="text-xl font-bold text-white">Termini e Condizioni</h3>
                                <button
                                    onClick={onClose}
                                    className="text-text-muted hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="p-6 overflow-y-auto custom-scrollbar space-y-4 text-text-muted text-sm leading-relaxed">
                                <p>
                                    <strong>1. Oggetto del Servizio</strong><br />
                                    Il servizio "Cra B2B" è riservato esclusivamente a professionisti del settore e officine meccaniche in possesso di regolare Partita IVA. L'accesso consente la consultazione di codici ricambi, esplosi tecnici e l'inoltro di ordini.
                                </p>
                                <p>
                                    <strong>2. Costi e Promozioni</strong><br />
                                    La registrazione entro il 31/12/2025 garantisce l'attivazione gratuita dei moduli "Ricerca per Targa" e "Multicarrello" per 1 anno. Al termine del periodo promozionale, il servizio potrebbe essere soggetto a canone, previa comunicazione.
                                </p>
                                <p>
                                    <strong>3. Privacy e Trattamento Dati (GDPR)</strong><br />
                                    I dati conferiti (Email, Nome Officina) saranno utilizzati esclusivamente per finalità contrattuali, per l'attivazione dell'account e per l'invio di comunicazioni tecniche o commerciali relative al servizio. Non saranno ceduti a terzi non autorizzati.
                                </p>
                                <p>
                                    <strong>4. Limitazione di Responsabilità</strong><br />
                                    La società Centro Ricambi Auto s.r.l. si impegna a fornire dati aggiornati, ma non risponde di eventuali discrepanze tecniche nelle banche dati fornite da terzi.
                                </p>
                                <p>
                                    <strong>5. Accettazione</strong><br />
                                    Procedendo con la registrazione, l'utente dichiara di essere un professionista del settore e accetta integralmente le presenti condizioni d'uso.
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-slate-700 bg-bg-main/50 text-right">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-2 bg-accent-primary text-bg-main font-bold rounded-lg hover:bg-yellow-400 transition-colors"
                                >
                                    Ho capito
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
