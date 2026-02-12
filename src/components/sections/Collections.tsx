import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";
import { useScrollDisarrange } from "@/hooks/useScrollDisarrange";
import type { Collection } from "@/data/products";

const collections: {
  title: string;
  description: string;
  bgGradient: string;
  slug: Collection;
  rotate: string;
}[] = [
  {
    title: "Recién nacido",
    description: "Suavidad desde el primer día",
    bgGradient: "linear-gradient(145deg, hsl(14 38% 82%) 0%, hsl(14 32% 78%) 100%)",
    slug: "recien-nacido",
    rotate: "-1.2deg",
  },
  {
    title: "Bebé & Cobijo",
    description: "Apapacho para los más pequeños",
    bgGradient: "linear-gradient(145deg, hsl(228 22% 80%) 0%, hsl(228 28% 76%) 100%)",
    slug: "bebe-cobijo",
    rotate: "0.8deg",
  },
  {
    title: "Pijamas Familiares",
    description: "Momentos juntos, vestidos igual",
    bgGradient: "linear-gradient(145deg, hsl(162 16% 78%) 0%, hsl(162 18% 74%) 100%)",
    slug: "pijamas-familiares",
    rotate: "-0.5deg",
  },
  {
    title: "Sacos & Nidos",
    description: "Sueños seguros y calientitos",
    bgGradient: "linear-gradient(145deg, hsl(38 40% 80%) 0%, hsl(35 38% 76%) 100%)",
    slug: "sacos-nidos",
    rotate: "1deg",
  },
  {
    title: "Listo para Regalar",
    description: "El regalo perfecto para dar amor",
    bgGradient: "linear-gradient(145deg, hsl(348 22% 82%) 0%, hsl(348 20% 78%) 100%)",
    slug: "regalo",
    rotate: "-0.7deg",
  },
];

const Collections = () => {
  const parallaxRef = useParallax(0.1);
  const stitchRef = useDrawOnScroll(0.3);
  const disarrangeRef = useScrollDisarrange({ maxRotate: 5, maxTranslate: 18, maxScale: 0.04 });

  return (
    <section className="py-24 md:py-32 section-marigold relative overflow-hidden texture-linen texture-woven">
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute -top-20 -right-20 w-72 h-72 opacity-[0.05] animate-drift"
          style={{
            background: "radial-gradient(circle, hsl(14 52% 46% / 0.3), transparent 70%)",
            borderRadius: "55% 45% 40% 60% / 50% 50% 50% 50%"
          }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 opacity-[0.04] animate-drift-slow"
          style={{
            background: "radial-gradient(circle, hsl(162 22% 42% / 0.3), transparent 70%)",
            borderRadius: "40% 60% 55% 45% / 45% 55% 45% 55%"
          }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-5">
            Explora
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Nuestras <em>Colecciones</em>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Encuentra el apapacho perfecto para cada etapa
          </p>
          <div ref={stitchRef} className="divider-cross-stitch w-16 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto" ref={disarrangeRef}>
          {collections.map((collection, index) => (
            <Link
              key={collection.title}
              to={`/catalogo?categoria=${collection.slug}`}
              aria-label={`Ver colección ${collection.title}`}
              data-disarrange
              className={`group card-tilt relative overflow-hidden transition-all duration-300 active:scale-[0.98] ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{
                transform: `rotate(${collection.rotate})`,
                borderRadius: "4px",
              }}
            >
              <div
                className={`h-full p-6 md:p-7 ${index === 0 ? "min-h-[170px] md:min-h-[280px]" : "min-h-[130px] md:min-h-[150px]"} flex flex-col justify-between relative`}
                style={{ background: collection.bgGradient }}
              >
                <div className="absolute inset-[4px] pointer-events-none" style={{
                  border: "1.5px dashed hsl(20 32% 20% / 0.1)",
                  borderRadius: "2px"
                }} />

                <div>
                  <h3 className={`font-display ${index === 0 ? "text-2xl md:text-3xl" : "text-lg md:text-xl"} text-foreground mb-1.5 leading-tight`}>
                    {collection.title}
                  </h3>
                  <p className={`text-foreground/55 font-light text-sm leading-snug ${index === 0 ? "" : "line-clamp-2"}`}>
                    {collection.description}
                  </p>
                </div>

                <div className="mt-4 flex justify-end">
                  <div className="w-8 h-8 border border-foreground/15 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                    <span className="text-foreground/50 text-sm">&rarr;</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L48 55C96 50 192 42 288 40C384 38 480 42 576 44C672 46 768 46 864 44C960 42 1056 38 1152 40C1248 42 1344 50 1392 55L1440 60V60H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Collections;
