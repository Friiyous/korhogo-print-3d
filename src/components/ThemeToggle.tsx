import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all shadow-md border ${theme === "nuit"
                    ? "bg-slate-800 text-amber-300 border-amber-500/30 hover:border-amber-400"
                    : "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"
                }`}
            title="Basculer le thème (Mode Nuit Or / Mode Jour Poro)"
        >
            <span>{theme === "nuit" ? "🌙" : "☀️"}</span>
            <span>{theme === "nuit" ? "Nuit Luxe" : "Jour Poro"}</span>
        </button>
    );
}
