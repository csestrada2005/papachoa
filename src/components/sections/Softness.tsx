import lifestyleImage from "@/assets/lifestyle-2.png";

const qualities = [
  {
    title: "Ultra suave",
    description: "Telas seleccionadas que acarician la piel desde el primer contacto",
    stitch: "hsl(14 52% 46%)",
  },
  {
    title: "Se siente rico al instante",
    description: "Sin rigidez, sin espera. Suave desde que lo abres",
    stitch: "hsl(38 60% 52%)",
  },
  {
    title: "Pensado para dormir mejor",
    description: "Dise\u00f1os que abrazan sin apretar, para noches tranquilas",
    stitch: "hsl(162 22% 42%)",
  },
];

const Softness = () => {
  return (
    <section className="py-24 md:py-32 section-terracotta relative overflow-hidden texture-linen texture-woven">
      {/* Floating fabric shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 -left-16 w-48 h-48 opacity-[0.06] animate-drift"
          style={{
            background: "radial-gradient(circle, hsl(38 60% 52% / 0.3), transparent 70%)",
            borderRadius: "50% 50% 35% 65% / 60% 40% 60% 40%"
          }} />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-6">
              La prueba de suavidad
            </p>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-4">
              Suavidad que
              <br />
              <em className="text-primary">se siente</em>
            </h2>

            <div className="divider-cross-stitch w-20 mb-10" />

            <div className="space-y-4">
              {qualities.map((quality) => (
                <div
                  key={quality.title}
                  className="p-5 bg-card/80 backdrop-blur-sm border border-border/30 hover:shadow-md transition-shadow relative"
                  style={{ borderRadius: "3px", borderLeft: `3px solid ${quality.stitch}` }}
                >
                  {/* Corner stitch marks */}
                  <svg className="absolute top-1 right-1 w-3 h-3 opacity-20" viewBox="0 0 8 8">
                    <line x1="0" y1="4" x2="8" y2="4" stroke={quality.stitch} strokeWidth="1" />
                    <line x1="4" y1="0" x2="4" y2="8" stroke={quality.stitch} strokeWidth="1" />
                  </svg>
                  <h3 className="font-display text-xl text-foreground mb-1">
                    {quality.title}
                  </h3>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed">
                    {quality.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative max-w-md mx-auto lg:max-w-none paper-shadow">
              <div className="frame-fabric overflow-hidden">
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
              {/* Stitched frame */}
              <svg className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="2" y="2" width="96" height="96" rx="1" fill="none" stroke="hsl(14 52% 46% / 0.2)" strokeWidth="0.5" strokeDasharray="2.5 3" />
              </svg>

              {/* Floating editorial badge */}
              <div className="absolute -bottom-3 right-2 md:bottom-10 md:-right-4 bg-card rounded-sm shadow-lg p-4 border border-border/30 relative">
                <div className="absolute inset-[3px] border border-dashed border-primary/15 rounded-sm pointer-events-none" />
                <p className="font-display text-lg text-foreground">
                  Tan suave como un <em className="text-primary">abrazo</em>
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
