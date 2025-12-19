import { Gift, Percent, Coins } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

// --- 3D Tilt Card Component ---
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseXFromCenter = e.clientX - rect.left - width / 2;
        const mouseYFromCenter = e.clientY - rect.top - height / 2;

        const xPct = mouseXFromCenter / width;
        const yPct = mouseYFromCenter / height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transform-gpu transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(30px)" }}>
                {children}
            </div>
        </motion.div>
    );
}

export function Promo() {
    return (
        <section className="py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto relative">

                {/* Main Glass Container */}
                <div className="relative rounded-3xl p-8 md:p-16 border border-white/10 overflow-hidden shadow-2xl bg-bg-card/40 backdrop-blur-xl">

                    {/* Dynamic Background Gradients */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-secondary/20 rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-[120px]" />
                    </div>

                    <div className="relative z-10 text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                            Promo Esclusiva <span className="text-accent-primary">Business</span>
                        </h2>
                        <p className="text-xl text-indigo-200 max-w-2xl mx-auto font-light">
                            Attiva il nuovo portale entro il <strong className="text-white font-semibold">31/12</strong> e accedi a vantaggi riservati.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 perspective-1000">

                        {/* Card 1: 3 Mesi Promo */}
                        <TiltCard className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center gap-6 shadow-xl hover:shadow-accent-primary/20 transition-shadow">
                            <div className="relative">
                                <div className="absolute inset-0 bg-accent-primary blur-[40px] opacity-40 rounded-full" />
                                <Percent className="w-20 h-20 text-accent-primary drop-shadow-[0_0_15px_rgba(253,197,67,0.8)] relative z-10" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white tracking-wide">3 Mesi Promo</h3>
                                <p className="text-sm text-indigo-200/80 uppercase tracking-widest font-semibold">Condizioni Agevolate</p>
                            </div>
                        </TiltCard>

                        {/* Card 2: Cashback */}
                        <TiltCard className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center gap-6 shadow-xl hover:shadow-accent-primary/20 transition-shadow">
                            <div className="relative">
                                <div className="absolute inset-0 bg-yellow-600 blur-[40px] opacity-40 rounded-full" />
                                <Coins className="w-20 h-20 text-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.8)] relative z-10" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white tracking-wide">Cashback 3%</h3>
                                <p className="text-sm text-indigo-200/80 uppercase tracking-widest font-semibold">Sugli ordini online</p>
                            </div>
                        </TiltCard>

                        {/* Card 3: Premi */}
                        <TiltCard className="bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/10 p-8 flex flex-col items-center justify-center gap-6 shadow-xl hover:shadow-accent-secondary/20 transition-shadow">
                            <div className="relative">
                                <div className="absolute inset-0 bg-accent-secondary blur-[40px] opacity-40 rounded-full" />
                                <Gift className="w-20 h-20 text-accent-secondary drop-shadow-[0_0_15px_rgba(189,52,50,0.8)] relative z-10" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-bold text-white tracking-wide">Premi fino a 300€</h3>
                                <p className="text-sm text-indigo-200/80 uppercase tracking-widest font-semibold">Tech & Attrezzatura</p>
                            </div>
                        </TiltCard>

                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-sm font-medium text-white/40 tracking-widest uppercase">
                            * Offerta valida solo per migrazione da vecchio portale
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
