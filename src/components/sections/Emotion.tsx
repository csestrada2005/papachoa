import lifestyleImage from "@/assets/lifestyle-1.png";
import pajaroAzul from "@/assets/brand/pajaro-azul.png";
import pajaroAmarillo from "@/assets/brand/pajaro-amarillo.png";

const Emotion = () => (
  <section className="py-24 md:py-36 relative overflow-hidden">
    <div className="container relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={lifestyleImage}
              alt="Bebé descansando con cobijo Papachoa"
              className="w-full aspect-[3/4] object-cover"
              loading="lazy"
              decoding="async"
              width={400}
              height={533}
            />
          </div>
          {/* Decorative birds */}
          <img
            src={pajaroAzul}
            alt=""
            aria-hidden="true"
            className="absolute -top-6 -right-6 w-16 md:w-20 opacity-20 animate-float-gentle pointer-events-none"
            loading="lazy"
          />
          <img
            src={pajaroAmarillo}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-4 -left-4 w-12 md:w-16 opacity-15 animate-drift-slow pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Text */}
        <div className="max-w-xl">
          <p className="font-display text-2xl md:text-3xl text-primary mb-4">
            Nuestra filosofía
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            Hechos con amor, para los sueños más dulces
          </h2>
          <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
            Papachoa no vende pijamas. Vende calma, descanso y hogar.
            Cada momento de descanso merece sentirse especial, y cada prenda
            está pensada para hacer tu hogar más suave, más cálido, más tuyo.
          </p>

          {/* Values with bird bullets */}
          <ul className="space-y-4">
            {["Textiles ultra suaves", "Diseñados para compartir en familia", "Cada prenda lleva el nombre de un pájaro"].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <img src={pajaroAmarillo} alt="" aria-hidden="true" className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-70" />
                <span className="text-foreground font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Emotion;