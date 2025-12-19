import { cn } from '../../lib/utils';

interface BadgeProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'danger' | 'outline';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
    return (
        <div className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            {
                'bg-accent-primary/10 text-accent-primary': variant === 'default',
                'bg-red-500/10 text-red-500': variant === 'danger',
                'text-text-main border border-slate-700': variant === 'outline',
            },
            className
        )}>
            {children}
        </div>
    );
}
