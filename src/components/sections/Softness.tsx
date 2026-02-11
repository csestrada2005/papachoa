import lifestyleImage from "@/assets/lifestyle-2.png";

const qualities = [
  {
    emoji: "✨",
    title: "Ultra suave",
    description: "Telas seleccionadas que acarician la piel desde el primer contacto",
    color: "bg-papachoa-blush",
    borderColor: "border-papachoa-blush-mid/40",
  },
  {
    emoji: "💛",
    title: "Se siente rico al instante",
    description: "Sin rigidez, sin espera. Suave desde que lo abres",
    color: "bg-papachoa-sky",
    borderColor: "border-papachoa-sky-mid/40",
  },
  {
    emoji: "🌙",
    title: "Pensado para dormir mejor",
    description: "Diseños que abrazan sin apretar, para noches tranquilas",
    color: "bg-papachoa-sage",
    borderColor: "border-papachoa-sage-mid/40",
  },
];

const Softness = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 left-0 w-40 h-40 bg-papachoa-peach/30 blob-shape-2" />
        <span className="absolute top-20 right-12 text-2xl opacity-25 animate-wiggle hidden md:block">⭐</span>
        <svg className="absolute bottom-16 left-8 w-20 h-6 opacity-15 hidden md:block" viewBox="0 0 80 12">
          <path d="M0 6 Q10 0 20 6 Q30 12 40 6 Q50 0 60 6 Q70 12 80 6" fill="none" stroke="hsl(195 45% 70%)" strokeWidth="3" />
        </svg>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-flex items-center gap-2 bg-papachoa-blush px-5 py-2 rounded-full text-sm font-bold text-foreground/80 mb-8 shadow-sm">
              🧶 La prueba de suavidad
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-12">
              Suavidad que
              <br />
              <span className="italic text-papachoa-blush-dark relative inline-block">
                se siente
                <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0 6 Q12 0 25 6 Q37 12 50 6 Q62 0 75 6 Q87 12 100 6" fill="none" stroke="hsl(15 40% 60%)" strokeWidth="2.5" />
                </svg>
              </span>
            </h2>

            <div className="space-y-5">
              {qualities.map((quality) => (
                <div
                  key={quality.title}
                  className={`flex gap-5 p-5 bg-card rounded-3xl border-2 ${quality.borderColor} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group`}
                >
                  <div className={`${quality.color} w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                    <span className="text-2xl">{quality.emoji}</span>
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
              {/* Double blob background */}
              <div className="absolute inset-0 bg-papachoa-blush blob-shape scale-110 -z-20 -rotate-2" />
              <div className="absolute inset-0 bg-papachoa-sky/40 blob-shape scale-[1.15] -z-20 rotate-3" />
              
              <div className="blob-shape overflow-hidden border-4 border-card shadow-xl">
                <img
                  src={lifestyleImage}
                  alt="Textura suave de tela Papachoa"
                  className="w-full aspect-[4/5] object-cover"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={500}
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 right-2 md:bottom-10 md:-right-4 bg-card rounded-2xl shadow-xl p-4 border-2 border-papachoa-blush/30 animate-wiggle">
                <p className="font-display text-lg text-foreground">
                  Tan suave como un <span className="italic text-papachoa-blush-dark">abrazo</span> 🤍
                </p>
              </div>

              {/* Fun sticker */}
              <div className="absolute -top-2 -left-2 bg-papachoa-sage rounded-full w-14 h-14 flex items-center justify-center shadow-lg animate-float -rotate-12 z-10">
                <span className="text-xl">🧸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Softness;
