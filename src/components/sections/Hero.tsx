import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { Spotlight } from '../ui/Spotlight';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Hero() {
    const scrollToForm = () => {
        const form = document.querySelector('#activation-form');
        form?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-center py-12 md:py-24 lg:py-32 px-4 md:px-12 lg:px-20 w-full">

            {/* Spotlight Effect */}
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />

            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

                {/* Left Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col text-left gap-6"
                >
                    <img src="/logo-1.png" alt="Logo" className="h-24 w-auto mb-4 self-start drop-shadow-2xl" />

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                        Il futuro del tuo <br />
                        <span className="text-accent-primary">Business Ricambi.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-text-muted max-w-2xl leading-relaxed">
                        Un e-commerce B2B progettato per l'eccellenza. <br />
                        Velocità, precisione e controllo totale per la tua officina.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            size="lg"
                            onClick={scrollToForm}
                            className="text-lg px-8 py-6 bg-accent-primary text-bg-main hover:bg-yellow-400 font-bold shadow-xl shadow-accent-primary/20 hover:scale-105 transition-all flex items-center gap-2 group"
                        >
                            Scopri la Piattaforma
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <div className="flex gap-6 pt-8 text-sm text-text-muted font-medium">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                            <span>Ordini Rapidi</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                            <span>Dati Tecnici</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-accent-primary" />
                            <span>Zero Errori</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Content - Abstract Visual / Glass Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative hidden lg:block"
                >
                    {/* Decorative Elements */}
                    <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent-primary/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

                    {/* Glass Card Placeholder for Visual Interest */}
                    {/* Glass Dashboard Mockup */}
                    <div className="relative bg-bg-card/40 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 transform rotate-2 hover:rotate-0 transition-all duration-700 ease-out group">

                        {/* Mock Window Controls */}
                        <div className="absolute top-4 left-4 flex gap-2 z-20 opacity-50">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>

                        <div className="flex h-[400px] md:h-[500px]">
                            {/* Mock Sidebar */}
                            <div className="w-16 md:w-20 border-r border-white/5 bg-white/5 flex flex-col items-center py-16 gap-6">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`w-8 h-8 rounded-lg ${i === 0 ? 'bg-accent-primary' : 'bg-white/10'} transition-all`} />
                                ))}
                            </div>

                            {/* Mock Main Content */}
                            <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">
                                {/* Mock Header */}
                                <div className="flex justify-between items-center">
                                    <div className="h-4 w-32 bg-white/10 rounded-full" />
                                    <div className="flex gap-4">
                                        <div className="h-8 w-8 rounded-full bg-white/10" />
                                        <div className="h-8 w-24 rounded-full bg-white/5 border border-white/10" />
                                    </div>
                                </div>

                                {/* Mock Stats Row */}
                                <div className="grid grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl flex flex-col gap-2 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="h-8 w-8 rounded-lg bg-accent-primary/20 mb-2" />
                                            <div className="h-3 w-16 bg-white/10 rounded-full" />
                                            <div className="h-5 w-24 bg-white/20 rounded-md" />
                                        </div>
                                    ))}
                                </div>

                                {/* Mock Data Table */}
                                <div className="flex-1 bg-bg-main/30 rounded-xl border border-white/5 p-4 flex flex-col gap-4 overflow-hidden relative">
                                    {/* Table Header */}
                                    <div className="flex justify-between border-b border-white/5 pb-2">
                                        <div className="h-3 w-20 bg-white/10 rounded-full" />
                                        <div className="h-3 w-20 bg-white/10 rounded-full" />
                                        <div className="h-3 w-20 bg-white/10 rounded-full" />
                                    </div>

                                    {/* Table Rows with staggered animation */}
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex justify-between items-center opacity-60">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded bg-white/5" />
                                                <div className="flex flex-col gap-1">
                                                    <div className="h-2 w-24 bg-white/20 rounded-full" />
                                                    <div className="h-2 w-16 bg-white/10 rounded-full" />
                                                </div>
                                            </div>
                                            <div className="h-2 w-12 bg-white/10 rounded-full hidden md:block" />
                                            <div className="h-6 w-16 bg-accent-primary/10 rounded-full border border-accent-primary/20" />
                                        </div>
                                    ))}

                                    {/* Fade at bottom */}
                                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-bg-main/50 to-transparent" />
                                </div>
                            </div>
                        </div>

                        {/* Floating overlay Label - Removed as requested to rely on pure visuals, or can keep small */}
                        <div className="absolute bottom-6 right-6 px-4 py-2 bg-accent-primary/90 text-bg-main text-xs font-bold uppercase tracking-widest rounded-lg shadow-lg backdrop-blur-md">
                            Live Preview
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
