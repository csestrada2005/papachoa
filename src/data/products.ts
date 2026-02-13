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

export type Collection =
  | "todos"
  | "recien-nacido"
  | "bebe-cobijo"
  | "pijamas-familiares"
  | "sacos-nidos"
  | "regalo";

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
}

export const collections: { id: Collection; label: string; color: string }[] = [
  { id: "todos", label: "Todos", color: "bg-papachoa-cream" },
  { id: "recien-nacido", label: "Recién Nacido", color: "bg-papachoa-blush" },
  { id: "bebe-cobijo", label: "Bebé & Cobijo", color: "bg-papachoa-sky" },
  { id: "pijamas-familiares", label: "Pijamas Familiares", color: "bg-papachoa-sage" },
  { id: "sacos-nidos", label: "Sacos & Nidos", color: "bg-papachoa-peach" },
  { id: "regalo", label: "Listo para Regalar", color: "bg-papachoa-blush-mid" },
];

export const collectionDescriptions: Record<Exclude<Collection, "todos">, string> = {
  "recien-nacido": "Suavidad desde el primer día",
  "bebe-cobijo": "Apapacho para los más pequeños",
  "pijamas-familiares": "Momentos juntos, vestidos igual",
  "sacos-nidos": "Sueños seguros y calientitos",
  "regalo": "El regalo perfecto para dar amor",
};

export const products: Product[] = [
  // Recién Nacido
  {
    id: "set-bienvenida-recien-nacido",
    slug: "set-bienvenida-recien-nacido",
    name: "Set Bienvenida Recién Nacido",
    price: 890,
    collection: "recien-nacido",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Todo lo que necesitas para recibir al bebé con suavidad y amor.",
    longDescription: "Nuestro set de bienvenida incluye las piezas esenciales para los primeros días de tu bebé: un mameluco ultra suave, una cobijita y un gorrito. Cada pieza está pensada para abrazar a tu recién nacido con la ternura que merece. Confeccionado con telas que respetan su piel delicada y lo mantienen calientito sin sobrecalentar.",
    tags: ["recién nacido", "set", "regalo"],
    sizes: ["0-3M", "3-6M"],
    material: "Algodón peinado ultra suave con acabado brushed. Libre de químicos agresivos, hipoalergénico y seguro para la piel más delicada.",
    care: ["Lavar con agua tibia en ciclo suave", "Usar detergente suave sin blanqueador", "Secar al aire o a baja temperatura", "No usar secadora de calor alto"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Rosa empolvado",
  },
  {
    id: "cobija-primera-siesta",
    slug: "cobija-primera-siesta",
    name: "Cobija Primera Siesta",
    price: 650,
    collection: "recien-nacido",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "La cobija perfecta para esas primeras siestas llenas de calma.",
    longDescription: "Diseñada para envolver a tu bebé en suavidad absoluta. Nuestra cobija Primera Siesta tiene el peso justo para arrullar sin agobiar, y la textura ideal para que cada siesta se sienta como un abrazo largo. Perfecta para la cuna, el cochecito o los brazos de mamá.",
    tags: ["cobija", "recién nacido", "siesta"],
    sizes: ["Única"],
    material: "Mezcla de algodón y bambú. Transpirable, suave al tacto y con acabado que mejora con cada lavado.",
    care: ["Lavar con agua tibia en ciclo suave", "Usar detergente suave sin blanqueador", "Secar al aire preferiblemente"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: false,
    colorway: "Crema natural",
  },
  {
    id: "mameluco-estrellitas",
    slug: "mameluco-estrellitas",
    name: "Mameluco Estrellitas",
    price: 450,
    collection: "recien-nacido",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Un mameluco lleno de estrellitas para noches de descanso.",
    longDescription: "El Mameluco Estrellitas es suave como una nube y tiene snaps fáciles de abrir para los cambios nocturnos. Su diseño de estrellitas bordadas le da un toque tierno sin ser recargado. Ideal para los primeros meses, cuando la comodidad lo es todo.",
    tags: ["mameluco", "recién nacido", "estrellitas"],
    sizes: ["0-3M", "3-6M", "6-9M"],
    material: "Algodón peinado 100% con terminado extra suave. Costuras planas para evitar rozaduras.",
    care: ["Lavar con agua tibia en ciclo suave", "No usar blanqueador", "Secar a baja temperatura"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: false,
    colorway: "Gris claro con estrellas",
  },

  // Bebé & Cobijo
  {
    id: "cobija-abrazo-suave",
    slug: "cobija-abrazo-suave",
    name: "Cobija Abrazo Suave",
    price: 780,
    collection: "bebe-cobijo",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Un abrazo hecho cobija. Suavidad que se siente desde el primer toque.",
    longDescription: "La Cobija Abrazo Suave es nuestra pieza insignia para bebés. Generosa en tamaño, ligera pero cálida, con una textura que invita a acurrucarse. Perfecta para la hora de la siesta, para tapar al bebé en el cochecito o simplemente para crear un rincón de paz en casa.",
    tags: ["cobija", "bebé", "apapacho"],
    sizes: ["Única"],
    material: "Doble capa de algodón-bambú con relleno ligero. Transpirable en verano, cálida en invierno.",
    care: ["Lavar a máquina en ciclo delicado", "No usar suavizante de telas", "Secar al aire"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Azul cielo",
  },
  {
    id: "pijama-dulces-suenos",
    slug: "pijama-dulces-suenos",
    name: "Pijama Dulces Sueños",
    price: 520,
    collection: "bebe-cobijo",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Para que cada noche sea de dulces sueños y piel feliz.",
    longDescription: "Nuestra Pijama Dulces Sueños está diseñada pensando en el sueño profundo y reparador de tu bebé. Tela ultra suave que no irrita, costuras planas, elástico amable y un ajuste que permite moverse con libertad. Porque dormir bien empieza con sentirse bien.",
    tags: ["pijama", "bebé", "sueño"],
    sizes: ["6-12M", "12-18M", "18-24M"],
    material: "Algodón orgánico con acabado brushed. Certificado libre de sustancias nocivas.",
    care: ["Lavar con agua fría o tibia", "Detergente suave", "No planchar sobre estampados"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: false,
    colorway: "Lavanda suave",
  },
  {
    id: "set-cobija-gorro",
    slug: "set-cobija-gorro",
    name: "Set Cobija + Gorro",
    price: 890,
    collection: "bebe-cobijo",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "El dúo perfecto para mantener a tu bebé calientito y adorable.",
    longDescription: "Nuestro set combina la cobija más suave con un gorrito a juego. Ideal para fotos de recién nacido, para la salida del hospital o simplemente para esos días frescos en casa. El gorro tiene un ajuste gentil que no aprieta y se mantiene en su lugar.",
    tags: ["set", "cobija", "gorro", "regalo"],
    sizes: ["0-3M", "3-6M"],
    material: "Algodón peinado premium con interior de micro-felpa. Suave por dentro y por fuera.",
    care: ["Lavar a mano o en ciclo delicado", "Secar al aire", "No usar secadora"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Menta pastel",
  },

  // Pijamas Familiares
  {
    id: "pijama-mama-bebe",
    slug: "pijama-mama-bebe",
    name: "Pijama Mamá + Bebé",
    price: 1290,
    collection: "pijamas-familiares",
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
    id: "set-familia-completa",
    slug: "set-familia-completa",
    name: "Set Familia Completa",
    price: 2450,
    collection: "pijamas-familiares",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Toda la familia vestida igual. El apapacho es mejor cuando se comparte.",
    longDescription: "Nuestro set más completo: pijamas iguales para mamá, papá y hasta dos niños o bebés. Cada talla está proporcionada para verse increíble y sentirse cómoda. Un regalo ideal para baby showers, Navidad o cualquier momento que merezca celebrarse en familia.",
    tags: ["familia", "set", "matching", "regalo"],
    sizes: ["Adulto: CH/M/G/XG", "Niño: 2T/4T/6T/8", "Bebé: 0-3M/6-12M/12-18M"],
    material: "Franela de algodón cepillado ultra suave. Doble costura en uniones para mayor durabilidad.",
    care: ["Lavar con agua tibia", "Ciclo suave", "No usar cloro", "Secar a temperatura media"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Cuadros clásicos",
  },
  {
    id: "pijama-papa-oso",
    slug: "pijama-papa-oso",
    name: "Pijama Papá Oso",
    price: 680,
    collection: "pijamas-familiares",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Para papá que también merece suavidad y noches de descanso.",
    longDescription: "La Pijama Papá Oso está diseñada con la comodidad del papá moderno en mente. Corte relajado, tela suave al tacto, y un diseño discreto que combina con los sets familiares. Porque papá también merece sentirse apapacho cada noche.",
    tags: ["pijama", "papá", "adulto"],
    sizes: ["CH", "M", "G", "XG"],
    material: "Jersey de algodón con modal para extra suavidad. Elástico cubierto en cintura.",
    care: ["Lavar con agua tibia", "No usar blanqueador", "Secar al aire o temperatura baja"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: false,
    colorway: "Gris oso",
  },

  // Sacos & Nidos
  {
    id: "saco-dormir-nube",
    slug: "saco-dormir-nube",
    name: "Saco de Dormir Nube",
    price: 950,
    collection: "sacos-nidos",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Dormir en una nube. Seguro, calientito y libre para moverse.",
    longDescription: "El Saco de Dormir Nube reemplaza las cobijas sueltas por una alternativa más segura y acogedora. Tu bebé puede moverse libremente dentro del saco mientras se mantiene abrigado toda la noche. El cierre es bidireccional para facilitar los cambios de pañal sin despertar.",
    tags: ["saco", "dormir", "seguridad"],
    sizes: ["0-6M", "6-18M", "18-36M"],
    material: "Exterior: algodón orgánico. Interior: micro-polar ultra suave. TOG 2.5 ideal para climas templados.",
    care: ["Lavar a máquina en ciclo delicado", "No usar suavizante", "Secar al aire"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: true,
    colorway: "Blanco nube",
  },
  {
    id: "nido-para-bebe",
    slug: "nido-para-bebe",
    name: "Nido para Bebé",
    price: 1180,
    collection: "sacos-nidos",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Un nidito acogedor donde tu bebé se siente seguro y protegido.",
    longDescription: "El Nido para Bebé crea un espacio contenido y acogedor que simula la sensación del vientre materno. Ideal para las primeras semanas, ayuda a que el bebé se sienta seguro y duerma más tranquilo. Los bordes acolchados son suaves y la base es firme pero confortable.",
    tags: ["nido", "bebé", "descanso"],
    sizes: ["0-8M"],
    material: "Algodón premium con relleno de fibra hipoalergénica. Funda removible y lavable.",
    care: ["Retirar la funda para lavar", "Lavar a máquina en frío", "Secar al aire", "No lavar la base con frecuencia"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Producto sin usar, con empaque original.",
    featured: true,
    colorway: "Beige natural",
  },
  {
    id: "saco-transicion",
    slug: "saco-transicion",
    name: "Saco Transición",
    price: 720,
    collection: "sacos-nidos",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Para la etapa donde tu bebé empieza a moverse más y necesita libertad.",
    longDescription: "El Saco Transición está diseñado para bebés que ya empiezan a rodar y moverse más durante el sueño. Con aberturas para los bracitos, tu bebé tiene libertad de movimiento mientras mantiene su cuerpecito abrigado. La transición perfecta del arrullo tradicional.",
    tags: ["saco", "transición", "movilidad"],
    sizes: ["3-9M", "9-18M"],
    material: "Algodón con bambú. Ligero, transpirable y termorregulador.",
    care: ["Lavar con agua tibia", "Ciclo suave", "Secar al aire"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Prenda sin usar, con etiqueta intacta.",
    featured: false,
    colorway: "Salvia suave",
  },

  // Listo para Regalar
  {
    id: "caja-regalo-baby-shower",
    slug: "caja-regalo-baby-shower",
    name: "Caja Regalo Baby Shower",
    price: 1450,
    collection: "regalo",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "El regalo que toda mamá quiere recibir. Suavidad en una caja bonita.",
    longDescription: "Nuestra Caja Regalo Baby Shower es el detalle perfecto para celebrar la llegada de un nuevo bebé. Incluye una selección curada de nuestras piezas más suaves: cobija, mameluco y gorrito, todo envuelto en una caja preciosa con papel de seda y una tarjeta de felicitación. Solo tienes que elegir la talla y nosotros nos encargamos del resto.",
    tags: ["regalo", "baby shower", "caja"],
    sizes: ["0-3M", "3-6M"],
    material: "Mezcla premium de algodón orgánico. Cada pieza seleccionada por su suavidad excepcional.",
    care: ["Ver instrucciones individuales de cada pieza"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Producto sin abrir, con empaque original.",
    featured: true,
    colorway: "Mixto pastel",
  },
  {
    id: "set-primeros-meses",
    slug: "set-primeros-meses",
    name: "Set Primeros Meses",
    price: 980,
    collection: "regalo",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Lo esencial para los primeros meses, con todo el amor de Papachoa.",
    longDescription: "El Set Primeros Meses incluye las piezas básicas que todo recién nacido necesita: un mameluco, una cobijita y un par de calcetines ultra suaves. Todo coordinado y listo para regalo. Es nuestra forma de decir 'bienvenido al mundo' con suavidad y ternura.",
    tags: ["set", "regalo", "primeros meses"],
    sizes: ["0-3M", "3-6M"],
    material: "Algodón peinado con acabado extra suave en todas las piezas.",
    care: ["Lavar con agua tibia en ciclo suave", "Secar al aire"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Producto sin abrir, con empaque original.",
    featured: false,
    colorway: "Blanco y gris",
  },
  {
    id: "canasta-apapacho",
    slug: "canasta-apapacho",
    name: "Canasta Apapacho",
    price: 1650,
    collection: "regalo",
    image: "/placeholder.svg",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    shortDescription: "Una canasta llena de apapacho. El regalo más completo y cariñoso.",
    longDescription: "La Canasta Apapacho es nuestro regalo insignia. Incluye cobija, pijama, saco de dormir y un muñeco de apego, todo en una canasta tejida a mano reutilizable. Cada producto ha sido elegido para crear una experiencia de suavidad total. Es el regalo que dice 'te quiero' en cada pieza.",
    tags: ["canasta", "regalo", "premium", "apapacho"],
    sizes: ["0-6M", "6-12M"],
    material: "Selección premium de algodón orgánico y bambú. Canasta de mimbre natural.",
    care: ["Ver instrucciones individuales de cada pieza", "Canasta: limpiar con paño húmedo"],
    shippingSummary: "Envío a toda la República Mexicana. Entrega estimada: 3 a 7 días hábiles.",
    returnSummary: "30 días para cambios y devoluciones. Producto sin abrir, con empaque original.",
    featured: true,
    colorway: "Natural y blush",
  },
];
