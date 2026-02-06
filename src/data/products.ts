export type Collection = 
  | "todos"
  | "recien-nacido" 
  | "bebe-cobijo" 
  | "pijamas-familiares" 
  | "sacos-nidos" 
  | "regalo";

export interface Product {
  id: string;
  name: string;
  price: number;
  collection: Exclude<Collection, "todos">;
  image: string;
}

export const collections: { id: Collection; label: string; color: string }[] = [
  { id: "todos", label: "Todos", color: "bg-papachoa-cream" },
  { id: "recien-nacido", label: "Recién Nacido", color: "bg-papachoa-blush" },
  { id: "bebe-cobijo", label: "Bebé & Cobijo", color: "bg-papachoa-sky" },
  { id: "pijamas-familiares", label: "Pijamas Familiares", color: "bg-papachoa-sage" },
  { id: "sacos-nidos", label: "Sacos & Nidos", color: "bg-papachoa-peach" },
  { id: "regalo", label: "Listo para Regalar", color: "bg-papachoa-blush-mid" },
];

export const products: Product[] = [
  // Recién Nacido
  {
    id: "set-bienvenida-recien-nacido",
    name: "Set Bienvenida Recién Nacido",
    price: 890,
    collection: "recien-nacido",
    image: "/placeholder.svg",
  },
  {
    id: "cobija-primera-siesta",
    name: "Cobija Primera Siesta",
    price: 650,
    collection: "recien-nacido",
    image: "/placeholder.svg",
  },
  {
    id: "mameluco-estrellitas",
    name: "Mameluco Estrellitas",
    price: 450,
    collection: "recien-nacido",
    image: "/placeholder.svg",
  },

  // Bebé & Cobijo
  {
    id: "cobija-abrazo-suave",
    name: "Cobija Abrazo Suave",
    price: 780,
    collection: "bebe-cobijo",
    image: "/placeholder.svg",
  },
  {
    id: "pijama-dulces-suenos",
    name: "Pijama Dulces Sueños",
    price: 520,
    collection: "bebe-cobijo",
    image: "/placeholder.svg",
  },
  {
    id: "set-cobija-gorro",
    name: "Set Cobija + Gorro",
    price: 890,
    collection: "bebe-cobijo",
    image: "/placeholder.svg",
  },

  // Pijamas Familiares
  {
    id: "pijama-mama-bebe",
    name: "Pijama Mamá + Bebé",
    price: 1290,
    collection: "pijamas-familiares",
    image: "/placeholder.svg",
  },
  {
    id: "set-familia-completa",
    name: "Set Familia Completa",
    price: 2450,
    collection: "pijamas-familiares",
    image: "/placeholder.svg",
  },
  {
    id: "pijama-papa-oso",
    name: "Pijama Papá Oso",
    price: 680,
    collection: "pijamas-familiares",
    image: "/placeholder.svg",
  },

  // Sacos & Nidos
  {
    id: "saco-dormir-nube",
    name: "Saco de Dormir Nube",
    price: 950,
    collection: "sacos-nidos",
    image: "/placeholder.svg",
  },
  {
    id: "nido-para-bebe",
    name: "Nido para Bebé",
    price: 1180,
    collection: "sacos-nidos",
    image: "/placeholder.svg",
  },
  {
    id: "saco-transicion",
    name: "Saco Transición",
    price: 720,
    collection: "sacos-nidos",
    image: "/placeholder.svg",
  },

  // Listo para Regalar
  {
    id: "caja-regalo-baby-shower",
    name: "Caja Regalo Baby Shower",
    price: 1450,
    collection: "regalo",
    image: "/placeholder.svg",
  },
  {
    id: "set-primeros-meses",
    name: "Set Primeros Meses",
    price: 980,
    collection: "regalo",
    image: "/placeholder.svg",
  },
  {
    id: "canasta-apapacho",
    name: "Canasta Apapacho",
    price: 1650,
    collection: "regalo",
    image: "/placeholder.svg",
  },
];
