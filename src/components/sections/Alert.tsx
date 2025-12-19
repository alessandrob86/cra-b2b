import { AlertTriangle } from 'lucide-react';

export function Alert() {
    return (
        <section className="px-4 max-w-4xl mx-auto -mt-6 relative z-10 mb-12">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex flex-col md:flex-row gap-4 items-start md:items-center shadow-lg backdrop-blur-sm">
                <div className="bg-yellow-500/20 p-3 rounded-full shrink-0">
                    <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-yellow-500 mb-1">
                        ⚠️ Attenzione: azione richiesta
                    </h3>
                    <p className="text-text-muted">
                        Se non attivi il nuovo e-commerce rischi di rimanere senza accesso ai servizi di ordine online, disponibilità e dati tecnici. L’attivazione è semplice, ma va richiesta ora.
                    </p>
                </div>
            </div>
        </section>
    );
}
