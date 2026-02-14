import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Collection } from "@/data/products";
import { products } from "@/data/products";

const collections: {
  title: string;
  description: string;
  bgGradient: string;
  slug: Collection;
  icon: string;
  showAll?: boolean;
  featuredProductId?: string;
}[] = [
  {
    title: "Toda la colección",
    description: "Pijamas diseñadas para compartir",
    bgGradient: "linear-gradient(145deg, hsl(35 40% 84%) 0%, hsl(35 36% 80%) 100%)",
    slug: "todos",
    icon: "🤍",
    showAll: true,
  },
  {
    title: "Mamá & Hijos",
    description: "Suavidad desde el primer abrazo",
    bgGradient: "linear-gradient(145deg, hsl(14 38% 82%) 0%, hsl(14 32% 78%) 100%)",
    slug: "mama-bebe",
    icon: "🌸",
    featuredProductId: "pijama-mama-bebe",
  },
  {
    title: "Mamá & Hija",
    description: "Momentos iguales, recuerdos eternos",
    bgGradient: "linear-gradient(145deg, hsl(228 22% 80%) 0%, hsl(228 28% 76%) 100%)",
    slug: "mama-hija",
    icon: "✨",
    featuredProductId: "pijama-doodle-mama-bebe",
  },
  {
    title: "Papá & Hija",
    description: "Complicidad en cada detalle",
    bgGradient: "linear-gradient(145deg, hsl(162 16% 78%) 0%, hsl(162 18% 74%) 100%)",
    slug: "papa-hija",
    icon: "🦕",
    featuredProductId: "pijama-dinosaurio-papa-nina",
  },
  {
    title: "Matching",
    description: "Diseñados para verse juntos",
    bgGradient: "linear-gradient(145deg, hsl(38 40% 80%) 0%, hsl(35 38% 76%) 100%)",
    slug: "matching",
    icon: "👨‍👩‍👧",
    showAll: true,
  },
];

const realProducts = products.filter((p) => p.image !== "/placeholder.svg");

const Collections = () => {
  const parallaxRef = useParallax(0.1);
  const stitchRef = useDrawOnScroll(0.3);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const scrollStartX = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.children[0]?.clientWidth || 300;
      const gap = 20;
      const idx = Math.round(el.scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(idx, collections.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.children[0]?.clientWidth || 300;
    const gap = 20;
    el.scrollBy({ left: dir === "next" ? cardWidth + gap : -(cardWidth + gap), behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    scrollStartX.current = scrollRef.current?.scrollLeft || 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.clientX - dragStartX.current;
    scrollRef.current.scrollLeft = scrollStartX.current - dx;
  };
  const onPointerUp = () => setIsDragging(false);

  const getCardProducts = (col: typeof collections[number]) => {
    if (col.showAll) return realProducts;
    if (col.featuredProductId) {
      const p = products.find((pr) => pr.id === col.featuredProductId);
      return p ? [p] : [];
    }
    return realProducts.filter((p) => p.collection === col.slug);
  };

  return (
    <section className="py-24 md:py-32 section-marigold relative overflow-hidden texture-linen texture-woven">
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute -top-20 -right-20 w-72 h-72 opacity-[0.05] animate-drift"
          style={{
            background: "radial-gradient(circle, hsl(14 52% 46% / 0.3), transparent 70%)",
            borderRadius: "55% 45% 40% 60% / 50% 50% 50% 50%"
          }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-5">
            Explora
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Nuestras <em>Colecciones</em>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Encuentra el apapacho perfecto para cada vínculo
          </p>
          <div ref={stitchRef} className="divider-cross-stitch w-16 mx-auto mt-8" />
        </div>

        <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto px-2">
          <div className="flex gap-2">
            <button
              onClick={() => scrollTo("prev")}
              className="w-10 h-10 flex items-center justify-center border border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card transition-all active:scale-95"
              style={{ borderRadius: "3px" }}
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 text-foreground/60" />
            </button>
            <button
              onClick={() => scrollTo("next")}
              className="w-10 h-10 flex items-center justify-center border border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card transition-all active:scale-95"
              style={{ borderRadius: "3px" }}
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4 text-foreground/60" />
            </button>
          </div>
          <p className="font-body text-sm text-muted-foreground tracking-wide">
            <span className="text-foreground font-medium">{activeIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{collections.length} colecciones</span>
          </p>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 cursor-grab active:cursor-grabbing select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {collections.map((collection) => {
            const cardProducts = getCardProducts(collection);
            const featured = cardProducts[0];
            const productCount = collection.showAll ? realProducts.length : cardProducts.length;

            return (
              <Link
                key={collection.slug}
                to={collection.slug === "todos" ? "/catalogo" : `/catalogo?categoria=${collection.slug}`}
                aria-label={`Ver colección ${collection.title}`}
                className="group flex-none w-[280px] md:w-[320px] snap-start"
                onClick={e => isDragging && e.preventDefault()}
                draggable={false}
              >
                <div
                  className="h-full relative overflow-hidden transition-all duration-300 hover:shadow-lg active:scale-[0.98]"
                  style={{ borderRadius: "4px" }}
                >
                  <div
                    className="p-6 pb-5 min-h-[320px] md:min-h-[360px] flex flex-col justify-between relative"
                    style={{ background: collection.bgGradient }}
                  >
                    <div className="absolute inset-[4px] pointer-events-none" style={{
                      border: "1.5px dashed hsl(20 32% 20% / 0.1)",
                      borderRadius: "2px"
                    }} />

                    <div>
                      <span className="text-3xl mb-3 block">{collection.icon}</span>
                      <h3 className="font-display text-2xl text-foreground mb-1.5 leading-tight">
                        {collection.title}
                      </h3>
                      <p className="text-foreground/55 font-light text-sm leading-snug line-clamp-2">
                        {collection.description}
                      </p>
                    </div>

                    {featured && (
                      <div className="mt-4 bg-background/40 backdrop-blur-sm p-3 border border-border/20 flex items-center gap-3 transition-all group-hover:bg-background/60" style={{ borderRadius: "3px" }}>
                        <div className="w-10 h-10 bg-background/60 flex items-center justify-center flex-shrink-0 overflow-hidden" style={{ borderRadius: "2px" }}>
                          {featured.image !== "/placeholder.svg" ? (
                            <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-primary font-display">★</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">{featured.name}</p>
                          <p className="text-xs text-foreground/50">${featured.price.toLocaleString("es-MX")}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-foreground/40 font-body tracking-wide">
                        {productCount} {productCount === 1 ? "producto" : "productos"}
                      </span>
                      <div className="w-8 h-8 border border-foreground/15 rounded-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <span className="text-foreground/50 text-sm">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {collections.map((_, i) => (
            <button
              key={i}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === activeIndex ? "hsl(14 52% 46%)" : "hsl(14 52% 46% / 0.2)",
                transform: i === activeIndex ? "scale(1.3)" : "scale(1)",
              }}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.children[0]?.clientWidth || 300;
                el.scrollTo({ left: i * (cardWidth + 20), behavior: "smooth" });
              }}
              aria-label={`Ir a colección ${i + 1}`}
            />
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
