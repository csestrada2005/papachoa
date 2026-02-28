import SectionReveal from "@/components/ui/SectionReveal";
import papaNinaImg from "@/assets/pijama-dinosaurio-1-papa-nina.jpg";

/* ─────────────────────────────────────────
   #aboutpapachoa — Full-screen hero con imagen de fondo
   Texto encima con overlay + glass sutil
   ───────────────────────────────────────── */

const AboutPapachoa = () => (
  <section
    id="aboutpapachoa"
    className="relative overflow-hidden"
    style={{ minHeight: "100vh" }}
  >
    {/* Fondo: imagen full-screen */}
    <img
      src={papaNinaImg}
      alt="Papá e hija con pijamas Papachoa"
      className="absolute inset-0 w-full h-full object-cover object-center"
      style={{ zIndex: 0 }}
      loading="lazy"
    />

    {/* Overlay: degradado izquierda más sólido para legibilidad del texto */}
    <div
      className="absolute inset-0"
      style={{
        zIndex: 1,
        background:
          "linear-gradient(105deg, rgba(8,6,4,0.60) 0%, rgba(8,6,4,0.38) 50%, rgba(8,6,4,0.10) 100%)",
      }}
    />

    {/* Contenido: texto encima */}
    <div
      className="relative container flex flex-col justify-center"
      style={{
        zIndex: 10,
        minHeight: "100vh",
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      {/* Glass card con el texto */}
      <div
        className="w-full md:max-w-[54%] lg:max-w-[48%]"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "20px",
          boxShadow: "0 12px 50px rgba(0,0,0,0.20), 0 1px 0 rgba(255,255,255,0.08) inset",
          padding: "clamp(2rem, 5vw, 3.5rem)",
        }}
      >
        {/* ROW 1: label + número */}
        <div className="flex items-start justify-between mb-3">
          <SectionReveal>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.35rem)",
                color: "rgba(255,255,255,0.90)",
                fontFamily: "var(--font-display, serif)",
                textShadow: "0 1px 8px rgba(0,0,0,0.25)",
              }}
            >
              Hola
            </p>
          </SectionReveal>
          <SectionReveal delay={60}>
            <span
              className="font-bold select-none leading-none"
              aria-hidden="true"
              style={{
                fontSize: "clamp(4rem, 12vw, 10rem)",
                color: "rgba(255,255,255,0.10)",
                letterSpacing: "-0.04em",
                lineHeight: 0.85,
              }}
            >01</span>
          </SectionReveal>
        </div>

        {/* Título */}
        <SectionReveal delay={80}>
          <h2
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(2.4rem, 7vw, 6rem)",
              letterSpacing: "clamp(0.01em, 0.3vw, 0.06em)",
              lineHeight: 0.92,
              marginBottom: "clamp(1.8rem, 4vw, 3rem)",
              color: "#fff",
              textShadow: "0 2px 20px rgba(0,0,0,0.30)",
            }}
          >
            Somos{" "}
            <span
              className="italic"
              style={{ color: "hsl(var(--primary))", textShadow: "0 2px 20px rgba(0,0,0,0.20)" }}
            >
              Papachoa.
            </span>
          </h2>
        </SectionReveal>

        {/* Párrafos */}
        <SectionReveal delay={140}>
          <div
            className="space-y-4 font-light leading-relaxed"
            style={{
              fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 1px 4px rgba(0,0,0,0.40)",
            }}
          >
            <p>
              Papachoa significa apapacho en náhuatl. Y eso es exactamente lo que
              queremos lograr con cada prenda: abrazar el alma de los niños… y
              también la de mamá.
            </p>
            <p>
              Somos una marca mexicana que nació de una convicción simple: los
              momentos de descanso merecen ser tan especiales como el amor que
              los rodea.
            </p>
            <p>
              Cada prenda es única. Cada print ha sido diseñado por Miriam y
              Mercedes. Y cada pieza es confeccionada con muchísimo cariño por
              Fer, Alondra y Lucy.
            </p>
          </div>
        </SectionReveal>

        {/* Frase firma */}
        <SectionReveal delay={260}>
          <p
            className="mt-8 leading-snug"
            style={{
              fontSize: "clamp(1.1rem, 2.4vw, 1.7rem)",
              fontFamily: "var(--font-display, serif)",
              fontStyle: "italic",
              color: "hsl(var(--primary))",
              textShadow: "0 1px 10px rgba(0,0,0,0.20)",
            }}
          >
            "El apapacho empieza con la pijama."
          </p>
        </SectionReveal>
      </div>
    </div>
  </section>
);

export default AboutPapachoa;
