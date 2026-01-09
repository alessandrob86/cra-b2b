import { useRef, useEffect } from "react";

export const BackgroundBeams = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let stars: Star[] = [];

        // Configuration
        const STAR_COUNT = 400;
        const SPEED = 2; // Warp speed

        class Star {
            x: number;
            y: number;
            z: number;
            xPrev: number;
            yPrev: number;

            constructor() {
                this.x = Math.random() * width - width / 2;
                this.y = Math.random() * height - height / 2;
                this.z = Math.random() * width;
                this.xPrev = this.x;
                this.yPrev = this.y;
            }

            update() {
                this.z -= SPEED; // Move towards camera
                if (this.z <= 0) {
                    this.z = width;
                    this.x = Math.random() * width - width / 2;
                    this.y = Math.random() * height - height / 2;
                    this.xPrev = this.x;
                    this.yPrev = this.y;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                // Projection
                const x = (this.x / this.z) * width + width / 2;
                const y = (this.y / this.z) * height + height / 2;

                // Scale based on depth (closer = bigger)
                const radius = Math.max(0.1, (1 - this.z / width));

                // Previous position for trails
                const xPrev = (this.x / (this.z + SPEED * 10)) * width + width / 2;
                const yPrev = (this.y / (this.z + SPEED * 10)) * height + height / 2;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(xPrev, yPrev);

                // Color based on theme (Yellow/Orange/White)
                const opacity = Math.min(1, (1 - this.z / width) + 0.2);

                // Use the brand accent color (amber/yellow) for some stars, white/blue for others
                if (Math.random() > 0.9) {
                    ctx.strokeStyle = `rgba(253, 197, 67, ${opacity})`; // Accent Primary
                } else {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                }

                ctx.lineWidth = radius * 2;
                ctx.stroke();
            }
        }

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                stars.push(new Star());
            }
        };

        const animate = () => {
            // Clear with trail effect
            ctx.fillStyle = "rgba(11, 15, 25, 0.4)"; // BG Main with opacity for trails
            ctx.fillRect(0, 0, width, height);

            stars.forEach((star) => {
                star.update();
                star.draw(ctx);
            });

            requestAnimationFrame(animate);
        };

        window.addEventListener("resize", resize);
        resize();
        animate();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
};
