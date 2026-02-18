import lifestyleImage from "@/assets/lifestyle-2.png";
import pajaroAmarillo from "@/assets/brand/pajaro-amarillo.png";

const qualities = [
  {
    title: "Ultra suave",
    description: "Telas seleccionadas que acarician la piel desde el primer contacto",
    color: "hsl(var(--papachoa-coral))",
  },
  {
    title: "Se siente rico al instante",
    description: "Sin rigidez, sin espera. Suave desde que lo abres",
    color: "hsl(var(--papachoa-yellow))",
  },
  {
    title: "Pensado para dormir mejor",
    description: "Diseños que abrazan sin apretar, para noches tranquilas",
    color: "hsl(var(--papachoa-blue))",
  },
];

const Softness = () => (
  <section className="py-24 md:py-36 relative overflow-hidden" style={{ background: "hsl(14 80% 96%)" }}>
    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="font-display text-2xl md:text-3xl text-primary mb-4">La prueba de suavidad</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
            Suavidad que se siente
          </h2>

          <div className="space-y-4">
            {qualities.map((quality) => (
              <div
                key={quality.title}
                className="p-5 bg-card/80 backdrop-blur-sm rounded-xl border border-border/30 hover:shadow-md transition-shadow"
                style={{ borderLeft: `4px solid ${quality.color}` }}
              >
                <h3 className="text-lg font-bold text-foreground mb-1">{quality.title}</h3>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">{quality.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative">
          <div className="rounded-2xl overflow-hidden shadow-lg">
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
          {/* Floating bird */}
          <img
            src={pajaroAmarillo}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 w-14 md:w-20 opacity-15 animate-float-gentle pointer-events-none"
            loading="lazy"
          />
          <div className="absolute -bottom-3 left-4 md:bottom-10 md:-left-4 bg-card rounded-xl shadow-lg p-4 border border-border/30">
            <p className="font-display text-xl text-foreground">
              Tan suave como un <span className="text-primary">abrazo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Softness;