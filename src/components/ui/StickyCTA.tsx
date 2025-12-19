import { Button } from './Button';

export function StickyCTA() {
    // Mobile only sticky CTA

    const scrollToForm = () => {
        document.getElementById('activation-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg-card/95 backdrop-blur border-t border-slate-800 md:hidden z-50 pb-safe">
            <Button
                onClick={scrollToForm}
                className="w-full shadow-lg shadow-accent-primary/20"
                size="lg"
            >
                Richiedi attivazione
            </Button>
        </div>
    );
}
