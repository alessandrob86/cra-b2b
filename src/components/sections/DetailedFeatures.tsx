import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

interface FeatureSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    reversed?: boolean;
    badge?: string;
    price?: string;
    note?: string;
    badgeColor?: 'green' | 'yellow';
}

function FeatureSection({ title, description, imageSrc, imageAlt, reversed = false, badge, price, note, badgeColor }: FeatureSectionProps) {
    return (
        <div className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 py-16`}>
            {/* Image Side */}
            <motion.div
                className="w-full lg:w-1/2"
                initial={{ opacity: 0, x: reversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
                    <div className="absolute inset-0 bg-accent-primary/10 group-hover:bg-transparent transition-colors duration-500" />
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    {badge && (
                        <div className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg ${badgeColor === 'green' ? 'bg-emerald-500 text-white' : 'bg-accent-primary text-bg-main'
                            }`}>
                            {badge}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Text Side */}
            <motion.div
                className="w-full lg:w-1/2 space-y-6 text-center lg:text-left"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="space-y-2">
                    <h3 className="text-3xl font-bold text-white">{title}</h3>
                    {price && <p className="text-sm font-medium text-text-muted line-through opacity-75">{price}</p>}
                </div>

                <p className="text-lg text-text-muted leading-relaxed">
                    {description}
                </p>

                <div className="space-y-1">
                    {badge && (
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-card border border-white/5 shadow-inner`}>
                            <span className={`w-2 h-2 rounded-full ${badgeColor === 'green' ? 'bg-emerald-500 box-shadow-green-glow' : 'bg-accent-primary box-shadow-yellow-glow'}`} />
                            <span className={`font-bold text-sm ${badgeColor === 'green' ? 'text-emerald-400' : 'text-accent-primary'}`}>
                                {badge}
                            </span>
                        </div>
                    )}
                    {note && (
                        <p className="text-xs text-text-muted/60 pl-1">
                            * {note}
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export function DetailedFeatures() {
    return (
        <section className="py-24 px-4 max-w-7xl mx-auto space-y-24">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">
                    Potenza e Precisione <span className="text-accent-primary">al tuo servizio</span>
                </h2>
                <p className="text-lg text-text-muted">
                    Abbiamo ridisegnato ogni aspetto dell'esperienza d'acquisto per darti gli strumenti professionali che meriti.
                </p>
            </div>

            <FeatureSection
                title="Ricerca per Targa e per Telaio"
                description="Non perdere tempo a cercare codici. Inserisci la targa o il telaio e accedi immediatamente all'esploso tecnico del veicolo, con filtri precisi per motorizzazione e allestimento. La nostra banca dati è aggiornata in tempo reale per garantirti zero errori."
                imageSrc="/feature-search.png"
                imageAlt="Ricerca ricambi per targa su tablet"
                badge="GRATIS A VITA"
                badgeColor="green"
                note="Paghi solo il costo della consultazione"
            />

            <FeatureSection
                title="Multicarrello Intelligente"
                description="Gestisci più clienti o ordini contemporaneamente. Passa da un carrello all'altro con un semplice click, senza perdere i dati inseriti. La soluzione ideale per chi gestisce più commesse in parallelo."
                imageSrc="/feature-multicart.png"
                imageAlt="Interfaccia Multicarrello con più ordini aperti"
                reversed
                badge="GRATIS A VITA"
                badgeColor="green"
                price="60€ + iva / anno"
            />

            <FeatureSection
                title="Dati Tecnici e Schemi 3D"
                description="Accedi a schemi di montaggio, coppie di serraggio, specifiche dei fluidi e bollettini tecnici ufficiali. Un vero e proprio assistente tecnico digitale integrato nel tuo carrello acquisti."
                imageSrc="/feature-tech.png"
                imageAlt="Meccanico che consulta schemi tecnici olografici"
                badge="1° ANNO GRATIS"
                price="Poi 200€ + iva / anno"
                badgeColor="yellow"
            />
        </section>
    );
}
