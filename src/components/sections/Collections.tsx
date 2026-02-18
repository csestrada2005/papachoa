import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Collection } from "@/data/products";
import { products } from "@/data/products";
import printPuntosCoral from "@/assets/brand/print-puntos-coral.png";
import printPuntosAzul from "@/assets/brand/print-puntos-azul.png";
import printPuntosMagenta from "@/assets/brand/print-puntos-magenta.png";
import printPajaritos from "@/assets/brand/print-pajaritos.png";
import printPapachoa from "@/assets/brand/print-papachoa.png";

const collections: {
  title: string;
  description: string;
  slug: Collection;
  pattern: string;
  showAll?: boolean;
  featuredProductId?: string;
}[] = [
  {
    title: "Toda la colección",
    description: "Pijamas diseñadas para compartir",
    slug: "todos",
    pattern: printPajaritos,
    showAll: true,
  },
  {
    title: "Mamá & Hijos",
    description: "Suavidad desde el primer abrazo",
    slug: "mama-bebe",
    pattern: printPuntosCoral,
    featuredProductId: "pijama-mama-bebe",
  },
  {
    title: "Mamá & Hija",
    description: "Momentos iguales, recuerdos eternos",
    slug: "mama-hija",
    pattern: printPuntosAzul,
    featuredProductId: "pijama-doodle-mama-bebe",
  },
  {
    title: "Papá & Hija",
    description: "Complicidad en cada detalle",
    slug: "papa-hija",
    pattern: printPuntosMagenta,
    featuredProductId: "pijama-dinosaurio-papa-nina",
  },
  {
    title: "Matching",
    description: "Diseñados para verse juntos",
    slug: "matching",
    pattern: printPapachoa,
    showAll: true,
  },
];

const realProducts = products.filter((p) => p.image !== "/placeholder.svg");

const Collections = () => {
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
    scrollRef.current.scrollLeft = scrollStartX.current - (e.clientX - dragStartX.current);
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
    <section className="py-24 md:py-36 relative overflow-hidden" style={{ background: "hsl(47 70% 96%)" }}>
      <div className="container relative z-10">
        <div className="text-center mb-14">
          <p className="font-display text-2xl md:text-3xl text-primary mb-3">Explora</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nuestras Colecciones
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Descubre nuestra colección: suaves, cálidos y con magia de hogar
          </p>
        </div>

        <div className="flex items-center justify-between mb-6 max-w-5xl mx-auto px-2">
          <div className="flex gap-2">
            <button onClick={() => scrollTo("prev")} className="w-10 h-10 flex items-center justify-center rounded-full border border-border/40 bg-white/80 hover:bg-white transition-all active:scale-95" aria-label="Anterior">
              <ChevronLeft className="w-4 h-4 text-foreground/60" />
            </button>
            <button onClick={() => scrollTo("next")} className="w-10 h-10 flex items-center justify-center rounded-full border border-border/40 bg-white/80 hover:bg-white transition-all active:scale-95" aria-label="Siguiente">
              <ChevronRight className="w-4 h-4 text-foreground/60" />
            </button>
          </div>
          <p className="font-body text-sm text-muted-foreground">
            <span className="text-foreground font-bold">{activeIndex + 1}</span>
            <span className="mx-1">/</span>
            <span>{collections.length}</span>
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
                <div className="h-full relative overflow-hidden rounded-2xl card-lift">
                  <div
                    className="p-6 pb-5 min-h-[320px] md:min-h-[360px] flex flex-col justify-between relative"
                    style={{ background: "hsl(var(--card))" }}
                  >
                    {/* Subtle pattern overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.06] pointer-events-none"
                      style={{
                        backgroundImage: `url(${collection.pattern})`,
                        backgroundSize: "200px",
                        backgroundRepeat: "repeat",
                      }}
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-foreground mb-1.5 leading-tight">
                        {collection.title}
                      </h3>
                      <p className="text-foreground/55 font-light text-sm leading-snug line-clamp-2">
                        {collection.description}
                      </p>
                    </div>

                    {featured && (
                      <div className="mt-4 bg-background/60 backdrop-blur-sm p-3 rounded-xl border border-border/20 flex items-center gap-3 transition-all group-hover:bg-background/80 relative z-10">
                        <div className="w-10 h-10 bg-background/60 flex items-center justify-center flex-shrink-0 overflow-hidden rounded-lg">
                          {featured.image !== "/placeholder.svg" ? (
                            <img src={featured.image} alt={featured.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <span className="text-xs text-primary font-display">★</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-foreground truncate">{featured.name}</p>
                          <p className="text-xs text-foreground/50">${featured.price.toLocaleString("es-MX")}</p>
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between relative z-10">
                      <span className="text-xs text-foreground/40 tracking-wide">
                        {productCount} {productCount === 1 ? "producto" : "productos"}
                      </span>
                      <div className="w-8 h-8 border border-primary/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                        <span className="text-primary text-sm">→</span>
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
                background: i === activeIndex ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)",
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
    </section>
  );
};

export default Collections;