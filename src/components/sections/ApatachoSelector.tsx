import { useState } from "react";
import { Link } from "react-router-dom";
import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";
import { products } from "@/data/products";
import type { Collection } from "@/data/products";

interface ApatachoOption {
  id: string;
  emoji: string;
  label: string;
  description: string;
  collections: Exclude<Collection, "todos">[];
  color: string;
}

const options: ApatachoOption[] = [
  {
    id: "calma",
    emoji: "🌙",
    label: "Calma",
    description: "Necesito que mi bebé duerma tranquilo toda la noche",
    collections: ["sacos-nidos", "recien-nacido"],
    color: "hsl(228 28% 58%)",
  },
  {
    id: "ternura",
    emoji: "🤱",
    label: "Ternura",
    description: "Quiero apapachar a mi recién nacido con lo más suave",
    collections: ["recien-nacido", "bebe-cobijo"],
    color: "hsl(14 52% 46%)",
  },
  {
    id: "conexion",
    emoji: "👨‍👩‍👧",
    label: "Conexión",
    description: "Busco momentos especiales en familia, vestidos igual",
    collections: ["pijamas-familiares"],
    color: "hsl(162 22% 42%)",
  },
  {
    id: "regalo",
    emoji: "🎁",
    label: "Regalar amor",
    description: "Quiero dar un regalo que emocione de verdad",
    collections: ["regalo"],
    color: "hsl(38 60% 52%)",
  },
];

const ApatachoSelector = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const parallaxRef = useParallax(0.08);
  const stitchRef = useDrawOnScroll(0.4);

  const activeOption = options.find(o => o.id === selected);
  const recommendedProducts = activeOption
    ? products.filter(p => activeOption.collections.includes(p.collection)).slice(0, 3)
    : [];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden texture-linen texture-woven">
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.04] animate-drift-slow"
          style={{
            background: "radial-gradient(circle, hsl(14 52% 46% / 0.3), transparent 70%)",
            borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%"
          }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-5">
            Experiencia sensorial
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            ¿Qué <em className="text-primary">apapacho</em> necesitas?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Cuéntanos cómo te sientes y te guiaremos al producto perfecto
          </p>
          <div ref={stitchRef} className="divider-cross-stitch w-16 mx-auto mt-8" />
        </div>

        {/* Emotion selector cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {options.map(option => {
            const isActive = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(isActive ? null : option.id)}
                className={`group relative p-6 text-center transition-all duration-300 active:scale-[0.97] ${
                  isActive ? "shadow-lg scale-[1.03]" : "hover:shadow-md hover:scale-[1.01]"
                }`}
                style={{
                  borderRadius: "4px",
                  background: isActive
                    ? `linear-gradient(145deg, ${option.color}22, ${option.color}11)`
                    : "hsl(var(--card) / 0.8)",
                  border: isActive
                    ? `2px solid ${option.color}40`
                    : "1.5px solid hsl(var(--border) / 0.3)",
                }}
              >
                {/* Stitched corners */}
                <div className="absolute inset-[4px] pointer-events-none" style={{
                  border: `1px dashed ${isActive ? option.color + "25" : "hsl(var(--border) / 0.15)"}`,
                  borderRadius: "2px"
                }} />

                <span className="text-4xl block mb-3 transition-transform duration-300 group-hover:scale-110">
                  {option.emoji}
                </span>
                <h3 className="font-display text-xl text-foreground mb-1">
                  {option.label}
                </h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {option.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Recommendations panel */}
        {activeOption && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div
              className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border border-border/30 relative"
              style={{ borderRadius: "4px" }}
            >
              <div className="absolute inset-[5px] pointer-events-none" style={{
                border: `1.5px dashed ${activeOption.color}15`,
                borderRadius: "3px"
              }} />

              <div className="text-center mb-6">
                <p className="font-display text-lg text-foreground">
                  Para ti recomendamos: <em style={{ color: activeOption.color }}>{activeOption.label}</em>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                  <Link
                    key={product.id}
                    to={`/producto/${product.slug}`}
                    className="group p-4 bg-background/50 border border-border/20 hover:border-primary/20 hover:shadow-sm transition-all active:scale-[0.98]"
                    style={{ borderRadius: "3px" }}
                  >
                    <h4 className="font-display text-base text-foreground mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light mb-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <p className="text-sm font-medium text-primary">
                      ${product.price.toLocaleString("es-MX")}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-6">
                <Link
                  to={`/catalogo?categoria=${activeOption.collections[0]}`}
                  className="btn-artisan-outline inline-flex text-sm"
                >
                  Ver todos los productos
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApatachoSelector;
