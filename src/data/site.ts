export const WHATSAPP_NUMBER = "2250778008488";
export const PROPRIETAIRE_NOM = "Moribah Premier";
export const TELEPHONE_AFFICHE = "+225 07 78 00 84 88";

export const buildWhatsAppLink = (message: string) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export type Service = {
    id: string;
    titre: string;
    description: string;
    prix: string;
    delai: string;
    emoji: string;
    couleur: string;
    options: string[];
};

export const services: Service[] = [
    {
        id: "cartes",
        titre: "Cartes de Visite Or & Sénoufo",
        description: "Cartes 350g avec Dorure Or 24K ou motifs géométriques Sénoufo gravés. Impression haute précision pour marquer vos clients du Poro.",
        prix: "dès 5 000 FCFA / 100 ex",
        delai: "24h Express",
        emoji: "🪪",
        couleur: "#B83A1B", // Latérite
        options: ["350g couché mat", "Dorure Or 24K", "Motif Sénoufo Gravé", "Vernis Sélectif"],
    },
    {
        id: "flyers",
        titre: "Flyers & Affiches de Proximité",
        description: "Formats A6, A5, A4 pour vos événements, maquis, écoles et coopératives d'anacarde. Couleurs vives résistantes au soleil du Nord.",
        prix: "dès 10 000 FCFA / 100 ex A5",
        delai: "24h - 48h",
        emoji: "📄",
        couleur: "#D4AF37", // Or Éburnie
        options: ["A6 / A5 / A4", "Papier 135g - 250g", "Vernis UV brillant"],
    },
    {
        id: "baches",
        titre: "Bâches & Enseignes Grand Format",
        description: "Bâches haute résistance, vinyles autocollants et habillage de vitrines. Installation rapide sur Korhogo et axes principaux.",
        prix: "dès 3 500 FCFA / m²",
        delai: "24h - 48h",
        emoji: "🖼️",
        couleur: "#111C33", // Indigo Waraniéné
        options: ["Bâche 440g renforcée", "Vinyle autocollant", "Pose à Korhogo"],
    },
    {
        id: "tshirts",
        titre: "Textile & Sérigraphie DTF",
        description: "Personnalisation t-shirts, polos, casquettes pour associations, coopératives et cérémonies de mariage coutumier.",
        prix: "dès 3 000 FCFA / pièce",
        delai: "48h",
        emoji: "👕",
        couleur: "#25D366",
        options: ["Impression DTF Haute Définition", "Flocage Prénom / Logo", "Polo Coton Pro"],
    },
    {
        id: "gadgets",
        titre: "Gadgets & Goodies Artisanaux",
        description: "Mugs céramique, stylos gravés, agendas, calendriers 2026. Idéal pour mariages Sénoufo, baptêmes et cadeaux d'affaires.",
        prix: "dès 1 500 FCFA / pièce",
        delai: "48h - 4 jours",
        emoji: "🎁",
        couleur: "#AA3BFF",
        options: ["Mugs Céramique Mots Or", "Stylos Métal Gravés", "Calendriers 2026"],
    },
    {
        id: "bureautique",
        titre: "Bureautique & Cachets Express",
        description: "En-têtes, facturiers duplicata/triplicata, cachets automatiques express, reliures pour administrations et PME de Korhogo.",
        prix: "sur devis",
        delai: "Jour même (Express)",
        emoji: "🖨️",
        couleur: "#0EA5E9",
        options: ["Cachet Tampon Express", "Facturiers duplicata", "Papier En-tête Pro"],
    },
];

export const tarifs = [
    { produit: "100 Cartes de Visite Premium", prix: "5 000 FCFA", delai: "24h" },
    { produit: "100 Flyers A5 Couleur", prix: "10 000 FCFA", delai: "48h" },
    { produit: "Bâche Grand Format (m²)", prix: "3 500 FCFA", delai: "24h" },
    { produit: "T-shirt DTF Personnalisé", prix: "3 000 FCFA", delai: "48h" },
    { produit: "Mug Céramique Imprimé", prix: "2 500 FCFA", delai: "48h" },
    { produit: "100 Affiches A3 Pub", prix: "25 000 FCFA", delai: "72h" },
];

export type Realisation = {
    titre: string;
    categorie: string;
    couleur: string;
    emoji: string;
    image: string;
};

export const realisations: Realisation[] = [
    { titre: "Enseigne Coopérative Anacarde du Poro", categorie: "Bâche & Grand Format", couleur: "#B83A1B", emoji: "🏭", image: "/images/realisations/anacarde.png" },
    { titre: "Cartes Dorure Or - Cabinet Soro & Associés", categorie: "Cartes de Visite", couleur: "#D4AF37", emoji: "⚖️", image: "/images/realisations/cartes_soro.png" },
    { titre: "T-shirts Festival des Arts Sénoufo (FESTAS)", categorie: "Textile & Sérigraphie", couleur: "#25D366", emoji: "🎶", image: "/images/realisations/tshirts_festas.png" },
    { titre: "Flyers Université Peleforo Gon Coulibaly", categorie: "Flyers & Édition", couleur: "#111C33", emoji: "🎓", image: "/images/realisations/flyers_upgc.png" },
    { titre: "Mugs Mariage Traditionnel Soro & Tuo", categorie: "Gadgets Goodies", couleur: "#AA3BFF", emoji: "💍", image: "/images/realisations/mugs_mariage.png" },
    { titre: "Vitrine & Enseigne Hôtel Mont Korhogo", categorie: "Grand Format", couleur: "#0EA5E9", emoji: "🏨", image: "/images/realisations/vitrine_hotel.png" },
];

export const faqs = [
    {
        q: "Quels formats de fichiers acceptez-vous ?",
        a: "Nous acceptons les fichiers PDF HD, AI, PSD, PNG ou JPG. Pas de visuel ? Nos graphistes locaux à Korhogo créent votre maquette dès 2 000 FCFA.",
    },
    {
        q: "Quels sont les délais d'impression à Korhogo ?",
        a: "Cartes en 24h, bâches en 24h, flyers 48h, textile 48h. Pour une urgence cérémoniale ou événementielle, appelez-nous directement sur WhatsApp !",
    },
    {
        q: "Comment s'effectue le paiement ?",
        a: "Le paiement s'effectue à la livraison au magasin au Quartier Commerce à Korhogo. Espèces, Orange Money, Wave ou Moov Money acceptés.",
    },
    {
        q: "Expédiez-vous hors de Korhogo ?",
        a: "Oui ! Expédition quotidienne vers Sinématiali, Ferkessédougou, Boundiali, Kouto et Abidjan par car.",
    },
];
