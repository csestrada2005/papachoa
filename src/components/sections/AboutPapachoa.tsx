import SectionReveal from "@/components/ui/SectionReveal";
import printTexture from "@/assets/brand/print-pajaritos.png";

const AboutPapachoa = () => (
  <section
    id="aboutpapachoa"
    className="relative overflow-hidden z-10"
    style={{ minHeight: "100vh", backgroundColor: "#FFF8F5" }}
  >
    {/* Textura decorativa de pajaritos */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 1,
        backgroundImage: `url(${printTexture})`,
        backgroundSize: "280px",
        backgroundRepeat: "repeat",
        opacity: 0.12,
      }}
    />

    {/* Contenido */}
    <div
      className="relative container flex flex-col justify-center"
      style={{
        zIndex: 10,
        minHeight: "100vh",
        paddingTop: "clamp(5rem, 10vw, 8rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      <div className="w-full md:max-w-[54%] lg:max-w-[48%]">
        {/* ROW 1: label + número */}
        <div className="flex items-start justify-between mb-3">
          <SectionReveal>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.35rem)",
                color: "#b0b0b0",
                opacity: 0.3,
                fontFamily: "var(--font-display, serif)",
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
                color: "#b0b0b0",
                opacity: 0.3,
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
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "clamp(0.01em, 0.3vw, 0.06em)",
              lineHeight: 0.92,
              marginBottom: "clamp(1.8rem, 4vw, 3rem)",
              color: "#1a1a1a",
              textShadow: "0 1px 6px rgba(0,0,0,0.08)",
            }}
          >
            Somos{" "}
            <span
              className="italic"
              style={{ color: "hsl(var(--primary))" }}
            >
              Papachoa.
            </span>
          </h2>
        </SectionReveal>

        {/* Párrafos */}
        <SectionReveal delay={140}>
          <div
            className="space-y-4"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#333",
              fontWeight: 500,
              lineHeight: 1.75,
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
              Cada prenda es única. Cada print diseñado por Miriam y Mercedes.
              Cada pieza confeccionada con cariño por Fer, Alondra y Lucy.
            </p>
          </div>
        </SectionReveal>

        {/* Frase firma */}
        <SectionReveal delay={260}>
          <p
            className="mt-8 leading-snug"
            style={{
              fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
              fontFamily: "var(--font-display, serif)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "hsl(var(--primary))",
              textShadow: "0 1px 6px rgba(0,0,0,0.08)",
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
