import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";

const testimonials = [
  {
    name: "Fernanda C.",
    text: "La calidad es increíble. Mis hijos no quieren quitarse las pijamas y el cobijo es lo más suave que hemos tenido en casa.",
    rating: 5,
    product: "Set Familia Completa",
    category: "Familias",
  },
  {
    name: "Ofe S.",
    text: "Compré para regalar y ahora toda la familia tiene Papachoa. Los pijamas familiares son un hit en Navidad.",
    rating: 5,
    product: "Caja Regalo Baby Shower",
    category: "Regalos",
  },
  {
    name: "María Elena M.",
    text: "El saco de dormir fue lo mejor que compré para mi bebé. Duerme toda la noche y yo también.",
    rating: 5,
    product: "Saco de Dormir Nube",
    category: "Bebés",
  },
  {
    name: "Lucía R.",
    text: "Nunca había sentido una tela tan suave para bebé. Mi pequeña duerme toda la noche desde que usamos Papachoa.",
    rating: 5,
    product: "Cobija Primera Siesta",
    category: "Bebés",
  },
  {
    name: "Andrea G.",
    text: "Las pijamas matching con mi esposo e hijos son nuestra tradición navideña. La calidad es impresionante.",
    rating: 5,
    product: "Pijama Mamá + Bebé",
    category: "Familias",
  },
];

const categories = ["Todos", "Bebés", "Familias", "Regalos"];

const Testimonials = () => {
  const parallaxRef = useParallax(0.08);
  const stitchRef = useDrawOnScroll(0.3);
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const filtered = activeFilter === "Todos"
    ? testimonials
    : testimonials.filter(t => t.category === activeFilter);

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % filtered.length) + filtered.length) % filtered.length);
  }, [filtered.length]);

  // Autoplay
  useEffect(() => {
    if (isPaused || filtered.length <= 1) return;
    intervalRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(intervalRef.current);
  }, [current, isPaused, goTo, filtered.length]);

  // Reset index when filter changes
  useEffect(() => { setCurrent(0); }, [activeFilter]);

  const testimonial = filtered[current];
  if (!testimonial) return null;

  return (
    <section className="py-24 md:py-32 section-marigold relative overflow-hidden texture-linen texture-woven">
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute top-20 -right-16 w-48 h-48 opacity-[0.05] animate-drift"
          style={{
            background: "radial-gradient(circle, hsl(14 52% 46% / 0.3), transparent 70%)",
            borderRadius: "55% 45% 50% 50% / 45% 55% 45% 55%"
          }} />
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-10">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-5">
            Lo que dicen las mamás
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Historias de <em>apapacho</em>
          </h2>

          {/* Social proof counter */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {["F", "O", "M", "L"].map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 flex items-center justify-center text-xs font-display border-2 border-card"
                  style={{
                    borderRadius: "50%",
                    background: `hsl(${[14,38,162,348][i]} ${[38,45,18,22][i]}% ${[74,80,74,82][i]}%)`,
                    color: "hsl(20 32% 20%)",
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-light">
              <span className="font-medium text-foreground">1,200+</span> mamás confían en Papachoa
            </p>
          </div>

          <div ref={stitchRef} className="divider-cross-stitch w-16 mx-auto mt-4" />
        </div>

        {/* Category filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 text-xs font-body tracking-wide transition-all duration-200 active:scale-95 ${
                activeFilter === cat
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "bg-card/60 text-muted-foreground border-border/30 hover:border-primary/20"
              }`}
              style={{ borderRadius: "3px", border: "1.5px solid" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main testimonial card */}
        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="bg-card/80 backdrop-blur-sm p-8 md:p-10 relative overflow-hidden border border-border/30 transition-all duration-500"
            style={{ borderRadius: "4px" }}
            key={`${activeFilter}-${current}`}
          >
            {/* Stitched inner frame */}
            <div className="absolute inset-[5px] pointer-events-none" style={{
              border: "1.5px dashed hsl(14 52% 46% / 0.08)",
              borderRadius: "2px"
            }} />

            <div className="font-display text-7xl text-primary/8 leading-none select-none absolute top-3 right-5">&ldquo;</div>

            <div className="flex gap-0.5 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-papachoa-marigold text-papachoa-marigold animate-fade-in" style={{ animationDelay: `${i * 80}ms` }} />
              ))}
            </div>

            <blockquote className="text-foreground/80 leading-relaxed mb-8 font-display text-xl md:text-2xl italic animate-fade-in">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            {/* Product tag */}
            <div className="mb-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/5 border border-primary/15 text-xs text-primary font-medium" style={{ borderRadius: "2px" }}>
                <Star className="w-3 h-3 fill-primary/30" />
                Compró: {testimonial.product}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3" style={{ borderTop: "1px dashed hsl(var(--border) / 0.4)", paddingTop: "1rem" }}>
                <div className="w-10 h-10 bg-papachoa-terracotta-light/25 flex items-center justify-center font-display text-base text-primary" style={{ borderRadius: "50%" }}>
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-display text-base text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.category}</p>
                </div>
              </div>

              {/* Nav arrows */}
              {filtered.length > 1 && (
                <div className="flex gap-2">
                  <button
                    onClick={() => goTo(current - 1)}
                    className="w-9 h-9 flex items-center justify-center border border-border/40 bg-card/60 hover:bg-card transition-all active:scale-95"
                    style={{ borderRadius: "3px" }}
                    aria-label="Anterior testimonio"
                  >
                    <ChevronLeft className="w-4 h-4 text-foreground/50" />
                  </button>
                  <button
                    onClick={() => goTo(current + 1)}
                    className="w-9 h-9 flex items-center justify-center border border-border/40 bg-card/60 hover:bg-card transition-all active:scale-95"
                    style={{ borderRadius: "3px" }}
                    aria-label="Siguiente testimonio"
                  >
                    <ChevronRight className="w-4 h-4 text-foreground/50" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Progress dots */}
          {filtered.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === current ? "24px" : "8px",
                    background: i === current ? "hsl(14 52% 46%)" : "hsl(14 52% 46% / 0.2)",
                  }}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
