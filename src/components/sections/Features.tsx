import { ScanBarcode, ClipboardCheck, Search, ListPlus, Boxes, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const features = [
    {
        icon: Search,
        title: "Ricerca per targa",
        desc: "Trova i ricambi corretti partendo direttamente dalla targa del veicolo."
    },
    {
        icon: ScanBarcode,
        title: "Ricerca per telaio (VIN)",
        desc: "Massima precisione nella selezione dei ricambi, anche sui modelli più complessi."
    },
    {
        icon: ListPlus,
        title: "Multicarrello",
        desc: "Gestisci più clienti contemporaneamente. Gratis a vita se ti iscrivi ora (valore 60€+iva/anno)."
    },
    {
        icon: Boxes, // Warehouse usually named Package or Box in some icons, Boxes is good. Or Warehouse if available.
        title: "Integrazione magazzini",
        desc: "Disponibilità aggiornate su più magazzini, in modo semplice e immediato."
    },
    {
        icon: FileText,
        title: "Specifiche tecniche",
        desc: "Consulta lubrificanti corretti, gas refrigerante, coppie di serraggio e dati tecnici utili all’intervento."
    },
    {
        icon: ClipboardCheck,
        title: "Piani di manutenzione",
        desc: "Procedure guidate e tempi di lavorazione per creare preventivi completi e professionali."
    }
];

export function Features() {
    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="bg-bg-card border-slate-800 hover:border-accent-primary/50 transition-colors group">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-btn-secondary/20 flex items-center justify-center mb-4 text-btn-secondary group-hover:text-accent-primary group-hover:bg-accent-primary/20 transition-colors">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <CardTitle className="mb-2">{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-text-muted">
                                {feature.desc}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
