/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-main': '#0f1521', // Keeping dark base for Hero
                'bg-card': '#1b2536', // Keeping for contrast in dark sections
                'accent-primary': '#FDC543', // NEW: Brand Yellow
                'accent-secondary': '#BD3432', // NEW: Brand Red
                'btn-secondary': '#375a7f', // Keeping as neutral secondary
                'text-main': '#ffffff',
                'text-dark': '#1a1a1a', // New for light sections
                'text-muted': '#9ca3af',
            },
            fontFamily: {
                heading: ['"League Spartan"', 'sans-serif'],
                sans: ['system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
