import { useRef, useImperativeHandle, forwardRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser } from 'lucide-react';

export interface SignaturePadRef {
    isEmpty: () => boolean;
    clear: () => void;
    getTrimmedDataURL: () => string;
}

interface SignaturePadProps {
    onEnd?: () => void;
    error?: boolean;
}

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(({ onEnd, error }, ref) => {
    const padRef = useRef<SignatureCanvas>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [canvasWidth, setCanvasWidth] = useState(500);

    // Responsive canvas width
    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                setCanvasWidth(containerRef.current.offsetWidth);
            }
        };
        
        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    useImperativeHandle(ref, () => ({
        isEmpty: () => padRef.current?.isEmpty() ?? true,
        clear: () => padRef.current?.clear(),
        getTrimmedDataURL: () => padRef.current?.getCanvas().toDataURL('image/png') || ''
    }));

    const handleClear = () => {
        padRef.current?.clear();
        if (onEnd) onEnd(); // Trigger validation update
    };

    return (
        <div className="space-y-2 w-full" ref={containerRef}>
            <div className={`relative bg-white/5 border rounded-xl overflow-hidden touch-none ${error ? 'border-red-500/50' : 'border-white/20'}`}>
                <SignatureCanvas 
                    ref={padRef}
                    canvasProps={{
                        width: canvasWidth, 
                        height: 200, 
                        className: 'sigCanvas cursor-crosshair'
                    }}
                    penColor="#ffffff"
                    backgroundColor="transparent"
                    onEnd={onEnd}
                />
                
                {/* Clear Button */}
                <button
                    type="button"
                    onClick={handleClear}
                    className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/80 text-text-muted hover:text-white rounded-full transition-colors backdrop-blur-sm"
                    title="Cancella firma"
                >
                    <Eraser className="w-4 h-4" />
                </button>
                
                {/* Visual Guide */}
                <div className="absolute inset-x-8 bottom-8 border-b border-white/10 pointer-events-none" />
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-text-muted font-mono uppercase opacity-50 pointer-events-none">
                    Firma qui (mouse o dito)
                </span>
            </div>
        </div>
    );
});

SignaturePad.displayName = 'SignaturePad';
