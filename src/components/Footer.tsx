export default function Footer() {
    return (
        <footer className="bg-encre border-t border-white/10 py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-10 h-10 rounded-xl bg-energie grid place-items-center font-display font-bold text-white text-xl">K</span>
                            <div>
                                <span className="font-display font-bold text-white leading-tight block">Korhogo Print</span>
                                <span className="text-korhogo text-xs">Imprimerie 3D • Korhogo</span>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm">Votre imprimeur de confiance à Korhogo, quartier Poro. Cartes, flyers, bâches, t-shirts et plus encore.</p>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-white mb-3">Liens rapides</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            {["Services", "Réalisations", "Tarifs", "Atelier", "Contact"].map((l) => (
                                <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-korhogo transition">{l}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-display font-bold text-white mb-3">Contact & Direction</h4>
                        <ul className="space-y-2 text-sm text-white/60">
                            <li>👤 Dirigeant : Moribah Premier</li>
                            <li>📍 Quartier Commerce & Poro, Korhogo</li>
                            <li>📱 +225 07 78 00 84 88</li>
                            <li>🕐 Lun-Sam : 8h - 19h</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/40">
                    <span>© {new Date().getFullYear()} Korhogo Print — Dirigé par Moribah Premier — Tous droits réservés</span>
                    <span>Fait avec 🖨️ & ❤️ à Korhogo, Côte d'Ivoire</span>
                </div>
            </div>
        </footer>
    );
}
