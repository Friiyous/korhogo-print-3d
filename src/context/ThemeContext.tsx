import { createContext, useContext, useState, type ReactNode } from "react";

export type ModeTheme = "nuit" | "jour";

interface ThemeContextType {
    theme: ModeTheme;
    toggleTheme: () => void;
    setTheme: (t: ModeTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ModeTheme>("nuit");

    const toggleTheme = () => {
        setThemeState((prev) => (prev === "nuit" ? "jour" : "nuit"));
    };

    const setTheme = (t: ModeTheme) => {
        setThemeState(t);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            <div className={theme === "nuit" ? "theme-nuit dark" : "theme-jour"}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme doit être utilisé à l'intérieur de ThemeProvider");
    }
    return context;
}
