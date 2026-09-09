import { useState } from "react";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "../../data/site";

interface VilleExpedition {
    id: string;
    nom: string;
    region: string;
    delai: string;
    tarif: string;
    compagnie: string;
    emoji: string;
    x: number; // Coordonnée X pour la carte
    y: number; // Coordonnée Y pour la carte
}

const villesExpedition: VilleExpedition[] = [
    { id: "korhogo", nom: "Korhogo", region: "Poro (Chef-lieu)", delai: "Jour même - 24h", tarif: "Gratuit (Magasin) / 500 FCFA (Ville)", compagnie: "Livraison Moto & Retrait Magasin", emoji: "🏢", x: 50, y: 50 },
    { id: "sinematiali", nom: "Sinématiali", region: "Poro", delai: "24h Chrono", tarif: "1 000 FCFA", compagnie: "Les Cars du Poro", emoji: "🚌", x: 62, y: 46 },
    { id: "ferke", nom: "Ferkessédougou", region: "Tchologo", delai: "24h Chrono", tarif: "1 500 FCFA", compagnie: "UTB / STC", emoji: "🚚", x: 78, y: 42 },
    { id: "boundiali", nom: "Boundiali", region: "Bagoué", delai: "48h", tarif: "2 000 FCFA", compagnie: "Cars Sans-Frontière", emoji: "📦", x: 28, y: 52 },
    { id: "kouto", nom: "Kouto", region: "Bagoué", delai: "48h", tarif: "2 500 FCFA", compagnie: "Transport Nord", emoji: "📍", x: 30, y: 35 },
    { id: "abidjan", nom: "Abidjan", region: "Lagunes", delai: "24h Express (Expédition Car)", tarif: "3 000 FCFA", compagnie: "UTB / Sans-Frontière Gare Adjamé", emoji: "🏙️", x: 55, y: 90 },
];

export default function SectionExpeditionNord() {
    const [villeActive, setVilleActive] = useState<VilleExpedition>(villesExpedition[0]);

    return (
        <section id="expedition" className="py-24 bg-slate-950 text-white relative overflow-hidden">
            {/* Arrière-plan néon */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-energie/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-korhogo/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

                {/* En-tête */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block bg-korhogo/20 text-korhogo font-semibold text-xs md:text-sm px-4 py-1.5 rounded-full mb-3 border border-korhogo/30">
                        🗺️ Réseau de Livraison Grand Nord & Côte d'Ivoire
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
                        Expédition Rapide à <span className="text-korhogo">Korhogo & Régions</span>
                    </h2>
                    <p className="text-slate-400 mt-3 text-base sm:text-lg">
                        De Korhogo à Ferké, Boundiali ou Abidjan, recevez vos colis d'impression en 24h à 48h via nos transporteurs partenaires.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-center">

                    {/* COLONNE GAUCHE : CARTE STYLISÉE INTERACTIVE */}
                    <motion.div
                        className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 relative min-h-[420px] flex flex-col justify-between shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center justify-between mb-4 z-10">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                📍 Carte des Hubs de Livraison Nord-Ivoirien
                            </span>
                            <span className="text-xs bg-energie/20 text-energie font-bold px-3 py-1 rounded-full border border-energie/30">
                                Expédition Quotidienne
                            </span>
                        </div>

                        {/* Visualisation graphique de la carte */}
                        <div className="relative w-full h-[320px] bg-slate-950/60 rounded-2xl border border-slate-800/80 p-4 overflow-hidden flex items-center justify-center">

                            {/* Lignes de connexion réseau du Poro */}
                            <svg className="absolute inset-0 w-full h-full stroke-slate-800 stroke-[2] pointer-events-none">
                                <line x1="50%" y1="50%" x2="62%" y2="46%" strokeDasharray="4" />
                                <line x1="50%" y1="50%" x2="78%" y2="42%" strokeDasharray="4" />
                                <line x1="50%" y1="50%" x2="28%" y2="52%" strokeDasharray="4" />
                                <line x1="50%" y1="50%" x2="30%" y2="35%" strokeDasharray="4" />
                                <line x1="50%" y1="50%" x2="55%" y2="90%" strokeDasharray="4" />
                            </svg>

                            {/* Marqueurs des villes */}
                            {villesExpedition.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => setVilleActive(v)}
                                    style={{ left: `${v.x}%`, top: `${v.y}%` }}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg border ${villeActive.id === v.id
                                            ? "bg-gradient-to-r from-energie to-korhogo text-white border-white scale-110 shadow-energie/40 z-20"
                                            : "bg-slate-900/90 text-slate-300 border-slate-700 hover:border-slate-500 z-10"
                                        }`}
                                >
                                    <span>{v.emoji}</span>
                                    <span>{v.nom}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* COLONNE DROITE : FICHE DÉTAILS VILLE */}
                    <motion.div
                        className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-4xl">{villeActive.emoji}</span>
                            <div>
                                <span className="text-xs text-energie font-bold uppercase tracking-wider block">
                                    {villeActive.region}
                                </span>
                                <h3 className="font-display font-black text-2xl text-white">
                                    Destination : {villeActive.nom}
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-4 pt-2 border-t border-slate-800 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                                <span className="text-slate-400">⏱ Délai de réception :</span>
                                <strong className="text-white font-semibold">{villeActive.delai}</strong>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                                <span className="text-slate-400">🚚 Transporteur partenaire :</span>
                                <strong className="text-white font-semibold">{villeActive.compagnie}</strong>
                            </div>
                            <div className="flex items-center justify-between py-2 border-b border-slate-800/60">
                                <span className="text-slate-400">💳 Tarif d'expédition :</span>
                                <strong className="text-korhogo font-black text-base">{villeActive.tarif}</strong>
                            </div>
                        </div>

                        {/* Bouton WhatsApp de commande de livraison */}
                        <a
                            href={buildWhatsAppLink(`Bonjour Korhogo Print ! Je souhaite faire expédier une commande vers ${villeActive.nom} (${villeActive.region}). Quels sont les détails ?`)}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full btn-whatsapp text-white font-bold py-3.5 rounded-2xl text-center text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-green-500/30 transition"
                        >
                            <span>💬 Commander pour {villeActive.nom}</span>
                        </a>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
