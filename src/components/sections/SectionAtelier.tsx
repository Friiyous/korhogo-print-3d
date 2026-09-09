import { faqs } from "../../data/site";
import { buildWhatsAppLink } from "../../data/site";
import { motion } from "framer-motion";
import { useState } from "react";

export default function SectionAtelier() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="atelier" className="py-20 bg-papier">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <span className="text-energie font-semibold text-sm uppercase tracking-widest">Atelier & FAQ</span>
                    <h2 className="font-display font-bold text-encre text-3xl md:text-5xl mt-2">Votre imprimerie <span className="text-energie">à Korhogo</span></h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">Tout se fait sur place. Venez nous voir ou contactez-nous directement.</p>
                </motion.div>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="bg-encre rounded-3xl p-8 text-white grain">
                        <h3 className="font-display font-bold text-xl mb-4">📍 Notre atelier</h3>
                        <ul className="space-y-3 text-white/80 text-sm">
                            <li className="flex items-start gap-2"><span className="text-korhogo flex-shrink-0">👤</span> Dirigeant : Moribah Premier</li>
                            <li className="flex items-start gap-2"><span className="text-korhogo flex-shrink-0">📍</span> Quartier Commerce & Poro, Korhogo, Côte d'Ivoire</li>
                            <li className="flex items-start gap-2"><span className="text-korhogo flex-shrink-0">🕐</span> Lun - Sam : 8h - 19h</li>
                            <li className="flex items-start gap-2"><span className="text-korhogo flex-shrink-0">📱</span> WhatsApp : +225 07 78 00 84 88</li>
                            <li className="flex items-start gap-2"><span className="text-korhogo flex-shrink-0">💳</span> Paiement : Espèces, Wave, Orange Money</li>
                        </ul>
                        <a href={buildWhatsAppLink("Bonjour Korhogo Print, j'ai une question.")} target="_blank" rel="noreferrer"
                            className="btn-whatsapp mt-6 block text-center text-white font-semibold px-5 py-3 rounded-full">
                            📲 Contacter sur WhatsApp
                        </a>
                    </div>
                    <div className="space-y-3">
                        <h3 className="font-display font-bold text-encre text-xl mb-4">❓ Questions fréquentes</h3>
                        {faqs.map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                                className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                                <button onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition">
                                    <span className="font-semibold text-encre text-sm">{f.q}</span>
                                    <span className={`text-energie text-xl transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
                                </button>
                                {openIndex === i && (
                                    <div className="px-4 pb-4 text-sm text-gray-500 border-t border-gray-100 pt-3">{f.a}</div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
