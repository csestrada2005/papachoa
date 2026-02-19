import pajaroAzulClaro from "@/assets/brand/pajaro-azul-claro.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #historias — "Historias en cada hilo"
   Elena "Step 1 / 2 / 3" dark-section pattern:
   numbered editorial blocks on dark bg
   ───────────────────────────────────────── */

const stories = [
  {
    num: "01",
    title: "Recién nacido",
    body: "Cada hilo es un primer abrazo. Desde el día uno, envolvemos a tu bebé con la suavidad que merece.",
    accentColor: "hsl(var(--papachoa-coral))",
  },
  {
    num: "02",
    title: "Familia",
    body: "Los momentos que se tejen juntos no se olvidan. Pijamas que unen a quienes más amas en una sola foto.",
    accentColor: "hsl(var(--papachoa-yellow))",
  },
  {
    num: "03",
    title: "Descanso",
    body: "El ritual de ponerse la pijama merece textiles pensados con intención. Para noches que se sienten como hogar.",
    accentColor: "hsl(var(--papachoa-blue))",
  },
];

const HistoriasHilo = () => (
  <section
    id="historias"
    className="py-28 md:py-44 relative overflow-hidden"
    style={{ background: "hsl(216 44% 14%)" }}
  >
    {/* Decorative bird — Elena floating accent */}
    <div
      className="absolute top-14 right-12 pointer-events-none"
      aria-hidden="true"
    >
      <img
        src={pajaroAzulClaro}
        alt=""
        style={{ width: "clamp(60px, 9vw, 110px)", height: "auto", opacity: 0.07 }}
        loading="lazy"
      />
    </div>

    <div className="container">

      {/* Section label + title */}
      <div className="mb-20 md:mb-28">
        <SectionReveal>
          <p
            className="font-display mb-5"
            style={{
              fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
              color: "hsl(var(--papachoa-yellow))",
            }}
          >
            De hilo en hilo
          </p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="font-bold text-white/95 leading-tight"
            style={{
              fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
              letterSpacing: "clamp(0.04em, 0.7vw, 0.12em)",
              lineHeight: 1.08,
            }}
          >
            Historias en cada hilo
          </h2>
        </SectionReveal>
      </div>

      {/* 01 / 02 / 03 blocks — Elena's exact pattern */}
      <div className="grid md:grid-cols-3 gap-14 md:gap-10 lg:gap-16 max-w-5xl">
        {stories.map((story, i) => (
          <SectionReveal key={story.num} delay={100 + i * 110} distance={18}>
            {/* Giant decorative number — Elena Step pattern */}
            <span
              className="block font-bold leading-none mb-5 select-none"
              style={{
                fontSize: "clamp(4rem, 9vw, 8rem)",
                color: story.accentColor,
                opacity: 0.18,
                letterSpacing: "-0.02em",
              }}
              aria-hidden="true"
            >
              {story.num}
            </span>

            <h3
              className="font-bold text-white mb-4"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)",
                letterSpacing: "0.05em",
              }}
            >
              {story.title}
            </h3>

            <p
              className="font-light leading-relaxed text-white/55"
              style={{ fontSize: "clamp(0.92rem, 1.4vw, 1rem)" }}
            >
              {story.body}
            </p>
          </SectionReveal>
        ))}
      </div>

    </div>
  </section>
);

export default HistoriasHilo;
