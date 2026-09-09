import { Suspense, useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { buildWhatsAppLink } from "../data/site";
import { useTheme } from "../context/ThemeContext";
import ModalARViewer from "./ModalARViewer";

// --- GÉNERATEUR DE TEXTURES PROCÉDURALES ULTRA-RÉALISTES ---

function useBusinessCardTextures() {
    return useMemo(() => {
        const width = 1024;
        const height = 576;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d")!;

        const metalCanvas = document.createElement("canvas");
        metalCanvas.width = width;
        metalCanvas.height = height;
        const ctxMetal = metalCanvas.getContext("2d")!;

        ctx.fillStyle = "#0B1329";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 2;
        for (let i = -width; i < width * 2; i += 40) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i + height, height);
            ctx.stroke();
        }

        ctxMetal.fillStyle = "#000000";
        ctxMetal.fillRect(0, 0, width, height);

        const drawGoldElements = (targetCtx: CanvasRenderingContext2D, color: string | CanvasGradient) => {
            targetCtx.fillStyle = color;
            targetCtx.strokeStyle = color;

            targetCtx.lineWidth = 6;
            targetCtx.strokeRect(30, 30, width - 60, height - 60);

            targetCtx.save();
            targetCtx.translate(140, 160);
            targetCtx.beginPath();
            targetCtx.moveTo(0, -40);
            targetCtx.lineTo(40, 0);
            targetCtx.lineTo(0, 40);
            targetCtx.lineTo(-40, 0);
            targetCtx.closePath();
            targetCtx.lineWidth = 8;
            targetCtx.stroke();
            targetCtx.restore();

            targetCtx.font = "bold 44px 'Montserrat', sans-serif";
            targetCtx.fillText("KORHOGO PRINT", 210, 155);

            targetCtx.font = "600 20px 'Inter', sans-serif";
            targetCtx.fillText("STUDIO D'IMPRESSION 3D & GRAPHISME", 210, 195);

            targetCtx.fillRect(210, 220, 500, 4);

            targetCtx.font = "500 22px 'Inter', sans-serif";
            targetCtx.fillText("📍 Quartier Commerce, Korhogo", 210, 275);
            targetCtx.fillText("📞 +225 07 00 00 00 00", 210, 315);

            targetCtx.font = "bold 18px 'Inter', sans-serif";
            targetCtx.strokeRect(210, 360, 160, 44);
            targetCtx.fillText("FINITION OR 24K", 225, 388);

            targetCtx.strokeRect(390, 360, 180, 44);
            targetCtx.fillText("VERNIS SÉLECTIF", 405, 388);
        };

        const goldGradient = ctx.createLinearGradient(0, 0, width, height);
        goldGradient.addColorStop(0, "#FFE082");
        goldGradient.addColorStop(0.3, "#FFD54F");
        goldGradient.addColorStop(0.5, "#FFF8E1");
        goldGradient.addColorStop(0.7, "#FFC107");
        goldGradient.addColorStop(1, "#FFB300");

        drawGoldElements(ctx, goldGradient);
        drawGoldElements(ctxMetal, "#FFFFFF");

        const colorMap = new THREE.CanvasTexture(canvas);
        colorMap.colorSpace = THREE.SRGBColorSpace;

        const metalnessMap = new THREE.CanvasTexture(metalCanvas);

        return { colorMap, metalnessMap };
    }, []);
}

function useMugTexture() {
    return useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 512;
        const ctx = canvas.getContext("2d")!;

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, "#FF6B1A");
        grad.addColorStop(0.5, "#FF9E00");
        grad.addColorStop(1, "#FF6B1A");
        ctx.fillStyle = grad;
        ctx.fillRect(100, 100, 824, 312);

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 60px sans-serif";
        ctx.fillText("KORHOGO PRINT", 250, 230);
        ctx.font = "500 32px sans-serif";
        ctx.fillText("Votre Image sur Mug Premium ☕", 250, 295);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }, []);
}

function useFlyerTexture() {
    return useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 768;
        canvas.height = 1024;
        const ctx = canvas.getContext("2d")!;

        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, "#0F172A");
        grad.addColorStop(0.5, "#1E293B");
        grad.addColorStop(1, "#FF6B1A");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 197, 49, 0.15)";
        ctx.beginPath();
        ctx.arc(384, 300, 280, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "900 68px sans-serif";
        ctx.fillText("GRAND EVENT", 80, 220);

        ctx.fillStyle = "#FFC531";
        ctx.font = "bold 44px sans-serif";
        ctx.fillText("IMPRESSION FLYERS A5", 80, 300);

        ctx.fillStyle = "#E2E8F0";
        ctx.font = "400 28px sans-serif";
        ctx.fillText("• Couleurs Éclatantes 300 DPI", 80, 400);
        ctx.fillText("• Livraison Express à Korhogo", 80, 450);
        ctx.fillText("• Délais : 24h à 48h Chrono", 80, 500);

        ctx.fillStyle = "#25D366";
        ctx.beginPath();
        ctx.roundRect(80, 600, 420, 100, 20);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 38px sans-serif";
        ctx.fillText("Dès 10.000 FCFA / 100", 110, 665);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }, []);
}

// --- COMPOSANTS 3D ---

function CarteVisiteGold({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null);
    const { colorMap, metalnessMap } = useBusinessCardTextures();

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;
        groupRef.current.rotation.y = (rotation ? rotation[1] : 0) + Math.sin(t * 0.6) * 0.2;
        groupRef.current.rotation.x = (rotation ? rotation[0] : 0) + Math.cos(t * 0.4) * 0.1;
        groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
    });

    return (
        <group ref={groupRef} position={position} rotation={rotation}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2.2, 1.25, 0.04]} />
                <meshStandardMaterial
                    map={colorMap}
                    metalnessMap={metalnessMap}
                    roughness={0.25}
                    metalness={0.1}
                    envMapIntensity={1.5}
                />
            </mesh>
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.22, 1.27, 0.038]} />
                <meshStandardMaterial color="#FFC531" roughness={0.1} metalness={0.9} />
            </mesh>
        </group>
    );
}

function MugCeramique({ position }: { position: [number, number, number] }) {
    const groupRef = useRef<THREE.Group>(null);
    const mugTexture = useMugTexture();

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;
        groupRef.current.rotation.y = t * 0.4;
        groupRef.current.position.y = position[1] + Math.sin(t * 0.7 + 1) * 0.12;
    });

    return (
        <group ref={groupRef} position={position}>
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <cylinderGeometry args={[0.55, 0.55, 1.1, 48, 1, true]} />
                <meshStandardMaterial map={mugTexture} roughness={0.15} metalness={0.05} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[0, -0.54, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[0.55, 48]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
            </mesh>
            <mesh position={[0, 0.02, 0]}>
                <cylinderGeometry args={[0.51, 0.51, 1.06, 48, 1, true]} />
                <meshStandardMaterial color="#F8FAFC" roughness={0.2} side={THREE.BackSide} />
            </mesh>
            <mesh position={[0.62, 0, 0]} castShadow>
                <torusGeometry args={[0.26, 0.07, 16, 32, Math.PI * 1.2]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.15} metalness={0.05} />
            </mesh>
        </group>
    );
}

function FlyerCourbe({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const flyerTexture = useFlyerTexture();

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(1.3, 1.8, 20, 20);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const z = Math.sin(x * 2.5) * 0.12 + Math.cos(y * 1.5) * 0.06;
            pos.setZ(i, z);
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;
        meshRef.current.rotation.y = (rotation ? rotation[1] : 0) + Math.sin(t * 0.5) * 0.15;
        meshRef.current.position.y = position[1] + Math.sin(t * 0.9 + 2) * 0.15;
    });

    return (
        <mesh ref={meshRef} geometry={geometry} position={position} rotation={rotation} castShadow receiveShadow>
            <meshStandardMaterial map={flyerTexture} roughness={0.2} metalness={0.05} side={THREE.DoubleSide} />
        </mesh>
    );
}

function Badge3D({ position, texte, couleur }: { position: [number, number, number]; texte: string; couleur: string }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;
        ref.current.rotation.y = Math.sin(t * 0.8 + position[0]) * 0.3;
        ref.current.position.y = position[1] + Math.sin(t * 1.2 + position[0]) * 0.1;
    });

    return (
        <group ref={ref} position={position} name={`badge-${texte}`}>
            <mesh castShadow>
                <torusGeometry args={[0.42, 0.03, 16, 32]} />
                <meshStandardMaterial color="#FFC531" roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh castShadow>
                <cylinderGeometry args={[0.4, 0.4, 0.04, 32]} />
                <meshStandardMaterial color={couleur} roughness={0.2} metalness={0.3} transparent opacity={0.9} />
            </mesh>
        </group>
    );
}

function ParticulesOr() {
    const meshRef = useRef<THREE.Points>(null);
    const count = 350;

    const [positions, colors] = useMemo(() => {
        const posArray = new Float32Array(count * 3);
        const colorArray = new Float32Array(count * 3);

        const goldColor = new THREE.Color("#FFC531");
        const orangeColor = new THREE.Color("#FF6B1A");
        const whiteColor = new THREE.Color("#FFFFFF");

        for (let i = 0; i < count; i++) {
            posArray[i * 3] = (Math.random() - 0.5) * 16;
            posArray[i * 3 + 1] = (Math.random() - 0.5) * 10;
            posArray[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

            const r = Math.random();
            const chosenColor = r > 0.6 ? goldColor : r > 0.3 ? orangeColor : whiteColor;
            colorArray[i * 3] = chosenColor.r;
            colorArray[i * 3 + 1] = chosenColor.g;
            colorArray[i * 3 + 2] = chosenColor.b;
        }

        return [posArray, colorArray];
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.02;
        meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.045} vertexColors transparent opacity={0.75} sizeAttenuation />
        </points>
    );
}

function CameraParallax() {
    const { camera } = useThree();
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handlePointerMove = (e: MouseEvent | TouchEvent) => {
            const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
            const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
            target.current.x = (clientX / window.innerWidth - 0.5) * 1.5;
            target.current.y = (clientY / window.innerHeight - 0.5) * 1.2;
        };

        window.addEventListener("mousemove", handlePointerMove);
        window.addEventListener("touchmove", handlePointerMove);
        return () => {
            window.removeEventListener("mousemove", handlePointerMove);
            window.removeEventListener("touchmove", handlePointerMove);
        };
    }, []);

    useFrame(() => {
        camera.position.x += (target.current.x - camera.position.x) * 0.05;
        camera.position.y += (0.4 - target.current.y * 0.6 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
    });

    return null;
}

function EclairageStudio({ themeMode }: { themeMode: "nuit" | "jour" }) {
    const isJour = themeMode === "jour";
    return (
        <>
            <ambientLight intensity={isJour ? 1.2 : 0.6} />
            <directionalLight position={[6, 8, 6]} intensity={isJour ? 2.5 : 1.8} castShadow color={isJour ? "#FFFFFF" : "#FFF8E1"} />
            <spotLight position={[-6, 4, -4]} intensity={isJour ? 1.5 : 2.2} color={isJour ? "#FF9E00" : "#FF6B1A"} angle={0.6} penumbra={0.8} />
            <pointLight position={[3, -2, 3]} intensity={1.2} color="#FFC531" />
            <pointLight position={[-4, 2, 2]} intensity={0.6} color="#0EA5E9" />
        </>
    );
}

function SceneHero3D({ themeMode }: { themeMode: "nuit" | "jour" }) {
    return (
        <>
            <EclairageStudio themeMode={themeMode} />
            <CameraParallax />

            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                <CarteVisiteGold position={[-1.8, 0.4, 0.8]} rotation={[0.2, 0.4, -0.1]} />
            </Float>

            <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.3}>
                <CarteVisiteGold position={[-2.4, -1.0, -0.6]} rotation={[-0.2, -0.5, 0.2]} />
            </Float>

            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.5}>
                <MugCeramique position={[2.2, -0.6, 0.2]} />
            </Float>

            <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.4}>
                <FlyerCourbe position={[0.4, 0.9, -0.4]} rotation={[0.1, -0.3, 0.15]} />
            </Float>

            <Badge3D position={[2.6, 1.1, -0.2]} texte="24H" couleur="#FF6B1A" />
            <Badge3D position={[-0.4, -1.4, 0.6]} texte="OR" couleur="#FFC531" />

            <ParticulesOr />

            <ContactShadows position={[0, -2.2, 0]} opacity={0.4} scale={12} blur={2.5} far={4} color="#0F172A" />

            <Environment preset={themeMode === "jour" ? "sunset" : "city"} />
        </>
    );
}

export default function Hero3D() {
    const { theme } = useTheme();
    const [isAROpen, setIsAROpen] = useState(false);
    const isJour = theme === "jour";

    return (
        <section id="top" className="hero-gradient grain relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden transition-colors duration-500">
            <ModalARViewer isOpen={isAROpen} onClose={() => setIsAROpen(false)} produitName="Carte & Mug 3D" />

            <div className="absolute top-1/4 left-10 w-96 h-96 bg-energie/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-korhogo/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-8 items-center relative z-10 w-full">

                <motion.div
                    className="lg:col-span-7"
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                >
                    <div className={`inline-flex items-center gap-2 border text-xs md:text-sm px-4 py-2 rounded-full mb-6 backdrop-blur-md shadow-lg ${isJour ? "bg-slate-900/10 border-slate-900/20 text-slate-900" : "bg-white/10 border-white/20 text-white"}`}>
                        <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energie opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-energie"></span>
                        </span>
                        <span className="font-medium">N°1 Studio d'Impression & Infographie 3D à Korhogo</span>
                    </div>

                    <h1 className={`font-display font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight ${isJour ? "text-slate-900" : "text-white"}`}>
                        Vos impressions <span className="bg-gradient-to-r from-energie via-korhogo to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">3D & Premium</span> qui marquent les esprits.
                    </h1>

                    <p className={`mt-6 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed font-light ${isJour ? "text-slate-700" : "text-slate-200"}`}>
                        Cartes de visite avec <strong className="text-energie font-bold">Dorure Or 24K</strong>, flyers vernis sélectif, bâches grand format & textile. Devis en 5 min sur WhatsApp, fabrication sur place à Korhogo.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mt-8">
                        <a
                            href={buildWhatsAppLink("Bonjour Korhogo Print ! Je souhaite demander un devis avec vos options 3D et finitions (Dorure / Vernis / Bâche / Textile).")}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-whatsapp text-white font-bold px-8 py-4 rounded-full text-base sm:text-lg shadow-xl shadow-green-600/30 hover:shadow-green-500/50 flex items-center gap-3 transform hover:-translate-y-0.5 transition-all"
                        >
                            <span className="text-2xl">💬</span>
                            <span>Devis Express WhatsApp</span>
                        </a>

                        <button
                            onClick={() => setIsAROpen(true)}
                            className={`border font-bold px-7 py-4 rounded-full text-base transition-all backdrop-blur-md shadow-lg flex items-center gap-2 ${isJour ? "bg-slate-900/10 border-slate-900/20 text-slate-900 hover:bg-slate-900/20" : "bg-white/15 border-white/30 text-white hover:bg-white/25"}`}
                        >
                            <span>📱</span>
                            <span>Voir en Réalité Augmentée (AR)</span>
                        </button>
                    </div>

                    <div className={`grid grid-cols-3 gap-4 mt-12 pt-8 border-t max-w-lg ${isJour ? "border-slate-900/15" : "border-white/15"}`}>
                        <div>
                            <span className="font-display font-black text-2xl sm:text-3xl block text-energie">2 500+</span>
                            <span className={`text-xs sm:text-sm font-medium ${isJour ? "text-slate-600" : "text-white/70"}`}>Clients Satisfaits</span>
                        </div>
                        <div>
                            <span className="font-display font-black text-2xl sm:text-3xl block text-energie">24h</span>
                            <span className={`text-xs sm:text-sm font-medium ${isJour ? "text-slate-600" : "text-white/70"}`}>Livraison Express</span>
                        </div>
                        <div>
                            <span className="font-display font-black text-2xl sm:text-3xl block text-amber-600">100%</span>
                            <span className={`text-xs sm:text-sm font-medium ${isJour ? "text-slate-600" : "text-white/70"}`}>Qualité Pro HD</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className="lg:col-span-5 h-[460px] sm:h-[540px] lg:h-[620px] relative w-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                >
                    <Canvas dpr={[1, 2]} camera={{ position: [0, 0.4, 6.2], fov: 42 }}>
                        <Suspense fallback={null}>
                            <SceneHero3D themeMode={theme} />
                        </Suspense>
                    </Canvas>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-white/20 backdrop-blur-xl text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3.5 w-[92%] sm:w-[85%]">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-energie to-korhogo flex items-center justify-center text-xl shrink-0 shadow-lg">
                                ✨
                            </div>
                            <div className="text-xs sm:text-sm">
                                <strong className="text-white font-semibold block">Aperçu 3D Temps Réel</strong>
                                <span className="text-slate-300">Mode : {theme === "nuit" ? "🌙 Studio Nuit Or" : "☀️ Soleil Poro"}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsAROpen(true)}
                            className="bg-energie hover:bg-energie/90 text-white text-xs font-bold px-3 py-2 rounded-xl shrink-0"
                        >
                            📱 Projeter AR
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-energie via-korhogo to-energie py-3 overflow-hidden shadow-inner">
                <div className="marquee whitespace-nowrap font-display font-black text-slate-950 text-xs sm:text-sm tracking-wider uppercase flex gap-8 w-max">
                    <span>✨ CARTES DORURE OR 24K • FLYERS VERNIS SÉLECTIF • BÂCHES GRAND FORMAT • T-SHIRTS DTF • MUGS CÉRAMIQUE • STICKERS DECOUPE • CALENDRIERS 2026 • CACHETS EXPRESS • KORHOGO IMPRESSION 3D •&nbsp;</span>
                    <span>✨ CARTES DORURE OR 24K • FLYERS VERNIS SÉLECTIF • BÂCHES GRAND FORMAT • T-SHIRTS DTF • MUGS CÉRAMIQUE • STICKERS DECOUPE • CALENDRIERS 2026 • CACHETS EXPRESS • KORHOGO IMPRESSION 3D •&nbsp;</span>
                </div>
            </div>
        </section>
    );
}
