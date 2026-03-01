import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import pajaroAmarillo from "@/assets/brand/pajaro-amarillo.png";
import pajaroAzul from "@/assets/brand/pajaro-azul.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #mexico — 3 cols con alturas variables, offset,
   fondos de color sutiles por columna
   ───────────────────────────────────────── */

const commitments = [
  {
    bird: pajaroNaranja,
    title: "Comercio justo",
    body: "Cada prenda lleva el trabajo de artesanas locales que cobran lo que merecen.",
    bg: "hsl(var(--papachoa-coral) / 0.06)",
    topOffset: "0rem",
    paddingTop: "2rem",
  },
  {
    bird: pajaroAmarillo,
    title: "Hecho a mano",
    body: "Sin líneas de ensamble masivo. Pieza por pieza, con atención en cada puntada.",
    bg: "hsl(var(--papachoa-yellow) / 0.10)",
    topOffset: "3rem",
    paddingTop: "3rem",
  },
  {
    bird: pajaroAzul,
    title: "100% Mexicano",
    body: "Desde el diseño hasta el empaque. Orgullosamente hecho en México.",
    bg: "hsl(var(--papachoa-blue) / 0.06)",
    topOffset: "1.5rem",
    paddingTop: "2.5rem",
  },
];

const MexicoAmor = () => (
  <section
    id="mexico"
    className="overflow-hidden"
    style={{
      background: "hsl(15 20% 97%)",
      paddingTop: "clamp(5rem, 10vw, 9rem)",
      paddingBottom: "clamp(5rem, 10vw, 9rem)",
    }}
  >
    <div className="container">

      {/* Intro — título grande con número al margen */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-16 mb-20 md:mb-28">
        <SectionReveal className="md:w-1/2">
          <p
            className="font-display text-primary mb-3"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
          >
            Hecho en México con amor
          </p>
          <h2
            className="font-bold text-foreground leading-none"
            style={{
              fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
              letterSpacing: "clamp(0.02em, 0.4vw, 0.07em)",
            }}
          >
            Cada prenda tiene<br />nombre y apellido
          </h2>
        </SectionReveal>

        <SectionReveal delay={100} className="md:w-1/2 mt-0 md:mt-0">
          <p
            className="text-muted-foreground font-light leading-relaxed"
            style={{ fontSize: "clamp(0.93rem, 1.4vw, 1.08rem)" }}
          >
            Trabajamos con talleres locales bajo principios de comercio justo.
            Cada Papachoa lleva el cuidado de artesanas que ponen el corazón
            en cada puntada.
          </p>
        </SectionReveal>
      </div>


      {/* 3 cols con alturas variables y color block de fondo */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-5 items-end">
        {commitments.map((c, i) => (
          <SectionReveal key={c.title} delay={100 + i * 100} distance={16}>
            <div
              style={{
                background: c.bg,
                padding: "clamp(1.5rem, 3.5vw, 3rem)",
                marginTop: c.topOffset,
                paddingTop: c.paddingTop,
                minHeight: "clamp(220px, 30vw, 340px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Bird icon */}
              <img
                src={c.bird}
                alt=""
                aria-hidden="true"
                style={{ width: "clamp(40px, 6vw, 66px)", height: "auto", opacity: 0.7, marginBottom: "1.5rem" }}
                loading="lazy"
              />

              <div>
                <h3
                  className="font-bold text-foreground mb-3"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}
                >
                  {c.title}
                </h3>
                <p
                  className="text-muted-foreground font-light leading-relaxed"
                  style={{ fontSize: "clamp(0.88rem, 1.3vw, 0.98rem)" }}
                >
                  {c.body}
                </p>
              </div>
            </div>
          </SectionReveal>
        ))}
      </div>

    </div>
  </section>
);

export default MexicoAmor;
