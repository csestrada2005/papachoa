import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Fernanda C.",
    text: "La calidad es increíble. Mis hijos no quieren quitarse las pijamas y el cobijo es lo más suave que hemos tenido en casa.",
    rating: 5,
    color: "bg-papachoa-blush",
  },
  {
    name: "Ofe S.",
    text: "Compré para regalar y ahora toda la familia tiene Papachoa. Los pijamas familiares son un hit en Navidad.",
    rating: 5,
    color: "bg-papachoa-sky",
  },
  {
    name: "María Elena M.",
    text: "El saco de dormir fue lo mejor que compré para mi bebé. Duerme toda la noche y yo también.",
    rating: 5,
    color: "bg-papachoa-sage",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 bg-papachoa-cream relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-papachoa-peach/40 blob-shape" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-papachoa-sky/30 blob-shape-2" />

      <div className="container relative">
        <div className="text-center mb-16">
          <span className="inline-block bg-papachoa-blush-mid px-4 py-1.5 rounded-full text-sm font-semibold text-foreground/80 mb-6">
            💬 Lo que dicen las mamás
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Historias de <span className="italic">apapacho</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            Familias reales que ya viven la suavidad
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`${testimonial.color}/60 rounded-3xl md:rounded-4xl p-8 relative overflow-hidden`}
              style={{ 
                transform: index === 1 ? "translateY(-20px)" : "translateY(0)",
              }}
            >
              {/* Background pattern */}
              <div className="absolute top-4 right-4 text-6xl opacity-10">❛❛</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-papachoa-warm-brown text-papachoa-warm-brown"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground font-light leading-relaxed mb-8 text-lg">
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center font-display text-lg text-foreground">
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
