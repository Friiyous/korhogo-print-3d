import { useState, useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "../data/site";
import ModalARViewer from "./ModalARViewer";

// --- TYPES DE CONFIGURATION ---
type TypeProduit = "carte" | "mug" | "tshirt" | "flyer";
type FinitionType = "senoufo" | "dorure" | "vernis" | "mat" | "brillant";

interface ConfigStudio {
    produit: TypeProduit;
    nomSociete: string;
    slogan: string;
    telephone: string;
    couleurBase: string;
    finition: FinitionType;
    quantite: number;
}

// --- GÉNÉRATEUR DE TEXTURE EN TEMPS RÉEL ---
function useTextureDynamique(config: ConfigStudio) {
    return useMemo(() => {
        const width = 1024;
        const height = 576;

        // Canvas Couleur
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;

        // Canvas Métallique pour Dorure
        const metalCanvas = document.createElement("canvas");
        metalCanvas.width = width;
        metalCanvas.height = height;
        const ctxMetal = metalCanvas.getContext("2d")!;

        // Fond
        ctx.fillStyle = config.couleurBase;
        ctx.fillRect(0, 0, width, height);

        ctxMetal.fillStyle = "#000000";
        ctxMetal.fillRect(0, 0, width, height);

        // Motifs géométriques Sénoufo en fond si sélectionné
        if (config.finition === "senoufo") {
            ctx.strokeStyle = "rgba(212, 175, 55, 0.25)";
            ctx.lineWidth = 3;
            // Losanges Sénoufo de Fakaha
            for (let x = 40; x < width; x += 120) {
                for (let y = 40; y < height; y += 120) {
                    ctx.beginPath();
                    ctx.moveTo(x, y - 25);
                    ctx.lineTo(x + 25, y);
                    ctx.lineTo(x, y + 25);
                    ctx.lineTo(x - 25, y);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        } else {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
            ctx.lineWidth = 2;
            for (let i = 0; i < width + height; i += 50) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i - height, height);
                ctx.stroke();
            }
        }

        // Dessin du Texte et du Logo
        const drawElements = (targetCtx: CanvasRenderingContext2D, color: string | CanvasGradient) => {
            targetCtx.fillStyle = color;
            targetCtx.strokeStyle = color;

            // Cadre
            targetCtx.lineWidth = 6;
            targetCtx.strokeRect(35, 35, width - 70, height - 70);

            // Icone Logo (Masque Sénoufo / Diamant Poro)
            targetCtx.beginPath();
            targetCtx.arc(120, 150, 35, 0, Math.PI * 2);
            targetCtx.lineWidth = 5;
            targetCtx.stroke();

            targetCtx.font = "bold 52px sans-serif";
            targetCtx.fillText((config.nomSociete || "VOTRE SOCIÉTÉ").toUpperCase(), 180, 160);

            targetCtx.font = "500 24px sans-serif";
            targetCtx.fillText((config.slogan || "Impression & Infographie Korhogo").toUpperCase(), 180, 205);

            // Ligne séparatrice
            targetCtx.fillRect(180, 230, 450, 4);

            // Téléphone & Adresse
            targetCtx.font = "600 26px sans-serif";
            targetCtx.fillText(`📞 ${config.telephone || "+225 07 00 00 00 00"}`, 180, 290);
            targetCtx.fillText("📍 Korhogo, Côte d'Ivoire", 180, 345);

            // Stamp de Finition
            targetCtx.font = "bold 20px sans-serif";
            const labelFinition =
                config.finition === "senoufo" ? "GRAVURE SÉNOUFO FAKAHA" :
                    config.finition === "dorure" ? "OR 24K PREMIUM" :
                        config.finition === "vernis" ? "VERNIS SÉLECTIF UV" :
                            config.finition === "mat" ? "MAT SOFT TOUCH" : "FINITION BRILLANTE";
            targetCtx.strokeRect(180, 400, 280, 48);
            targetCtx.fillText(labelFinition, 195, 432);
        };

        // Dégradé Or si dorure ou senoufo
        if (config.finition === "dorure" || config.finition === "senoufo") {
            const goldGrad = ctx.createLinearGradient(0, 0, width, height);
            goldGrad.addColorStop(0, "#FFE082");
            goldGrad.addColorStop(0.5, "#FFC107");
            goldGrad.addColorStop(1, "#FFB300");
            drawElements(ctx, goldGrad);
            drawElements(ctxMetal, "#FFFFFF");
        } else {
            drawElements(ctx, "#FFFFFF");
            if (config.finition === "vernis") {
                drawElements(ctxMetal, "#888888");
            }
        }

        const colorMap = new THREE.CanvasTexture(canvas);
        colorMap.colorSpace = THREE.SRGBColorSpace;

        const metalnessMap = new THREE.CanvasTexture(metalCanvas);

        return { colorMap, metalnessMap };
    }, [config]);
}

// --- RENDED 3D DU PRODUIT SELECTIONNÉ ---
function ObjetProduit3D({ config }: { config: ConfigStudio }) {
    const groupRef = useRef<THREE.Group>(null);
    const { colorMap, metalnessMap } = useTextureDynamique(config);

    useFrame((state) => {
        if (!groupRef.current) return;
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    });

    const isDorure = config.finition === "dorure";

    if (config.produit === "mug") {
        return (
            <group ref={groupRef} position={[0, 0, 0]}>
                {/* Extérieur du Mug */}
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.7, 0.7, 1.4, 48, 1, true]} />
                    <meshStandardMaterial map={colorMap} roughness={0.15} metalness={0.1} side={THREE.DoubleSide} />
                </mesh>
                {/* Fond Mug */}
                <mesh position={[0, -0.69, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.7, 48]} />
                    <meshStandardMaterial color={config.couleurBase} roughness={0.2} />
                </mesh>
                {/* Intérieur Mug */}
                <mesh position={[0, 0.05, 0]}>
                    <cylinderGeometry args={[0.65, 0.65, 1.35, 48, 1, true]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.1} side={THREE.BackSide} />
                </mesh>
                {/* Anse du Mug */}
                <mesh position={[0.78, 0, 0]} castShadow>
                    <torusGeometry args={[0.34, 0.09, 16, 32, Math.PI * 1.2]} />
                    <meshStandardMaterial color={config.couleurBase} roughness={0.15} />
                </mesh>
            </group>
        );
    }

    if (config.produit === "tshirt") {
        return (
            <group ref={groupRef} position={[0, -0.2, 0]}>
                {/* T-Shirt Modélisé */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1.7, 2.1, 0.1]} />
                    <meshStandardMaterial map={colorMap} roughness={0.7} metalness={0.0} />
                </mesh>
                {/* Manches */}
                <mesh position={[-1.1, 0.6, 0]} rotation={[0, 0, 0.4]}>
                    <boxGeometry args={[0.6, 0.6, 0.1]} />
                    <meshStandardMaterial color={config.couleurBase} roughness={0.7} />
                </mesh>
                <mesh position={[1.1, 0.6, 0]} rotation={[0, 0, -0.4]}>
                    <boxGeometry args={[0.6, 0.6, 0.1]} />
                    <meshStandardMaterial color={config.couleurBase} roughness={0.7} />
                </mesh>
            </group>
        );
    }

    if (config.produit === "flyer") {
        return (
            <group ref={groupRef} position={[0, 0, 0]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1.5, 2.1, 0.02]} />
                    <meshStandardMaterial
                        map={colorMap}
                        metalnessMap={metalnessMap}
                        roughness={config.finition === "brillant" ? 0.1 : 0.4}
                        metalness={isDorure ? 0.8 : 0.05}
                    />
                </mesh>
            </group>
        );
    }

    // Défaut : Carte de Visite 3D
    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2.5, 1.4, 0.04]} />
                <meshStandardMaterial
                    map={colorMap}
                    metalnessMap={metalnessMap}
                    roughness={config.finition === "mat" ? 0.5 : 0.2}
                    metalness={isDorure ? 0.85 : 0.05}
                />
            </mesh>
            {/* Tranche de carte dorée si finition Dorure */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.52, 1.42, 0.038]} />
                <meshStandardMaterial color={isDorure ? "#FFC531" : config.couleurBase} roughness={0.1} metalness={isDorure ? 0.9 : 0.2} />
            </mesh>
        </group>
    );
}

// --- CALCULATEUR DE TARIF EN FCFA ---
function calculerTarif(config: ConfigStudio): number {
    let prixUnitaire = 50; // FCFA par défaut

    if (config.produit === "carte") prixUnitaire = 50;
    if (config.produit === "flyer") prixUnitaire = 100;
    if (config.produit === "mug") prixUnitaire = 2500;
    if (config.produit === "tshirt") prixUnitaire = 3500;

    let multiplicateurFinition = 1;
    if (config.finition === "dorure") multiplicateurFinition = 1.4;
    if (config.finition === "vernis") multiplicateurFinition = 1.25;

    return Math.round(prixUnitaire * config.quantite * multiplicateurFinition);
}

// --- COMPOSANT PRINCIPAL STUDIO ---
export default function StudioConfigurateur3D() {
    const [isAROpen, setIsAROpen] = useState(false);
    const [ambianceHDR, setAmbianceHDR] = useState<"soleil" | "studio" | "bureau" | "neon">("studio");
    const [config, setConfig] = useState<ConfigStudio>({
        produit: "carte",
        nomSociete: "Poro Tech Korhogo",
        slogan: "Solutions & Infographie Pro",
        telephone: "+225 07 78 00 84 88",
        couleurBase: "#0B1329",
        finition: "senoufo",
        quantite: 100,
    });

    const tarifEstime = calculerTarif(config);

    const messageWhatsApp = `Bonjour Moribah Premier (Korhogo Print) ! Je viens de personnaliser mon visuel 3D :
• Produit : ${config.produit.toUpperCase()}
• Entreprise : ${config.nomSociete}
• Slogan : ${config.slogan}
• Finition choisie : ${config.finition.toUpperCase()}
• Quantité souhaitée : ${config.quantite} ex.
• Tarif estimé : ${tarifEstime.toLocaleString("fr-FR")} FCFA
Merci de valider la maquette !`;

    const getHDREnvironment = () => {
        switch (ambianceHDR) {
            case "soleil": return "sunset";
            case "bureau": return "night";
            case "neon": return "studio";
            default: return "city";
        }
    };

    return (
        <section id="studio" className="py-20 bg-slate-900 text-white relative overflow-hidden">
            <ModalARViewer isOpen={isAROpen} onClose={() => setIsAROpen(false)} produitName={`${config.produit.toUpperCase()} - ${config.nomSociete}`} />
            {/* Arrière-plan lumineux */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-energie/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-korhogo/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

                {/* EN-TÊTE DE SECTION */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="inline-block bg-energie/20 text-energie font-semibold text-xs md:text-sm px-4 py-1.5 rounded-full mb-3 border border-energie/30">
                        🎨 Studio 3D Interactif & Sur Mesure
                    </span>
                    <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
                        Personnalisez votre projet en <span className="text-energie">3D Temps Réel</span>
                    </h2>
                    <p className="text-slate-400 mt-3 text-base sm:text-lg">
                        Testez vos couleurs, vos finitions (Gravure Sénoufo, Dorure Or 24K) et vos ambiances de lumière sous la direction de Moribah Premier.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">

                    {/* COLONNE GAUCHE : PANNEAU DE CONFIGURATION */}
                    <motion.div
                        className="lg:col-span-6 bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >

                        {/* 1. CHOIX DU PRODUIT */}
                        <div>
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                                1. Choisissez votre support :
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                                {[
                                    { id: "carte", label: "Cartes", emoji: "🪪" },
                                    { id: "mug", label: "Mug", emoji: "☕" },
                                    { id: "tshirt", label: "T-Shirt", emoji: "👕" },
                                    { id: "flyer", label: "Flyer", emoji: "📄" },
                                ].map((p) => (
                                    <button
                                        key={p.id}
                                        onClick={() => setConfig({ ...config, produit: p.id as TypeProduit })}
                                        className={`py-3 px-3 rounded-2xl font-semibold text-sm transition-all flex flex-col items-center gap-1.5 border ${config.produit === p.id
                                                ? "bg-gradient-to-r from-energie to-korhogo text-white border-transparent shadow-lg shadow-energie/20"
                                                : "bg-slate-900/60 text-slate-300 border-slate-700 hover:border-slate-500"
                                            }`}
                                    >
                                        <span className="text-xl">{p.emoji}</span>
                                        <span>{p.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. TEXTES & IDENTITÉ */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                                2. Votre texte & Informations :
                            </label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nom de votre Entreprise / Marque"
                                    value={config.nomSociete}
                                    onChange={(e) => setConfig({ ...config, nomSociete: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-energie transition"
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    placeholder="Slogan / Activité"
                                    value={config.slogan}
                                    onChange={(e) => setConfig({ ...config, slogan: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-energie transition"
                                />
                                <input
                                    type="text"
                                    placeholder="N° Téléphone WhatsApp"
                                    value={config.telephone}
                                    onChange={(e) => setConfig({ ...config, telephone: e.target.value })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-energie transition"
                                />
                            </div>
                        </div>

                        {/* 3. COULEURS DE BASE & FINITION */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                                    Couleur de fond :
                                </label>
                                <div className="flex items-center gap-2.5">
                                    {[
                                        { hex: "#0B1329", label: "Noir Luxe" },
                                        { hex: "#B83A1B", label: "Terre Latérite Korhogo" },
                                        { hex: "#111C33", label: "Indigo Waraniéné" },
                                        { hex: "#D4AF37", label: "Or Éburnie" },
                                        { hex: "#25D366", label: "Vert" },
                                    ].map((c) => (
                                        <button
                                            key={c.hex}
                                            onClick={() => setConfig({ ...config, couleurBase: c.hex })}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${config.couleurBase === c.hex ? "scale-110 border-white ring-2 ring-energie" : "border-transparent opacity-80 hover:opacity-100"
                                                }`}
                                            style={{ backgroundColor: c.hex }}
                                            title={c.label}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                                    Finition d'Impression :
                                </label>
                                <select
                                    value={config.finition}
                                    onChange={(e) => setConfig({ ...config, finition: e.target.value as FinitionType })}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-energie"
                                >
                                    <option value="senoufo">🎨 Gravure Motifs Sénoufo (Fakaha)</option>
                                    <option value="dorure">✨ Dorure Or 24K (Relief Métal)</option>
                                    <option value="vernis">💎 Vernis UV Sélectif Brillant</option>
                                    <option value="mat">🔲 Pelliculage Mat Soft Touch</option>
                                    <option value="brillant">✨ Pelliculage Brillant</option>
                                </select>
                            </div>
                        </div>

                        {/* 4. QUANTITÉ & TARIF ESTIMÉ */}
                        <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-700/60 flex items-center justify-between">
                            <div>
                                <label className="text-xs text-slate-400 font-medium block">Quantité souhaitée :</label>
                                <div className="flex items-center gap-2 mt-1">
                                    {[50, 100, 250, 500].map((q) => (
                                        <button
                                            key={q}
                                            onClick={() => setConfig({ ...config, quantite: q })}
                                            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${config.quantite === q ? "bg-energie text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                                }`}
                                        >
                                            {q} ex.
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-slate-400 block">Tarif estimé :</span>
                                <span className="font-display font-black text-2xl text-energie">
                                    {tarifEstime.toLocaleString("fr-FR")} FCFA
                                </span>
                            </div>
                        </div>

                        {/* BOUTON COMMANDER VIA WHATSAPP & BOUTON AR */}
                        <div className="space-y-3">
                            <a
                                href={buildWhatsAppLink(messageWhatsApp)}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full btn-whatsapp text-white font-bold py-4 rounded-2xl text-center text-base flex items-center justify-center gap-3 shadow-xl shadow-green-600/25 hover:shadow-green-500/40 transition"
                            >
                                <span className="text-2xl">💬</span>
                                <span>Commander avec Moribah Premier (+225 07 78 00 84 88)</span>
                            </a>
                            <button
                                onClick={() => setIsAROpen(true)}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 border border-slate-700 transition"
                            >
                                <span>📱</span>
                                <span>Projeter cette création sur mon bureau (AR)</span>
                            </button>
                        </div>

                    </motion.div>

                    {/* COLONNE DROITE : CANVAS 3D INTERACTIF CONTRÔLABLE AVEC PICKER HDR */}
                    <motion.div
                        className="lg:col-span-6 h-[500px] sm:h-[600px] bg-slate-950 border border-slate-800 rounded-3xl relative overflow-hidden shadow-2xl flex flex-col"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Barre de contrôle HDR Light Picker */}
                        <div className="absolute top-3 left-3 right-3 z-10 bg-slate-900/90 backdrop-blur-xl border border-white/10 p-2.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 shadow-lg">
                            <div className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                                <span>💡 Lumière HDR :</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {[
                                    { id: "studio", label: "📸 Studio Luxe", icon: "📸" },
                                    { id: "soleil", label: "☀️ Soleil Korhogo", icon: "☀️" },
                                    { id: "bureau", label: "💼 Bureau Sombre", icon: "💼" },
                                    { id: "neon", label: "🟣 Néon Poro", icon: "🟣" },
                                ].map((hdr) => (
                                    <button
                                        key={hdr.id}
                                        onClick={() => setAmbianceHDR(hdr.id as any)}
                                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${ambianceHDR === hdr.id
                                                ? "bg-energie text-white border-transparent shadow-md"
                                                : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                                            }`}
                                    >
                                        <span>{hdr.icon}</span>
                                        <span className="hidden sm:inline">{hdr.label.split(" ")[1]}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Canvas 3D */}
                        <div className="w-full h-full relative">
                            <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
                                <Suspense fallback={null}>
                                    <ambientLight intensity={ambianceHDR === "soleil" ? 1.2 : ambianceHDR === "neon" ? 0.4 : 0.7} />
                                    <directionalLight
                                        position={[5, 8, 5]}
                                        intensity={ambianceHDR === "soleil" ? 2.5 : 1.5}
                                        castShadow
                                        color={ambianceHDR === "soleil" ? "#FFF5EB" : "#FFFFFF"}
                                    />
                                    <pointLight position={[-4, 3, 2]} intensity={1} color={ambianceHDR === "neon" ? "#AA3BFF" : "#FF6B1A"} />
                                    <pointLight position={[4, -2, 3]} intensity={0.8} color={ambianceHDR === "neon" ? "#0EA5E9" : "#FFC531"} />

                                    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
                                        <ObjetProduit3D config={config} />
                                    </Float>

                                    <ContactShadows position={[0, -1.5, 0]} opacity={0.5} scale={8} blur={2} far={4} />
                                    <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 1.7} minDistance={2} maxDistance={7} />
                                    <Environment preset={getHDREnvironment()} />
                                </Suspense>
                            </Canvas>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
