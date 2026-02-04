import lifestyleImage from "@/assets/lifestyle-2.png";
import { Sparkles, Heart, Moon } from "lucide-react";

const qualities = [
  {
    icon: Sparkles,
    title: "Ultra suave",
    description: "Telas seleccionadas que acarician la piel desde el primer contacto",
    color: "bg-papachoa-blush",
  },
  {
    icon: Heart,
    title: "Se siente rico al instante",
    description: "Sin rigidez, sin espera. Suave desde que lo abres",
    color: "bg-papachoa-sky",
  },
  {
    icon: Moon,
    title: "Pensado para dormir mejor",
    description: "Diseños que abrazan sin apretar, para noches tranquilas",
    color: "bg-papachoa-sage",
  },
];

const Softness = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-40 left-0 w-40 h-40 bg-papachoa-peach/30 blob-shape-2" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block bg-papachoa-blush px-4 py-1.5 rounded-full text-sm font-semibold text-foreground/80 mb-8">
              La prueba de suavidad
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-12">
              Suavidad que
              <br />
              <span className="italic text-papachoa-blush-dark">se siente</span>
            </h2>

            <div className="space-y-6">
              {qualities.map((quality) => (
                <div
                  key={quality.title}
                  className="flex gap-5 p-5 bg-card rounded-3xl border border-border/50 hover:shadow-lg transition-shadow"
                >
                  <div className={`${quality.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0`}>
                    <quality.icon className="h-6 w-6 text-foreground/80" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-1">
                      {quality.title}
                    </h3>
                    <p className="text-muted-foreground font-light text-sm leading-relaxed">
                      {quality.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none">
              {/* Background blob */}
              <div className="absolute inset-0 bg-papachoa-blush blob-shape scale-110 -z-10" />
              
              {/* Image with rounded corners */}
              <div className="blob-shape overflow-hidden">
                <img
                  src={lifestyleImage}
                  alt="Textura suave de tela Papachoa"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 right-4 md:bottom-10 md:-right-6 bg-card rounded-2xl shadow-xl p-4 animate-float" style={{ animationDelay: "0.5s" }}>
                <p className="font-display text-lg text-foreground">
                  Tan suave como un <span className="italic text-papachoa-blush-dark">abrazo</span> 🤍
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Softness;
