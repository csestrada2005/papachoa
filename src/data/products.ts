import pijamaRosa0 from "@/assets/pijama-rosa-0-familia-azul.jpg";
import pijamaRosa1 from "@/assets/pijama-rosa-1-abrazo.jpg";
import pijamaRosa2 from "@/assets/pijama-rosa-2-ternura.jpg";
import pijamaRosa3 from "@/assets/pijama-rosa-3-jugando.jpg";
import pijamaRosa4 from "@/assets/pijama-rosa-4-nina-frente.jpg";
import pijamaRosa5 from "@/assets/pijama-rosa-5-nina-mama.jpg";
import pijamaRosa6 from "@/assets/pijama-rosa-6-detalle.jpg";
import pijamaRosa7 from "@/assets/pijama-rosa-7-familia.jpg";
import pijamaRosa8 from "@/assets/pijama-rosa-8-hermanos.jpg";
import pijamaRosa9 from "@/assets/pijama-rosa-9-acostados.jpg";
import pijamaBlanca1 from "@/assets/pijama-blanca-1-dibujando.jpg";
import pijamaBlanca2 from "@/assets/pijama-blanca-2-nina-dibuja.jpg";
import pijamaBlanca3 from "@/assets/pijama-blanca-3-familia.jpg";
import pijamaBlanca4 from "@/assets/pijama-blanca-4-abrazo.jpg";
import pijamaBlanca5 from "@/assets/pijama-blanca-5-detalle.jpg";
import pijamadinosaurio1 from "@/assets/pijama-dinosaurio-1-papa-nina.jpg";
import pijamadinosaurio2 from "@/assets/pijama-dinosaurio-2-papa-lift.jpg";
import pijamadinosaurio3 from "@/assets/pijama-dinosaurio-3-papa-upside.jpg";
import pijamadinosaurio4 from "@/assets/pijama-dinosaurio-4-standing.jpg";

export type Collection =
  | "todos"
  | "flores"
  | "changos"
  | "para-pintar"
  | "hongos"
  | "otros";

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  collection: Exclude<Collection, "todos">;
  image: string;
  images: string[];
  shortDescription: string;
  longDescription: string;
  tags: string[];
  sizes: string[];
  sizesSecondary?: string[];
  material: string;
  care: string[];
  shippingSummary: string;
  returnSummary: string;
  featured: boolean;
  colorway: string;
  totalInventory?: number | null;
  variantInventory?: Array<{ id: string; title: string; quantityAvailable: number | null }>;
  shopifyOptions?: Array<{ name: string; values: string[] }>;
}

export const collections: { id: Collection; label: string; color: string }[] = [
  { id: "todos", label: "Todos", color: "bg-papachoa-cream" },
  { id: "flores", label: "Flores", color: "bg-papachoa-blush" },
  { id: "changos", label: "Changos", color: "bg-papachoa-sage" },
  { id: "para-pintar", label: "Para Pintar", color: "bg-papachoa-peach" },
  { id: "hongos", label: "Hongos", color: "bg-papachoa-cream" },
  { id: "otros", label: "Otros", color: "bg-papachoa-cream" },
];

export const collectionDescriptions: Record<Exclude<Collection, "todos">, string> = {
  flores: "Estampados florales llenos de color",
  changos: "Divertidos prints de changos",
  "para-pintar": "Diseños listos para colorear",
  hongos: "Estampados de hongos mágicos",
  otros: "Más diseños únicos",
};

/**
 * Categorizes a product based on its title and description.
 * Matches keywords in title first, then description/tags.
 */
export function categorizeProduct(title: string, description: string = "", tags: string[] = []): Exclude<Collection, "todos"> {
  const t = title.toLowerCase();
  const d = description.toLowerCase();
  const allText = `${t} ${d} ${tags.join(" ").toLowerCase()}`;

  // Hongos (check before para-pintar to avoid false matches on "color")
  if (allText.includes("hongo") || allText.includes("hongos") || allText.includes("mushroom") || allText.includes("seta") || allText.includes("setas")) {
    return "hongos";
  }

  // Flores
  if (allText.includes("flor") || allText.includes("flores") || allText.includes("flower")) {
    return "flores";
  }

  // Changos
  if (allText.includes("chango") || allText.includes("changos") || allText.includes("mono") || allText.includes("monos") || allText.includes("monkey")) {
    return "changos";
  }

  // Para Pintar / Doodle / Colorear (no broad "color" match)
  if (allText.includes("pintar") || allText.includes("colorear") || allText.includes("doodle") || allText.includes("dibujo") || allText.includes("dibujar") || allText.includes("paint")) {
    return "para-pintar";
  }

  // Default
  return "otros";
}

export const products: Product[] = [
  {
    id: "pijama-mama-bebe",
    slug: "pijama-mama-bebe",
    name: "Pijama Mamá & Hijos",
    price: 1290,
    collection: "flores",
    image: pijamaRosa0,
    images: [pijamaRosa0, pijamaRosa1, pijamaRosa2, pijamaRosa3, pijamaRosa4, pijamaRosa5, pijamaRosa6, pijamaRosa7, pijamaRosa8, pijamaRosa9],
    shortDescription: "Combina con tu bebé en suavidad y estilo. Momentos que se quedan.",
    longDescription: "El set Mamá + Bebé es uno de nuestros más queridos. Pijamas iguales para mamá y su pequeño, confeccionadas en la misma tela ultra suave. Perfectas para sesiones de fotos, noches de película o simplemente para sentirse conectadas. Porque vestirse igual nunca se sintió tan bonito.",
    tags: ["pijama", "mamá", "bebé", "matching"],
    sizes: ["CH", "M", "G", "XG"],
    sizesSecondary: ["0-3M", "3-6M", "6-12M", "12-18M"],
    material: "Jersey de algodón peinado con elastano para comodidad total. Suave y con excelente caída.",
    care: ["Lavar con agua fría", "No mezclar con colores oscuros", "Secar al aire para mantener suavidad"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Rosa y crema",
  },
  {
    id: "pijama-doodle-mama-bebe",
    slug: "pijama-doodle-mama-bebe",
    name: "Pijama Mamá & Hija – Doodle",
    price: 1390,
    collection: "para-pintar",
    image: pijamaBlanca1,
    images: [pijamaBlanca1, pijamaBlanca3, pijamaBlanca2, pijamaBlanca5, pijamaBlanca4],
    shortDescription: "Dibujando momentos juntas. Pijama con print de doodles para mamá y su pequeña artista.",
    longDescription: "El set Doodle Mamá + Hija celebra la creatividad y el juego compartido. Con un estampado de dibujos hechos a mano sobre tela blanca ultra suave, estas pijamas son perfectas para esas tardes de crayones y risas. Cada trazo del print está inspirado en los dibujos reales de niñas, haciendo de cada pijama una pieza única llena de personalidad.",
    tags: ["pijama", "mamá", "hija", "matching", "doodle"],
    sizes: ["CH", "M", "G", "XG"],
    sizesSecondary: ["0-3M", "3-6M", "6-12M", "12-18M"],
    material: "Jersey de algodón peinado con elastano para comodidad total. Suave y con excelente caída.",
    care: ["Lavar con agua fría", "No mezclar con colores oscuros", "Secar al aire para mantener suavidad"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Blanco doodle",
  },
  {
    id: "pijama-dinosaurio-papa-nina",
    slug: "pijama-dinosaurio-papa-nina",
    name: "Pijama Papá & Hija – Dinosaurio",
    price: 1490,
    collection: "otros",
    image: pijamadinosaurio1,
    images: [pijamadinosaurio1, pijamadinosaurio2, pijamadinosaurio3, pijamadinosaurio4],
    shortDescription: "Dinosaurios y diversión. Pijama para papá y su pequeña aventurera.",
    longDescription: "El set Dinosaurio Papá + Niña celebra la aventura y el juego compartido. Con un estampado de dinosaurios amigables sobre tela blanca ultra suave, estas pijamas son perfectas para esas noches de historias fantásticas y abrazos largos. Cada detalle está diseñado para que papá y su pequeña se sientan cómodos, unidos y listos para los mejores sueños.",
    tags: ["pijama", "papá", "niña", "matching", "dinosaurio", "aventura"],
    sizes: ["XS", "S", "M", "L", "XL"],
    sizesSecondary: ["2A", "4A", "6A", "8A", "10A", "12A"],
    material: "Jersey de algodón peinado con elastano para comodidad total. Suave y con excelente caída.",
    care: ["Lavar con agua fría", "No mezclar con colores oscuros", "Secar al aire para mantener suavidad"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Azul dinosaurio",
  },
];
