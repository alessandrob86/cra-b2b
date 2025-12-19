import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

export function Hero() {
    const scrollToForm = () => {
        const form = document.querySelector('#activation-form');
        form?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative overflow-hidden py-12 md:py-24 lg:py-32 px-4 max-w-7xl mx-auto flex flex-col items-center text-center">

            {/* Background Gradient Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-72 h-72 bg-accent-primary rounded-full blur-[100px]" />
                <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-btn-secondary rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center gap-6"
            >
                <img src="/logo-1.png" alt="Logo" className="h-32 w-auto mb-8 drop-shadow-2xl" />

                <Badge variant="danger" className="animate-pulse px-6 py-2 text-lg md:text-xl font-black bg-red-600/20 text-red-500 border-red-500/50 uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                    ⚠️ ATTIVAZIONE OBBLIGATORIA ENTRO IL 31/12 ⚠️
                </Badge>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
                    Il tuo nuovo <br className="hidden md:block" />
                    <span className="text-accent-primary">Centro Ricambi.</span>
                </h1>

                <p className="text-xl md:text-2xl text-text-muted max-w-2xl leading-relaxed">
                    Più veloce, più preciso, progettato per la tua officina. <br />
                    Attiva subito il tuo account business.
                </p>

                <div className="pt-8 flex flex-col md:flex-row gap-4">
                    <Button
                        size="lg"
                        onClick={scrollToForm}
                        className="text-lg px-10 py-7 bg-accent-primary text-bg-main hover:bg-yellow-400 font-bold shadow-xl shadow-accent-primary/20 hover:scale-105 transition-all w-full md:w-auto"
                    >
                        ATTIVA IL NUOVO E-COMMERCE
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}
