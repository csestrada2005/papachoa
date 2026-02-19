import texturaImg from "@/assets/textura-tela.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #suavidad — "La prueba de suavidad"
   Elena "Terms" block pattern but editorial:
   star bullets + close-up texture image, alternating layout
   ───────────────────────────────────────── */

const qualities = [
  "Telas seleccionadas pieza por pieza — sin atajos.",
  "Ultra suaves desde el primer lavado, sin ablandar.",
  "Sin químicos agresivos. Aptas para piel de bebé.",
  "Diseñadas para abrazar sin apretar. Sin rigidez.",
  "Respiran con tu cuerpo toda la noche.",
];

const StarBullet = ({ text }: { text: string }) => (
  <li className="flex items-start gap-4">
    <span
      className="flex-shrink-0 mt-0.5 text-primary"
      style={{ fontSize: "1.05rem", lineHeight: 1.7 }}
      aria-hidden="true"
    >
      ★
    </span>
    <span
      className="text-foreground/75 font-light leading-relaxed"
      style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
    >
      {text}
    </span>
  </li>
);

const Suavidad = () => (
  <section
    id="suavidad"
    className="py-28 md:py-40 overflow-hidden"
    style={{ background: "#fff" }}
  >
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left — image (desktop: left, Elena alternating) */}
        <SectionReveal delay={60} distance={20} className="lg:order-1">
          <div className="overflow-hidden">
            <img
              src={texturaImg}
              alt="Textura ultra suave de tela Papachoa"
              className="w-full"
              style={{
                aspectRatio: "4/3",
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
              decoding="async"
              width={560}
              height={420}
            />
          </div>
        </SectionReveal>

        {/* Right — text block */}
        <div className="lg:order-2 lg:pt-4">
          <SectionReveal>
            <p
              className="font-display text-primary mb-4"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}
            >
              La diferencia que se siente
            </p>
          </SectionReveal>

          <SectionReveal delay={80}>
            <h2
              className="font-bold text-foreground mb-10"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "clamp(0.03em, 0.5vw, 0.09em)",
                lineHeight: 1.1,
              }}
            >
              La prueba de suavidad
            </h2>
          </SectionReveal>

          <SectionReveal delay={160}>
            <ul className="space-y-5 mb-10">
              {qualities.map((q, i) => (
                <StarBullet key={i} text={q} />
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal delay={280}>
            <p
              className="font-display text-foreground/70 leading-snug"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
            >
              "Tan suave como un apapacho."
            </p>
          </SectionReveal>
        </div>

      </div>
    </div>
  </section>
);

export default Suavidad;
