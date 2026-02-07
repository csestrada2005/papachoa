import { Link } from "react-router-dom";
import { Baby, Heart, Users, Moon, Gift } from "lucide-react";

const collections = [
  {
    title: "Recién nacido",
    description: "Suavidad desde el primer día",
    icon: Baby,
    bgColor: "bg-papachoa-blush",
    iconColor: "text-papachoa-blush-dark",
  },
  {
    title: "Bebé & Cobijo",
    description: "Apapacho para los más pequeños",
    icon: Heart,
    bgColor: "bg-papachoa-sky",
    iconColor: "text-secondary-foreground",
  },
  {
    title: "Pijamas Familiares",
    description: "Momentos juntos, vestidos igual",
    icon: Users,
    bgColor: "bg-papachoa-sage",
    iconColor: "text-accent-foreground",
  },
  {
    title: "Sacos & Nidos",
    description: "Sueños seguros y calientitos",
    icon: Moon,
    bgColor: "bg-papachoa-peach",
    iconColor: "text-foreground/80",
  },
  {
    title: "Listo para Regalar",
    description: "El regalo perfecto para dar amor",
    icon: Gift,
    bgColor: "bg-papachoa-blush-mid",
    iconColor: "text-papachoa-warm-brown",
  },
];

const Collections = () => {
  return (
    <section className="py-24 md:py-32 bg-papachoa-cream relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-papachoa-blush/30 blob-shape" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-papachoa-sky/30 blob-shape-2" />

      <div className="container relative">
        <div className="text-center mb-16">
          <span className="inline-block bg-papachoa-sage px-4 py-1.5 rounded-full text-sm font-semibold text-accent-foreground mb-6">
            Explora
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Nuestras <span className="italic">Colecciones</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Encuentra el apapacho perfecto para cada etapa
          </p>
        </div>

        {/* Bento-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              to="/catalogo"
              className={`group relative overflow-hidden rounded-3xl md:rounded-4xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <div className={`${collection.bgColor} h-full p-5 md:p-6 ${index === 0 ? "min-h-[160px] md:min-h-[280px]" : "min-h-[120px] md:min-h-[140px]"} flex flex-col gap-3`}>
                <div className={`${collection.bgColor === "bg-papachoa-blush" ? "bg-card/60" : "bg-card/40"} w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center`}>
                  <collection.icon className={`h-5 w-5 md:h-6 md:w-6 ${collection.iconColor}`} />
                </div>
                
                <div>
                  <h3 className={`font-display ${index === 0 ? "text-xl md:text-2xl" : "text-base md:text-lg"} text-foreground mb-1`}>
                    {collection.title}
                  </h3>
                  <p className={`text-foreground/70 font-light text-xs md:text-sm ${index === 0 ? "" : "hidden md:block"}`}>
                    {collection.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-8 h-8 bg-card/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                  <span className="text-foreground text-sm">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 80L48 74.7C96 69 192 59 288 58.7C384 59 480 69 576 69.3C672 69 768 59 864 53.3C960 48 1056 48 1152 53.3C1248 59 1344 69 1392 74.7L1440 80V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Collections;
