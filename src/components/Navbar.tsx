import { useState } from "react";
import { buildWhatsAppLink } from "../data/site";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const links = [
        { href: "#studio", label: "🎨 Studio 3D" },
        { href: "#services", label: "Services" },
        { href: "#expedition", label: "🗺️ Expédition" },
        { href: "#realisations", label: "Réalisations" },
        { href: "#tarifs", label: "Tarifs" },
        { href: "#atelier", label: "Atelier" },
        { href: "#contact", label: "Contact" },
    ];
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-encre/85 border-b border-white/10">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <a href="#top" className="flex items-center gap-2">
                    <span className="w-10 h-10 rounded-xl bg-energie grid place-items-center font-display font-bold text-white text-xl shadow-carte">K</span>
                    <span className="font-display font-bold text-white leading-tight">Korhogo Print<br /><span className="text-korhogo text-xs font-body font-medium">Imprimerie 3D • Korhogo</span></span>
                </a>
                <div className="hidden md:flex items-center gap-5 text-white/90 text-sm">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} className="hover:text-korhogo transition font-medium">{l.label}</a>
                    ))}
                    <ThemeToggle />
                    <a href={buildWhatsAppLink("Bonjour Korhogo Print, je veux un devis rapide.")} target="_blank" rel="noreferrer" className="btn-whatsapp text-white font-semibold px-4 py-2 rounded-full">Devis WhatsApp</a>
                </div>
                <div className="flex md:hidden items-center gap-2">
                    <ThemeToggle />
                    <button onClick={() => setOpen(!open)} className="text-white text-2xl px-2">☰</button>
                </div>
            </nav>
            {open && (
                <div className="md:hidden bg-encre px-4 pb-4 flex flex-col gap-3 text-white">
                    {links.map((l) => (
                        <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1 border-b border-white/10">{l.label}</a>
                    ))}
                    <a href={buildWhatsAppLink("Bonjour Korhogo Print, je veux un devis.")} target="_blank" rel="noreferrer" className="btn-whatsapp text-center text-white font-semibold px-4 py-2 rounded-full">Devis WhatsApp</a>
                </div>
            )}
        </header>
    );
}
