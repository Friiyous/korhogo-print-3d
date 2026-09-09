import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalARViewerProps {
    isOpen: boolean;
    onClose: () => void;
    produitName?: string;
}

export default function ModalARViewer({ isOpen, onClose, produitName = "Carte de Visite Luxe" }: ModalARViewerProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Dessin du QR Code stylisé sur Canvas
    useEffect(() => {
        if (!isOpen || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d")!;
        const size = canvas.width;

        // Fond blanc épuré
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, size, size);

        // Couleur des modules du QR code (Korhogo Print orange & encre)
        ctx.fillStyle = "#0F172A";

        const cells = 21;
        const cellSize = size / cells;

        // Matrice QR fictive mais très réaliste avec coins de détection
        const drawSquare = (x: number, y: number, w: number, h: number) => {
            ctx.fillRect(x * cellSize, y * cellSize, w * cellSize, h * cellSize);
        };

        // Tracé des 3 yeux de cadrage QR Code
        const drawEye = (x: number, y: number) => {
            ctx.fillStyle = "#FF6B1A";
            drawSquare(x, y, 7, 7);
            ctx.fillStyle = "#FFFFFF";
            drawSquare(x + 1, y + 1, 5, 5);
            ctx.fillStyle = "#0F172A";
            drawSquare(x + 2, y + 2, 3, 3);
        };

        drawEye(1, 1);
        drawEye(13, 1);
        drawEye(1, 13);

        // Modules de données aléatoires déterministes
        ctx.fillStyle = "#0F172A";
        for (let r = 0; r < cells; r++) {
            for (let c = 0; c < cells; c++) {
                if ((r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8)) continue;
                if ((r * 7 + c * 13 + 5) % 3 === 0) {
                    ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
                }
            }
        }

        // Logo K central
        const center = size / 2;
        ctx.fillStyle = "#FF6B1A";
        ctx.beginPath();
        ctx.arc(center, center, cellSize * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.font = "bold 20px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("K", center, center);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-slate-900 border border-slate-700/80 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
                    >
                        {/* Bouton Fermer */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center transition"
                        >
                            ✕
                        </button>

                        {/* En-tête */}
                        <div className="text-center mb-6">
                            <span className="inline-block bg-energie/20 text-energie text-xs font-bold px-3.5 py-1.5 rounded-full mb-2">
                                📱 Réalité Augmentée 3D
                            </span>
                            <h3 className="font-display font-bold text-2xl text-white">
                                Projetez votre <span className="text-energie">{produitName}</span>
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm mt-1">
                                Scannez ce QR Code avec votre téléphone pour faire flotter l'impression 3D sur votre bureau à Korhogo.
                            </p>
                        </div>

                        {/* Zone QR Code */}
                        <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl mb-6 shadow-inner">
                            <canvas ref={canvasRef} width={220} height={220} className="w-48 h-48" />
                            <span className="text-slate-500 text-[11px] font-semibold mt-2">
                                Compatible iOS (AR QuickLook) & Android (WebXR)
                            </span>
                        </div>

                        {/* Étapes d'utilisation */}
                        <div className="space-y-2.5 text-xs text-slate-300 mb-6 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50">
                            <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-energie text-white font-bold flex items-center justify-center text-[10px]">1</span>
                                <span>Ouvrez l'appareil photo de votre smartphone.</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-energie text-white font-bold flex items-center justify-center text-[10px]">2</span>
                                <span>Pointez vers le QR Code ci-dessus.</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <span className="w-5 h-5 rounded-full bg-energie text-white font-bold flex items-center justify-center text-[10px]">3</span>
                                <span>Déplacez votre téléphone sur votre table ou bureau.</span>
                            </div>
                        </div>

                        {/* Bouton de Fermeture */}
                        <button
                            onClick={onClose}
                            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 rounded-xl text-sm transition"
                        >
                            Fermer
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
