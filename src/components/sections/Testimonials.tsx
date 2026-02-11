import { Star } from "lucide-react";
import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";

const testimonials = [
  {
    name: "Fernanda C.",
    text: "La calidad es increíble. Mis hijos no quieren quitarse las pijamas y el cobijo es lo más suave que hemos tenido en casa.",
    rating: 5,
  },
  {
    name: "Ofe S.",
    text: "Compré para regalar y ahora toda la familia tiene Papachoa. Los pijamas familiares son un hit en Navidad.",
    rating: 5,
  },
  {
    name: "María Elena M.",
    text: "El saco de dormir fue lo mejor que compré para mi bebé. Duerme toda la noche y yo también.",
    rating: 5,
  },
];

const Testimonials = () => {
  const parallaxRef = useParallax(0.08);
  const stitchRef = useDrawOnScroll(0.3);

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
        <div className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-5">
            Lo que dicen las mamás
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Historias de <em>apapacho</em>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg font-light">
            Familias reales que ya viven la suavidad
          </p>
          <div ref={stitchRef} className="divider-cross-stitch w-16 mx-auto mt-8" />
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto items-stretch">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className="bg-card/80 backdrop-blur-sm p-8 relative overflow-hidden border border-border/30 flex flex-col min-h-[280px] hover:shadow-md transition-all card-tilt"
              style={{
                borderRadius: "3px",
                transform: `rotate(${i === 0 ? "-0.8" : i === 1 ? "0.5" : "-0.3"}deg)`,
              }}
            >
              <div className="absolute inset-[5px] pointer-events-none" style={{
                border: "1.5px dashed hsl(14 52% 46% / 0.08)",
                borderRadius: "2px"
              }} />

              <div className="font-display text-7xl text-primary/8 leading-none select-none absolute top-3 right-5">&ldquo;</div>

              <div className="flex gap-0.5 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-papachoa-marigold text-papachoa-marigold"
                  />
                ))}
              </div>

              <blockquote className="text-foreground/75 font-light leading-relaxed mb-8 text-base flex-1 italic font-display text-lg">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 mt-auto pt-4" style={{ borderTop: "1px dashed hsl(var(--border) / 0.4)" }}>
                <div className="w-8 h-8 bg-papachoa-terracotta-light/25 flex items-center justify-center font-display text-sm text-primary" style={{ borderRadius: "2px" }}>
                  {testimonial.name[0]}
                </div>
                <p className="font-display text-base text-foreground">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
