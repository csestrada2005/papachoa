import { Link } from "react-router-dom";
import { Baby, Heart, Users, Moon, Gift } from "lucide-react";
import type { Collection } from "@/data/products";

const collections: {
  title: string;
  description: string;
  icon: typeof Baby;
  emoji: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  slug: Collection;
}[] = [
  {
    title: "Recién nacido",
    description: "Suavidad desde el primer día",
    icon: Baby,
    emoji: "👶",
    bgColor: "bg-papachoa-blush",
    borderColor: "border-papachoa-blush-mid",
    iconColor: "text-papachoa-blush-dark",
    slug: "recien-nacido",
  },
  {
    title: "Bebé & Cobijo",
    description: "Apapacho para los más pequeños",
    icon: Heart,
    emoji: "🧸",
    bgColor: "bg-papachoa-sky",
    borderColor: "border-papachoa-sky-mid",
    iconColor: "text-secondary-foreground",
    slug: "bebe-cobijo",
  },
  {
    title: "Pijamas Familiares",
    description: "Momentos juntos, vestidos igual",
    icon: Users,
    emoji: "👨‍👩‍👧",
    bgColor: "bg-papachoa-sage",
    borderColor: "border-papachoa-sage-mid",
    iconColor: "text-accent-foreground",
    slug: "pijamas-familiares",
  },
  {
    title: "Sacos & Nidos",
    description: "Sueños seguros y calientitos",
    icon: Moon,
    emoji: "🌙",
    bgColor: "bg-papachoa-peach",
    borderColor: "border-papachoa-blush-mid",
    iconColor: "text-foreground/80",
    slug: "sacos-nidos",
  },
  {
    title: "Listo para Regalar",
    description: "El regalo perfecto para dar amor",
    icon: Gift,
    emoji: "🎁",
    bgColor: "bg-papachoa-blush-mid",
    borderColor: "border-papachoa-blush-dark",
    iconColor: "text-papachoa-warm-brown",
    slug: "regalo",
  },
];

const Collections = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(40 55% 94%) 0%, hsl(15 50% 90%) 100%)" }}>
      {/* Playful decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-papachoa-blush/25 blob-shape" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-papachoa-sky/25 blob-shape-2" />
        <span className="absolute top-12 left-16 text-2xl opacity-25 animate-float hidden md:block">⭐</span>
        <span className="absolute bottom-20 right-16 text-2xl opacity-20 animate-wiggle hidden md:block">✨</span>
      </div>

      <div className="container relative">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-papachoa-sage px-5 py-2 rounded-full text-sm font-bold text-accent-foreground mb-6 shadow-sm">
            🛍️ Explora
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Nuestras{" "}
            <span className="italic text-papachoa-blush-dark relative inline-block">
              Colecciones
              <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0 6 Q12 0 25 6 Q37 12 50 6 Q62 0 75 6 Q87 12 100 6" fill="none" stroke="hsl(145 30% 65%)" strokeWidth="2.5" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Encuentra el apapacho perfecto para cada etapa ✨
          </p>
        </div>

        {/* Playful bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              to={`/catalogo?categoria=${collection.slug}`}
              aria-label={`Ver colección ${collection.title}`}
              className={`group relative overflow-hidden rounded-3xl md:rounded-[2rem] transition-all duration-200 hover:scale-[1.03] hover:-rotate-1 active:scale-[0.97] border-2 ${collection.borderColor}/30 shadow-md hover:shadow-xl ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`${collection.bgColor} h-full p-5 md:p-6 ${index === 0 ? "min-h-[170px] md:min-h-[280px]" : "min-h-[130px] md:min-h-[150px]"} flex flex-col gap-3 relative`}>
                {/* Background emoji pattern (subtle) */}
                <div className="absolute inset-0 opacity-[0.07] pointer-events-none flex items-center justify-center overflow-hidden">
                  <span className={`${index === 0 ? "text-[120px] md:text-[180px]" : "text-[80px]"}`}>{collection.emoji}</span>
                </div>

                <div className="relative z-10 flex flex-col h-full gap-3">
                  {/* Emoji icon */}
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-card/60 rounded-2xl flex items-center justify-center shadow-sm backdrop-blur-sm">
                    <span className="text-2xl md:text-3xl">{collection.emoji}</span>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-display ${index === 0 ? "text-xl md:text-2xl" : "text-sm md:text-lg"} text-foreground mb-0.5 md:mb-1 leading-tight`}>
                      {collection.title}
                    </h3>
                    <p className={`text-foreground/60 font-light text-xs md:text-sm leading-snug ${index === 0 ? "" : "line-clamp-2"}`}>
                      {collection.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="mt-auto flex justify-end">
                    <div className="w-9 h-9 bg-card/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 shadow-sm">
                      <span className="text-foreground text-sm font-bold">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Scalloped wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,30 C80,10 160,50 240,30 C320,10 400,50 480,30 C560,10 640,50 720,30 C800,10 880,50 960,30 C1040,10 1120,50 1200,30 C1280,10 1360,50 1440,30 V50 H0 Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Collections;
