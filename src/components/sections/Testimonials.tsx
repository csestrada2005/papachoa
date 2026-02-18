import { useState, useEffect, useCallback, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import printPuntosAzul from "@/assets/brand/print-puntos-azul.png";
import pajaroAmarillo from "@/assets/brand/pajaro-amarillo.png";

const testimonials = [
  { name: "Fernanda C.", text: "La calidad es increíble. Mis hijos no quieren quitarse las pijamas y el cobijo es lo más suave que hemos tenido en casa.", rating: 5, product: "Set Familia Completa", category: "Familias" },
  { name: "Ofe S.", text: "Compré para regalar y ahora toda la familia tiene Papachoa. Los pijamas familiares son un hit en Navidad.", rating: 5, product: "Caja Regalo Baby Shower", category: "Regalos" },
  { name: "María Elena M.", text: "El saco de dormir fue lo mejor que compré para mi bebé. Duerme toda la noche y yo también.", rating: 5, product: "Saco de Dormir Nube", category: "Bebés" },
  { name: "Lucía R.", text: "Nunca había sentido una tela tan suave para bebé. Mi pequeña duerme toda la noche desde que usamos Papachoa.", rating: 5, product: "Cobija Primera Siesta", category: "Bebés" },
  { name: "Andrea G.", text: "Las pijamas matching con mi esposo e hijos son nuestra tradición navideña. La calidad es impresionante.", rating: 5, product: "Pijama Mamá & Hijos", category: "Familias" },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const goTo = useCallback((idx: number) => {
    setCurrent(((idx % testimonials.length) + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    intervalRef.current = setInterval(() => goTo(current + 1), 5000);
    return () => clearInterval(intervalRef.current);
  }, [current, isPaused, goTo]);

  const testimonial = testimonials[current];

  return (
    <section className="py-24 md:py-36 relative overflow-hidden" style={{ background: "hsl(47 70% 96%)" }}>
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url(${printPuntosAzul})`, backgroundSize: "300px", backgroundRepeat: "repeat" }}
      />

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <p className="font-display text-2xl md:text-3xl text-primary mb-3">Lo que dicen las mamás</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Lo que dicen las mamás de Papachoa…
          </h2>

          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {["F", "O", "M", "L"].map((initial, i) => (
                <div
                  key={i}
                  className="w-7 h-7 flex items-center justify-center text-xs font-bold border-2 border-white rounded-full"
                  style={{
                    background: [
                      "hsl(var(--papachoa-coral))",
                      "hsl(var(--papachoa-yellow))",
                      "hsl(var(--papachoa-blue))",
                      "hsl(var(--papachoa-magenta))"
                    ][i],
                    color: "white",
                  }}
                >
                  {initial}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-light">
              <span className="font-bold text-foreground">1,200+</span> mamás confían en Papachoa
            </p>
          </div>
        </div>

        {/* Testimonial card as speech bubble */}
        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 md:p-10 relative shadow-sm border border-border/20 transition-all duration-500"
            key={current}
          >
            {/* Speech tail */}
            <div className="absolute -bottom-3 left-12 w-6 h-6 bg-white border-b border-r border-border/20 rotate-45" />

            <div className="flex gap-0.5 mb-5">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <blockquote className="text-foreground/80 leading-relaxed mb-6 text-lg md:text-xl font-light italic animate-fade-in">
              &ldquo;{testimonial.text}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: "hsl(var(--primary))" }}>
                  {testimonial.name[0]}
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">Compró: {testimonial.product}</p>
                </div>
              </div>

              {testimonials.length > 1 && (
                <div className="flex gap-2">
                  <button onClick={() => goTo(current - 1)} className="w-9 h-9 flex items-center justify-center rounded-full border border-border/40 bg-white hover:bg-background transition-all active:scale-95" aria-label="Anterior testimonio">
                    <ChevronLeft className="w-4 h-4 text-foreground/50" />
                  </button>
                  <button onClick={() => goTo(current + 1)} className="w-9 h-9 flex items-center justify-center rounded-full border border-border/40 bg-white hover:bg-background transition-all active:scale-95" aria-label="Siguiente testimonio">
                    <ChevronRight className="w-4 h-4 text-foreground/50" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Avatar + bird below speech bubble */}
          <div className="ml-14 mt-4 flex items-center gap-2">
            <img src={pajaroAmarillo} alt="" aria-hidden="true" className="w-5 h-5 opacity-50" loading="lazy" />
            <span className="text-xs text-muted-foreground">{testimonial.category}</span>
          </div>

          {/* Dots */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === current ? "24px" : "8px",
                    background: i === current ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.2)",
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