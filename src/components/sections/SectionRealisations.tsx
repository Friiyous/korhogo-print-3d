import { realisations, type Realisation } from "../../data/site";
import { buildWhatsAppLink } from "../../data/site";
import { motion } from "framer-motion";

export default function SectionRealisations() {
    return (
        <section id="realisations" className="py-24 bg-slate-950 text-white grain relative overflow-hidden">
            {/* Décorations néons */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-energie/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-korhogo/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* En-tête de section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <span className="inline-block bg-korhogo/20 text-korhogo font-semibold text-xs md:text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 border border-korhogo/30">
                        Portfolio Projets Réels
                    </span>
                    <h2 className="font-display font-black text-white text-3xl sm:text-5xl">
                        Nos réalisations <span className="text-korhogo">à Korhogo</span>
                    </h2>
                    <p className="text-slate-400 mt-4 text-base sm:text-lg">
                        Chaque projet est unique. Voici des photographies réelles de nos travaux d'impression réalisés pour les PME, institutions et cérémonies du Poro.
                    </p>
                </motion.div>

                {/* Grille de projets réels */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {realisations.map((r: Realisation, i: number) => (
                        <motion.div
                            key={r.titre}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-korhogo/50 transition-all duration-500 shadow-2xl flex flex-col justify-between"
                        >
                            {/* Zone Image Réelle */}
                            <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                                <img
                                    src={r.image}
                                    alt={r.titre}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                />

                                {/* Overlay gradient sombre en bas d'image */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                {/* Badge Catégorie HAUT GAUCHE */}
                                <span className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md border border-white/15 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-lg">
                                    {r.categorie}
                                </span>

                                {/* Emoji HAUT DROITE */}
                                <span className="absolute top-4 right-4 text-2xl drop-shadow-md bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
                                    {r.emoji}
                                </span>
                            </div>

                            {/* Contenu Texte & CTA */}
                            <div className="p-6 bg-slate-900/90 flex flex-col justify-between flex-1 border-t border-slate-800/80">
                                <div>
                                    <h3 className="font-display font-bold text-white text-lg sm:text-xl leading-snug group-hover:text-korhogo transition-colors">
                                        {r.titre}
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-2">
                                        📍 Korhogo, Région du Poro • Impression & Finition Pro
                                    </p>
                                </div>

                                {/* Bouton Devis WhatsApp */}
                                <div className="mt-5 pt-4 border-t border-slate-800/80">
                                    <a
                                        href={buildWhatsAppLink(`Bonjour Moribah Premier, je souhaite commander un projet similaire à "${r.titre}". Quels sont les tarifs et délais ?`)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full btn-whatsapp text-white font-bold py-3 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 hover:shadow-green-500/35 transition"
                                    >
                                        <span>💬 Demander un devis similaire</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
