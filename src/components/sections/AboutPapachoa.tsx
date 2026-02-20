import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #aboutpapachoa — Offset editorial layout
   Título enorme izquierda, imagen desfasada derecha
   ───────────────────────────────────────── */

const AboutPapachoa = () => (
  <section
    id="aboutpapachoa"
    className="overflow-hidden"
    style={{ background: "#fff", paddingTop: "clamp(5rem, 10vw, 9rem)", paddingBottom: "clamp(4rem, 8vw, 7rem)" }}
  >
    <div className="container">

      {/* ROW 1: label izquierda + número decorativo derecha */}
      <div className="flex items-start justify-between mb-4">
        <SectionReveal>
          <p
            className="font-display text-primary"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}
          >
            Hola
          </p>
        </SectionReveal>
        <SectionReveal delay={60}>
          <span
            className="font-bold select-none leading-none"
            style={{
              fontSize: "clamp(6rem, 16vw, 14rem)",
              color: "hsl(var(--papachoa-cream))",
              letterSpacing: "-0.04em",
              lineHeight: 0.85,
              userSelect: "none",
            }}
            aria-hidden="true"
          >01</span>
        </SectionReveal>
      </div>

      {/* ROW 2: título enorme */}
      <SectionReveal delay={80}>
        <h2
          className="font-bold text-foreground leading-none"
          style={{
            fontSize: "clamp(3rem, 10vw, 9rem)",
            letterSpacing: "clamp(0.02em, 0.5vw, 0.08em)",
            lineHeight: 0.92,
            marginBottom: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          Somos{" "}
          <span className="italic" style={{ color: "hsl(var(--primary))" }}>Papachoa.</span>
        </h2>
      </SectionReveal>

      {/* ROW 3: texto */}
      <div className="max-w-2xl">
        <div>
          <SectionReveal delay={140}>
            <div
              className="space-y-5 text-muted-foreground font-light leading-relaxed"
              style={{ fontSize: "clamp(0.97rem, 1.5vw, 1.1rem)", maxWidth: "400px" }}
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

          {/* Cita editorial flotante debajo del texto */}
          <SectionReveal delay={260}>
            <p
              className="font-display text-primary mt-10 leading-snug"
              style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", maxWidth: "320px" }}
            >
              "El apapacho empieza con la pijama."
            </p>
          </SectionReveal>
        </div>

      </div>
    </div>
  </section>
);

export default AboutPapachoa;
