import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Fernanda C.",
    text: "La calidad es increíble. Mis hijos no quieren quitarse las pijamas y el cobijo es lo más suave que hemos tenido en casa.",
    rating: 5,
    emoji: "🥰",
    accent: "border-papachoa-blush-mid/50",
    bg: "bg-papachoa-blush/10",
  },
  {
    name: "Ofe S.",
    text: "Compré para regalar y ahora toda la familia tiene Papachoa. Los pijamas familiares son un hit en Navidad.",
    rating: 5,
    emoji: "🎄",
    accent: "border-papachoa-sky-mid/50",
    bg: "bg-papachoa-sky/10",
  },
  {
    name: "María Elena M.",
    text: "El saco de dormir fue lo mejor que compré para mi bebé. Duerme toda la noche y yo también.",
    rating: 5,
    emoji: "😴",
    accent: "border-papachoa-sage-mid/50",
    bg: "bg-papachoa-sage/10",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(40 55% 94%) 0%, hsl(195 50% 92%) 100%)" }}>
      {/* Doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-8 left-10 w-32 h-32 bg-papachoa-peach/30 blob-shape" />
        <div className="absolute top-12 right-10 w-28 h-28 bg-papachoa-sky/25 blob-shape-2" />
        <span className="absolute top-8 left-16 text-2xl opacity-25 animate-float hidden md:block">💬</span>
        <span className="absolute bottom-16 right-20 text-2xl opacity-20 animate-wiggle hidden md:block">⭐</span>
      </div>

      <div className="container relative z-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 bg-papachoa-blush-mid px-5 py-2 rounded-full text-sm font-bold text-foreground/80 mb-6 shadow-sm">
            💬 Lo que dicen las mamás
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Historias de{" "}
            <span className="italic text-papachoa-blush-dark relative inline-block">
              apapacho
              <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0 6 Q12 0 25 6 Q37 12 50 6 Q62 0 75 6 Q87 12 100 6" fill="none" stroke="hsl(15 40% 60%)" strokeWidth="2.5" />
              </svg>
            </span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Familias reales que ya viven la suavidad ✨
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto items-stretch">
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.name}
              className={`${testimonial.bg} bg-card rounded-3xl md:rounded-[2rem] p-7 relative overflow-hidden shadow-md border-2 ${testimonial.accent} flex flex-col min-h-[280px] hover:-translate-y-1 hover:shadow-xl transition-all duration-200`}
              style={{ transform: i === 1 ? "rotate(-1deg)" : i === 2 ? "rotate(1deg)" : undefined }}
            >
              {/* Fun emoji badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-card/80 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xl">{testimonial.emoji}</span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-papachoa-warm-brown text-papachoa-warm-brown"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground font-light leading-relaxed mb-8 text-lg flex-1 line-clamp-4">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 bg-papachoa-blush rounded-full flex items-center justify-center font-display text-lg text-foreground shadow-sm">
                  {testimonial.name[0]}
                </div>
                <p className="font-display text-lg text-foreground">
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
