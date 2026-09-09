import { tarifs } from "../../data/site";
import { buildWhatsAppLink } from "../../data/site";
import { motion } from "framer-motion";

export default function SectionTarifs() {
    return (
        <section id="tarifs" className="py-20 bg-papier">
            <div className="max-w-4xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                    <span className="text-energie font-semibold text-sm uppercase tracking-widest">Grille tarifaire</span>
                    <h2 className="font-display font-bold text-encre text-3xl md:text-5xl mt-2">Des prix <span className="text-energie">clairs</span>, sans surprise</h2>
                    <p className="text-gray-500 mt-3 max-w-xl mx-auto">Tous nos prix sont en FCFA. Devis gratuit sur WhatsApp, paiement à la livraison.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="bg-white rounded-3xl shadow-carte overflow-hidden border border-gray-100">
                    <div className="grid grid-cols-3 gap-0 bg-encre text-white text-sm font-semibold">
                        <div className="p-4 text-center">Produit</div>
                        <div className="p-4 text-center text-korhogo">Prix</div>
                        <div className="p-4 text-center">Délai</div>
                    </div>
                    {tarifs.map((t: { produit: string; prix: string; delai: string }, i: number) => (
                        <div key={i} className={`grid grid-cols-3 gap-0 text-sm ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <div className="p-4 font-medium text-encre border-t border-l border-gray-100 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-energie flex-shrink-0"></span>
                                {t.produit}
                            </div>
                            <div className="p-4 font-display font-bold text-energie text-center border-t border-gray-100">{t.prix}</div>
                            <div className="p-4 text-gray-500 text-center border-t border-r border-gray-100">{t.delai}</div>
                        </div>
                    ))}
                    <div className="p-5 bg-encre/5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-gray-500">💡 Prix indicatifs — le devis final peut varier selon quantité et finitions.</p>
                        <a href={buildWhatsAppLink("Bonjour Korhogo Print, je veux un devis personnalisé.")} target="_blank" rel="noreferrer"
                            className="btn-whatsapp text-white font-semibold px-5 py-2.5 rounded-full text-sm whitespace-nowrap">
                            💬 Devis gratuit sur WhatsApp
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
