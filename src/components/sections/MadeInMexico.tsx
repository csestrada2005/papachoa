import pajaroAzul from "@/assets/brand/pajaro-azul.png";
import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import pajaroAmarillo from "@/assets/brand/pajaro-amarillo.png";

const features = [
  { label: "Comercio justo", icon: pajaroNaranja, color: "hsl(var(--papachoa-coral))" },
  { label: "Hecho a mano", icon: pajaroAmarillo, color: "hsl(var(--papachoa-yellow))" },
  { label: "100% Mexicano", icon: pajaroAzul, color: "hsl(var(--papachoa-blue))" },
];

const MadeInMexico = () => (
  <section className="py-24 md:py-36 relative overflow-hidden">
    <div className="container relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-display text-2xl md:text-3xl text-primary mb-4">Hecho en México con amor</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
          Cada prenda tiene nombre y apellido
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-14 leading-relaxed">
          Trabajamos con talleres locales bajo principios de comercio justo.
          Cada pijama lleva el cuidado de artesanas que ponen el corazón en cada puntada.
        </p>

        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {features.map((item) => (
            <div key={item.label} className="text-center">
              <div
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 flex items-center justify-center rounded-full"
                style={{ background: `${item.color}15` }}
              >
                <img src={item.icon} alt="" aria-hidden="true" className="w-10 h-10 md:w-12 md:h-12" loading="lazy" />
              </div>
              <p className="text-sm md:text-base font-bold text-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default MadeInMexico;