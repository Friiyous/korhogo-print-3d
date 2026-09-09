import { services } from "../../data/site";
import { buildWhatsAppLink } from "../../data/site";
import { motion } from "framer-motion";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Mini canvas 3D par carte de service
function MiniMesh({ couleur, type }: { couleur: string; type: string }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.y += 0.01;
        ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    });

    return (
        <mesh ref={ref}>
            {type === "cartes" && <boxGeometry args={[0.8, 0.5, 0.04]} />}
            {type === "flyers" && <boxGeometry args={[0.45, 0.8, 0.03]} />}
            {type === "baches" && <boxGeometry args={[1.0, 0.6, 0.02]} />}
            {type === "tshirts" && <boxGeometry args={[0.6, 0.8, 0.04]} />}
            {type === "gadgets" && <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />}
            {!["cartes", "flyers", "baches", "tshirts", "gadgets"].includes(type) && (
                <boxGeometry args={[0.6, 0.6, 0.05]} />
            )}
            <meshStandardMaterial color={couleur} roughness={0.3} metalness={0.1} />
        </mesh>
    );
}

function MiniScene3D({ couleur, type }: { couleur: string; type: string }) {
    return (
        <Canvas style={{ position: "absolute", inset: 0 }} camera={{ position: [0, 0, 2], fov: 50 }}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 3, 2]} intensity={1} />
                <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
                    <MiniMesh couleur={couleur} type={type} />
                </Float>
            </Suspense>
        </Canvas>
    );
}

export default function SectionServices() {
    return (
        <section id="services" className="py-24 bg-papier relative overflow-hidden">
            {/* Décoration de fond */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-energie/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-korhogo/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-energie/10 text-energie font-semibold text-sm uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                        Nos prestations
                    </span>
                    <h2 className="font-display font-bold text-encre text-3xl md:text-5xl mt-2">
                        Services d'impression <span className="text-energie">à Korhogo</span>
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
                        De la carte de visite au t-shirt personnalisé, tout est imprimé sur place avec des délais rapides.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {services.map((s: { id: string; emoji: string; prix: string; titre: string; description: string; options: string[]; delai: string; couleur: string }, i: number) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group card-3d bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:border-energie/30 transition-all duration-300 hover:shadow-carte"
                            style={{ perspective: "1000px" }}
                        >
                            {/* Zone 3D */}
                            <div className="h-44 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                                <MiniScene3D couleur={s.couleur} type={s.id} />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                                <span className="absolute top-3 right-3 text-3xl drop-shadow-lg">{s.emoji}</span>
                            </div>

                            {/* Contenu */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="font-display font-bold text-encre text-lg">{s.titre}</h3>
                                    <span className="font-display font-bold text-energie text-sm whitespace-nowrap ml-2">{s.prix}</span>
                                </div>
                                <p className="text-gray-500 text-sm mt-1 mb-4 leading-relaxed">{s.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {s.options.map((o: string) => (
                                        <span key={o} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">{o}</span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                                    <span>⏱ {s.delai}</span>
                                    <a
                                        href={buildWhatsAppLink(`Bonjour, je veux ${s.titre.toLowerCase()}.`)}
                                        target="_blank" rel="noreferrer"
                                        className="btn-whatsapp text-white px-4 py-2 rounded-full font-semibold text-sm"
                                    >
                                        Commander
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
