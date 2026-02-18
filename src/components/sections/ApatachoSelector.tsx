import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import type { Collection } from "@/data/products";
import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";

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
    collections: ["mama-bebe"],
    color: "hsl(216 44% 46%)",
  },
  {
    id: "ternura",
    emoji: "🤱",
    label: "Ternura",
    description: "Quiero apapachar a mi recién nacido con lo más suave",
    collections: ["mama-bebe", "mama-hija"],
    color: "hsl(331 48% 45%)",
  },
  {
    id: "conexion",
    emoji: "👨‍👩‍👧",
    label: "Conexión",
    description: "Busco momentos especiales en familia, vestidos igual",
    collections: ["mama-hija", "papa-hija"],
    color: "hsl(14 100% 71%)",
  },
  {
    id: "regalo",
    emoji: "🎁",
    label: "Regalar amor",
    description: "Quiero dar un regalo que emocione de verdad",
    collections: ["mama-bebe", "papa-hija"],
    color: "hsl(47 90% 50%)",
  },
];

const ApatachoSelector = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const activeOption = options.find(o => o.id === selected);
  const recommendedProducts = activeOption
    ? products.filter(p => activeOption.collections.includes(p.collection)).slice(0, 3)
    : [];

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Decorative bird */}
      <img
        src={pajaroNaranja}
        alt=""
        aria-hidden="true"
        className="absolute bottom-12 left-8 w-16 md:w-24 opacity-[0.08] animate-drift-slow pointer-events-none"
        loading="lazy"
      />

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <p className="font-display text-2xl md:text-3xl text-primary mb-3">
            Experiencia sensorial
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            ¿Qué apapacho necesitas?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Cuéntanos cómo te sientes y te guiaremos al producto perfecto
          </p>
        </div>

        {/* Emotion selector cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          {options.map(option => {
            const isActive = selected === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelected(isActive ? null : option.id)}
                className={`group relative p-6 text-center transition-all duration-300 rounded-2xl active:scale-[0.97] ${
                  isActive ? "shadow-lg scale-[1.03]" : "hover:shadow-md hover:scale-[1.01]"
                }`}
                style={{
                  background: isActive
                    ? `linear-gradient(145deg, ${option.color}22, ${option.color}11)`
                    : "hsl(var(--card))",
                  border: isActive
                    ? `2px solid ${option.color}40`
                    : "1.5px solid hsl(var(--border) / 0.3)",
                }}
              >
                <span className="text-4xl block mb-3 transition-transform duration-300 group-hover:scale-110">
                  {option.emoji}
                </span>
                <h3 className="text-lg font-bold text-foreground mb-1">{option.label}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">{option.description}</p>
              </button>
            );
          })}
        </div>

        {/* Recommendations panel */}
        {activeOption && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <div className="p-6 md:p-8 bg-card rounded-2xl border border-border/30">
              <div className="text-center mb-6">
                <p className="text-lg text-foreground">
                  Para ti recomendamos:{" "}
                  <span className="font-display text-2xl" style={{ color: activeOption.color }}>
                    {activeOption.label}
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedProducts.map(product => (
                  <Link
                    key={product.id}
                    to={`/producto/${product.slug}`}
                    className="group p-4 bg-background/50 rounded-xl border border-border/20 hover:border-primary/20 hover:shadow-sm transition-all active:scale-[0.98]"
                  >
                    <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-light mb-2 line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <p className="text-sm font-bold text-primary">
                      ${product.price.toLocaleString("es-MX")}
                    </p>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-6">
                <Link to={`/catalogo?categoria=${activeOption.collections[0]}`} className="btn-artisan-outline inline-flex text-sm">
                  Ver todos los productos <span>→</span>
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