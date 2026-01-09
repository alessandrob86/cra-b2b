
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGrid } from '../ui/BackgroundGrid';
import { Search, ShoppingCart, Activity, FileText, ChevronDown, Check, ShieldCheck } from 'lucide-react';

interface FeatureSectionProps {
    title: string;
    description: string;
    reversed?: boolean;
    badge?: string;
    badgeColor?: 'green' | 'yellow';
    price?: string;
    note?: string;
    visual: React.ReactNode;
    pricingContent?: React.ReactNode;
}

function FeatureSection({ title, description, reversed = false, badge, badgeColor, price, note, visual, pricingContent }: FeatureSectionProps) {
    const [isPricingOpen, setIsPricingOpen] = useState(false);

    return (
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20 py-24 relative z-10`}>
            {/* Visual Side */}
            <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <div className="relative group">
                    {/* Glow behind visual */}
                    <div className="absolute inset-0 bg-accent-primary/5 rounded-3xl blur-[80px] group-hover:bg-accent-primary/10 transition-colors duration-700" />

                    {/* Glass Container */}
                    <div className="relative bg-bg-card/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl p-6 md:p-8 min-h-[300px] flex items-center justify-center transform group-hover:scale-[1.02] transition-transform duration-500">
                        {visual}
                    </div>
                </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
                className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="space-y-4">
                    {/* Badge and Title */}
                    <div className="flex flex-col lg:items-start items-center gap-2">
                        {badge && (
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase ${badgeColor === 'green' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                }`}>
                                {badge}
                            </span>
                        )}
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">{title}</h3>
                    </div>

                    {price && (
                        <p className="text-lg font-medium text-text-muted/60 line-through decoration-red-500/50 decoration-2">
                            {price}
                        </p>
                    )}
                </div>

                <p className="text-lg text-text-muted leading-relaxed max-w-xl mx-auto lg:mx-0">
                    {description}
                </p>

                {note && (
                    <div className="pt-2 relative">
                        {pricingContent ? (
                            <div className="flex flex-col items-center lg:items-start">
                                <button
                                    onClick={() => setIsPricingOpen(!isPricingOpen)}
                                    className="flex items-center gap-2 text-sm text-accent-primary/90 hover:text-accent-primary font-medium transition-colors bg-accent-primary/5 hover:bg-accent-primary/10 px-4 py-2 rounded-full border border-accent-primary/20 group"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent-primary group-hover:animate-ping" />
                                    <span>{note}</span>
                                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isPricingOpen ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {isPricingOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, y: -10, height: 0 }}
                                            className="overflow-hidden mt-4 w-full max-w-md"
                                        >
                                            <div className="bg-bg-card/90 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl relative overflow-hidden">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-primary to-transparent" />
                                                {pricingContent}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-text-muted/80">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                                <span>{note}</span>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </div>
    );
}

export function DetailedFeatures() {
    return (
        <section className="relative py-32 px-4 max-w-7xl mx-auto overflow-hidden">
            <BackgroundGrid />

            <div className="relative z-10 text-center max-w-3xl mx-auto mb-24 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Potenza e Precisione <br />
                    <span className="text-accent-primary">al tuo servizio</span>
                </h2>
                <p className="text-xl text-text-muted">
                    Abbiamo ridisegnato ogni aspetto dell'esperienza d'acquisto per darti gli strumenti professionali che meriti.
                </p>
            </div>

            <div className="space-y-8">
                {/* Feature 1: Search */}
                <FeatureSection
                    title="Ricerca per Targa e per Telaio"
                    description="Non perdere tempo a cercare codici. Inserisci la targa o il telaio e accedi immediatamente all'esploso tecnico del veicolo, con filtri precisi per motorizzazione e allestimento. La nostra banca dati è aggiornata in tempo reale per garantirti zero errori."
                    visual={
                        <div className="w-full max-w-md space-y-4">
                            {/* Mock Search Input */}
                            <div className="relative h-14 bg-bg-main/50 rounded-lg border border-white/10 flex items-center px-4 gap-3 shadow-lg">
                                <Search className="w-5 h-5 text-accent-primary" />
                                <div className="h-2 w-32 bg-white/10 rounded-full animate-pulse" />
                                <div className="absolute right-2 px-3 py-1.5 bg-accent-primary/10 rounded text-accent-primary text-xs font-bold border border-accent-primary/20">
                                    CERCA
                                </div>
                            </div>
                            {/* Mock Results */}
                            <div className="space-y-3 pl-4 border-l-2 border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded bg-white/5" />
                                    <div className="space-y-1.5">
                                        <div className="h-2 w-48 bg-white/20 rounded-full" />
                                        <div className="h-2 w-24 bg-white/10 rounded-full" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 opacity-60">
                                    <div className="w-10 h-10 rounded bg-white/5" />
                                    <div className="space-y-1.5">
                                        <div className="h-2 w-40 bg-white/20 rounded-full" />
                                        <div className="h-2 w-20 bg-white/10 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    note="Paghi solo il costo della consultazione"
                    pricingContent={
                        <div className="space-y-4">
                            {/* Targhe */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
                                    <Check className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <span className="text-white font-bold text-lg">Ricerca Targa</span>
                                        <div className="text-right">
                                            <span className="text-emerald-400 font-mono font-bold block">0,25€</span>
                                            <span className="text-[10px] text-text-muted uppercase">+iva</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                        <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Omaggio</span><br />
                                        100 ricerche incluse alla prima attivazione
                                    </p>
                                </div>
                            </div>

                            <div className="h-px bg-white/5 w-full" />

                            {/* Telai */}
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 shrink-0">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-baseline justify-between mb-1">
                                        <span className="text-white font-bold text-lg">Ricerca Telaio</span>
                                        <div className="text-right">
                                            <span className="text-amber-400 font-mono font-bold block">1,50€</span>
                                            <span className="text-[10px] text-text-muted uppercase">+iva</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                        <span className="text-amber-500 font-bold uppercase tracking-wider text-[10px]">Alta Affidabilità</span><br />
                                        90/95% di precisione sui risultati ufficiali
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                />

                {/* Feature 2: Multicart */}
                <FeatureSection
                    title="Multicarrello Intelligente"
                    description="Gestisci più clienti o ordini contemporaneamente. Passa da un carrello all'altro con un semplice click, senza perdere i dati inseriti. La soluzione ideale per chi gestisce più commesse in parallelo."
                    reversed
                    visual={
                        <div className="relative w-full max-w-xs h-64 flex items-center justify-center">
                            {/* Stacked Cards */}
                            <div className="absolute top-0 right-0 w-56 h-32 bg-bg-main border border-white/5 rounded-xl shadow-2xl p-4 transform rotate-6 translate-x-4 opacity-40 blur-[1px]">
                                <div className="flex justify-between items-center mb-4"><div className="w-8 h-8 bg-white/10 rounded-full" /></div>
                            </div>
                            <div className="absolute top-4 right-4 w-56 h-32 bg-bg-main border border-white/10 rounded-xl shadow-2xl p-4 transform rotate-3 translate-x-2 opacity-70">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-8 h-8 bg-blue-500/20 rounded-full" />
                                    <div className="h-2 w-16 bg-white/10 rounded-full" />
                                </div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-white/5 rounded-full" />
                                    <div className="h-2 w-2/3 bg-white/5 rounded-full" />
                                </div>
                            </div>
                            <div className="absolute top-8 right-8 w-56 h-40 bg-bg-main border border-accent-primary/30 rounded-xl shadow-2xl p-5 transform hover:-translate-y-2 transition-transform duration-300">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2">
                                        <ShoppingCart className="w-5 h-5 text-accent-primary" />
                                        <span className="text-xs font-bold text-white">Ordine #402</span>
                                    </div>
                                    <div className="h-2 w-12 bg-green-500/20 rounded-full" />
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between"><div className="h-2 w-24 bg-white/20 rounded-full" /> <div className="h-2 w-8 bg-white/10 rounded-full" /></div>
                                    <div className="flex justify-between"><div className="h-2 w-32 bg-white/20 rounded-full" /> <div className="h-2 w-8 bg-white/10 rounded-full" /></div>
                                    <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                                        <div className="h-2 w-16 bg-white/10 rounded-full" />
                                        <div className="h-3 w-12 bg-accent-primary/20 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    badge="GRATIS A VITA"
                    badgeColor="green"
                    price="60€ + iva / anno"
                />

                {/* Feature 3: Tech Data */}
                <FeatureSection
                    title="Dati Tecnici e Piani di Manutenzione"
                    description="Accedi a schemi di montaggio, coppie di serraggio, specifiche dei fluidi e bollettini tecnici ufficiali. Un vero e proprio assistente tecnico digitale integrato nel tuo carrello acquisti."
                    visual={
                        <div className="w-full max-w-md relative aspect-video bg-bg-main/50 rounded-lg border border-white/10 p-6 overflow-hidden">
                            {/* Abstract Blueprint Lines */}
                            <svg className="absolute inset-0 w-full h-full opacity-20" stroke="currentColor" strokeWidth="1">
                                <line x1="20" y1="20" x2="100%" y2="20" className="text-accent-primary" />
                                <line x1="20" y1="20" x2="20" y2="100%" className="text-accent-primary" />
                                <circle cx="50%" cy="50%" r="40" fill="none" className="text-white animate-pulse" />
                                <path d="M 50% 50% L 80% 20%" className="text-white" strokeDasharray="4 4" />
                            </svg>

                            <div className="relative z-10 grid grid-cols-2 gap-4 h-full">
                                <div className="bg-white/5 rounded p-3 flex flex-col gap-2">
                                    <Activity className="w-6 h-6 text-blue-400" />
                                    <div className="h-2 w-20 bg-white/20 rounded-full" />
                                    <div className="h-16 w-full bg-white/5 rounded border border-white/5 dashed" />
                                </div>
                                <div className="bg-white/5 rounded p-3 flex flex-col gap-2 mt-8">
                                    <FileText className="w-6 h-6 text-orange-400" />
                                    <div className="h-2 w-20 bg-white/20 rounded-full" />
                                    <div className="space-y-1">
                                        <div className="h-1 w-full bg-white/10 rounded" />
                                        <div className="h-1 w-full bg-white/10 rounded" />
                                        <div className="h-1 w-2/3 bg-white/10 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    badge="1° ANNO GRATIS"
                    badgeColor="yellow"
                    price="Poi 200€ + iva / anno"
                />
            </div>
        </section>
    );
}
