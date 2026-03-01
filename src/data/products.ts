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
  | "hija"
  | "hijo"
  | "bebe"
  | "adulto"
  | "familia";

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
}

export const collections: { id: Collection; label: string; color: string }[] = [
  { id: "todos", label: "Todos", color: "bg-papachoa-cream" },
  { id: "hija", label: "Hija", color: "bg-papachoa-blush" },
  { id: "hijo", label: "Hijo", color: "bg-papachoa-sky" },
  { id: "bebe", label: "Bebé", color: "bg-papachoa-sage" },
  { id: "adulto", label: "Adulto", color: "bg-papachoa-peach" },
  { id: "familia", label: "Toda la Familia", color: "bg-papachoa-cream" },
];

export const collectionDescriptions: Record<Exclude<Collection, "todos">, string> = {
  hija: "Para las pequeñas de la casa",
  hijo: "Para los pequeños aventureros",
  bebe: "Suavidad desde el primer abrazo",
  adulto: "Comodidad y estilo para ti",
  familia: "Diseñados para verse juntos",
};

/**
 * Categorizes a product based on its title and description into
 * one of: hija, hijo, bebe, adulto, familia
 */
export function categorizeProduct(title: string, description: string = "", tags: string[] = []): Exclude<Collection, "todos"> {
  const t = title.toLowerCase();
  const d = description.toLowerCase();
  const allText = `${t} ${d} ${tags.join(" ").toLowerCase()}`;

  // Family sets
  if (allText.includes("familia") || allText.includes("family") || (allText.includes("mamá") && allText.includes("papá"))) {
    return "familia";
  }

  // Baby
  if (allText.includes("bebé") || allText.includes("bebe") || allText.includes("baby") || allText.includes("recién nacido") || allText.includes("0-3m") || allText.includes("3-6m")) {
    return "bebe";
  }

  // Hijo (boy)
  if (allText.includes("hijo") || allText.includes("niño") || allText.includes("boy")) {
    return "hijo";
  }

  // Hija (girl)
  if (allText.includes("hija") || allText.includes("niña") || allText.includes("girl")) {
    return "hija";
  }

  // Adult
  if (allText.includes("adulto") || allText.includes("adult") || allText.includes("turbante") || allText.includes("mamá") || allText.includes("papá")) {
    return "adulto";
  }

  // Default to familia for matching/set products
  if (allText.includes("matching") || allText.includes("set") || allText.includes("&")) {
    return "familia";
  }

  return "familia";
}

export const products: Product[] = [
  {
    id: "pijama-mama-bebe",
    slug: "pijama-mama-bebe",
    name: "Pijama Mamá & Hijos",
    price: 1290,
    collection: "familia",
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
    collection: "hija",
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
    collection: "hija",
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
