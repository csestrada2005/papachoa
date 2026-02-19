import familiaImg from "@/assets/pijama-rosa-0-familia-azul.jpg";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #aboutpapachoa — "Hola. Somos Papachoa."
   Elena pattern: large spaced title + editorial
   2-col layout (text left, photo right)
   ───────────────────────────────────────── */

const AboutPapachoa = () => (
  <section
    id="aboutpapachoa"
    className="py-28 md:py-40 overflow-hidden"
    style={{ background: "#fff" }}
  >
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left — text block */}
        <div>
          <SectionReveal>
            <p
              className="font-display text-primary mb-5"
              style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}
            >
              Hola
            </p>
          </SectionReveal>

          <SectionReveal delay={80}>
            <h2
              className="font-bold text-foreground leading-tight mb-8"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 5rem)",
                letterSpacing: "clamp(0.04em, 0.8vw, 0.12em)",
                lineHeight: 1.1,
              }}
            >
              Somos{" "}
              <span style={{ color: "hsl(var(--primary))" }}>Papachoa.</span>
            </h2>
          </SectionReveal>

          <SectionReveal delay={160}>
            <div
              className="space-y-5 text-muted-foreground font-light leading-relaxed"
              style={{ fontSize: "clamp(0.97rem, 1.5vw, 1.1rem)", maxWidth: "480px" }}
            >
              <p>
                Somos una marca mexicana que nació de una convicción simple:
                los momentos de descanso merecen ser tan especiales como el amor
                que los rodea.
              </p>
              <p>
                Cada pijama Papachoa lleva horas de cuidado artesanal, telas
                seleccionadas con criterio y un diseño pensado para que toda la
                familia duerma, ría y se abrace con la misma ropa puesta.
              </p>
              <p>
                No vendemos pijamas. Vendemos el ritual de ponerse la pijama juntos,
                la foto de esa noche, el olor a hogar que queda en la tela.
              </p>
            </div>
          </SectionReveal>
        </div>

        {/* Right — editorial photo */}
        <SectionReveal delay={220} distance={22} className="lg:pt-10">
          <div
            className="overflow-hidden"
            style={{ borderRadius: "0" /* Elena: sin border-radius en fotos */ }}
          >
            <img
              src={familiaImg}
              alt="Familia Papachoa en pijamas"
              className="w-full"
              style={{
                aspectRatio: "4/5",
                objectFit: "cover",
                objectPosition: "top center",
                display: "block",
              }}
              loading="lazy"
              decoding="async"
              width={540}
              height={675}
            />
          </div>
        </SectionReveal>

      </div>
    </div>
  </section>
);

export default AboutPapachoa;
