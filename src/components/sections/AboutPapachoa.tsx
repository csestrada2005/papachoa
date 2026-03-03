import printTexture from "@/assets/brand/print-pajaritos.png";
import lifestyleImg from "@/assets/pijama-rosa-1-abrazo.jpg";

const AboutPapachoa = () => {
  return (
    <section
      id="aboutpapachoa"
      className="relative overflow-hidden z-10"
      style={{ backgroundColor: "#FFF8F5" }}>

    {/* Textura decorativa de pajaritos */}
    <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: `url(${printTexture})`,
          backgroundSize: "280px",
          backgroundRepeat: "repeat",
          opacity: 0.12
        }} />

    {/* Contenido */}
    <div
        className="relative container flex flex-col md:flex-row md:items-center md:gap-10 justify-center py-24 md:py-32"
        style={{ zIndex: 10 }}>

      <div className="w-full md:w-[58%] lg:w-[55%]">
        {/* Título */}
        <h2
            className="font-bold leading-none"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "clamp(0.01em, 0.3vw, 0.06em)",
              lineHeight: 0.92,
              marginBottom: "clamp(1.8rem, 4vw, 3rem)",
              color: "#1a1a1a",
              textShadow: "0 1px 6px rgba(0,0,0,0.08)"
            }}>

          Somos{" "}
          <span
              className="italic"
              style={{ color: "hsl(var(--primary))" }}>
            Papachoa.
          </span>
        </h2>

        {/* Párrafos */}
        <div
            className="space-y-4"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#333",
              fontWeight: 500,
              lineHeight: 1.75
            }}>

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

        {/* Frase firma */}
        <p
            className="mt-8 leading-snug"
            style={{
              fontSize: "clamp(1.3rem, 2.8vw, 2rem)",
              fontFamily: "var(--font-display, serif)",
              fontStyle: "italic",
              fontWeight: 700,
              color: "hsl(var(--primary))",
              textShadow: "0 1px 6px rgba(0,0,0,0.08)"
            }}>
          "El apapacho empieza con la pijama."
        </p>
      </div>

      {/* Imagen lifestyle — solo desktop */}
      <div className="hidden md:block md:w-[42%] lg:w-[45%]">
        <img
            src={lifestyleImg}
            alt="Mamá e hija abrazándose en pijama rosa Papachoa"
            className="w-full rounded-2xl object-cover"
            style={{
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              maxHeight: "75vh"
            }}
            loading="lazy" />
      </div>
    </div>
  </section>);
};

export default AboutPapachoa;
