import { buildWhatsAppLink } from "../../data/site";
import { motion } from "framer-motion";

export default function SectionContact() {
    return (
        <section id="contact" className="py-20 bg-encre grain relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-korhogo/10 via-transparent to-transparent"></div>
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
                    <span className="text-korhogo font-semibold text-sm uppercase tracking-widest">Contact</span>
                    <h2 className="font-display font-bold text-white text-3xl md:text-5xl mt-2">Parlons de votre <span className="text-korhogo">projet</span></h2>
                    <p className="text-white/60 mt-3 max-w-xl mx-auto">Envoyez-nous un message sur WhatsApp et recevez votre devis en quelques minutes.</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
                    <div className="text-6xl mb-4">💬</div>
                    <h3 className="font-display font-bold text-white text-2xl mb-2">Devis rapide via WhatsApp</h3>
                    <p className="text-white/60 mb-6 max-w-md mx-auto">Décrivez votre besoin, on vous répond avec un devis détaillé en moins de 5 minutes.</p>
                    <a href={buildWhatsAppLink("Bonjour Korhogo Print, je veux un devis : cartes / flyers / bâche / t-shirt ?")} target="_blank" rel="noreferrer"
                        className="btn-whatsapp inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full text-lg">
                        <span className="text-2xl">📱</span> Ouvrir WhatsApp
                    </a>
                    <p className="text-white/40 text-sm mt-4">Ou appelez-nous au 07 00 00 00 00 — Lun à Sam, 8h-19h</p>
                </motion.div>
            </div>
        </section>
    );
}
