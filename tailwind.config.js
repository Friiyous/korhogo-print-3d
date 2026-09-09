/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                encre: "#0F172A",
                energie: "#B83A1B", // Rouge Latérite de Korhogo
                laterite: "#B83A1B",
                eburnie: "#D4AF37", // Or traditionnel
                indigo: "#111C33",  // Indigo Waraniéné
                coton: "#FDFBF7",
                papier: "#FDFBF7",
                anthracite: "#1A1A1E",
                korhogo: "#D4AF37",
            },
            fontFamily: {
                display: ["Space Grotesk", "system-ui", "sans-serif"],
                body: ["Inter", "system-ui", "sans-serif"],
            },
            boxShadow: {
                carte: "0 20px 60px -15px rgba(184, 58, 27, 0.25)",
            },
        },
    },
    plugins: [],
}
