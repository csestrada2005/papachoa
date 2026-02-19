import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import pajaroAmarillo from "@/assets/brand/pajaro-amarillo.png";
import pajaroAzul from "@/assets/brand/pajaro-azul.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #mexico — "Hecho en México con amor"
   Elena "Terms" block: minimal editorial text,
   3 commitments with bird icons
   ───────────────────────────────────────── */

const commitments = [
  {
    bird: pajaroNaranja,
    title: "Comercio justo",
    body: "Cada prenda lleva el trabajo de artesanas locales que cobran lo que merecen.",
  },
  {
    bird: pajaroAmarillo,
    title: "Hecho a mano",
    body: "Sin líneas de ensamble masivo. Pieza por pieza, con atención en cada puntada.",
  },
  {
    bird: pajaroAzul,
    title: "100% Mexicano",
    body: "Desde el diseño hasta el empaque. Orgullosamente hecho en México.",
  },
];

const MexicoAmor = () => (
  <section
    id="mexico"
    className="py-28 md:py-40 overflow-hidden"
    style={{ background: "hsl(15 20% 97%)" }}
  >
    <div className="container">

      {/* Main editorial block */}
      <div className="max-w-2xl mb-20 md:mb-28">
        <SectionReveal>
          <p
            className="font-display text-primary mb-4"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}
          >
            Hecho en México con amor
          </p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="font-bold text-foreground mb-8"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
              letterSpacing: "clamp(0.04em, 0.7vw, 0.12em)",
              lineHeight: 1.08,
            }}
          >
            Cada prenda tiene nombre y apellido
          </h2>
        </SectionReveal>

        <SectionReveal delay={160}>
          <p
            className="text-muted-foreground font-light leading-relaxed"
            style={{ fontSize: "clamp(0.97rem, 1.5vw, 1.08rem)" }}
          >
            Trabajamos con talleres locales bajo principios de comercio justo.
            Cada Papachoa lleva el cuidado de artesanas que ponen el corazón
            en cada puntada — y saben que lo que hacen importa.
          </p>
        </SectionReveal>
      </div>

      {/* 3 commitment blocks — Elena layout */}
      <div className="grid md:grid-cols-3 gap-12 md:gap-16 max-w-4xl">
        {commitments.map((c, i) => (
          <SectionReveal key={c.title} delay={80 + i * 100} distance={16}>
            {/* Bird icon — Elena's eye/pen/clock equivalents */}
            <div className="mb-6">
              <img
                src={c.bird}
                alt=""
                aria-hidden="true"
                style={{ width: "clamp(44px, 7vw, 70px)", height: "auto", opacity: 0.75 }}
                loading="lazy"
              />
            </div>

            <h3
              className="font-bold text-foreground mb-3"
              style={{
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {c.title}
            </h3>

            <p
              className="text-muted-foreground font-light leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
            >
              {c.body}
            </p>
          </SectionReveal>
        ))}
      </div>

    </div>
  </section>
);

export default MexicoAmor;
