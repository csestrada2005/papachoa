import texturaImg from "@/assets/textura-tela.png";
import texturaDoodle from "@/assets/textura-doodle.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #suavidad — Layout asimétrico esparcido
   Elementos distribuidos en espacio con
   círculos de fondo sutiles
   ───────────────────────────────────────── */

const qualities = [
  { text: "Telas seleccionadas pieza por pieza — sin atajos.", offset: "0%", delay: 100 },
  { text: "Ultra suaves desde el primer lavado, sin ablandar.", offset: "8%", delay: 180 },
  { text: "Sin químicos agresivos. Aptas para piel de bebé.", offset: "2%", delay: 260 },
  { text: "Diseñadas para abrazar sin apretar. Sin rigidez.", offset: "10%", delay: 340 },
  { text: "Respiran con tu cuerpo toda la noche.", offset: "5%", delay: 420 },
];

const Suavidad = () => (
  <section
    id="suavidad"
    className="relative overflow-hidden"
    style={{
      background: "#fff",
      paddingTop: "clamp(5rem, 10vw, 9rem)",
      paddingBottom: "clamp(5rem, 10vw, 9rem)",
    }}
  >
    {/* Círculos de fondo sutiles */}
    <div
      className="absolute pointer-events-none"
      aria-hidden="true"
      style={{
        width: "clamp(300px, 50vw, 600px)",
        height: "clamp(300px, 50vw, 600px)",
        borderRadius: "50%",
        background: "hsl(var(--papachoa-coral) / 0.04)",
        top: "-10%",
        right: "-10%",
      }}
    />
    <div
      className="absolute pointer-events-none"
      aria-hidden="true"
      style={{
        width: "clamp(200px, 35vw, 400px)",
        height: "clamp(200px, 35vw, 400px)",
        borderRadius: "50%",
        background: "hsl(var(--papachoa-blue) / 0.04)",
        bottom: "5%",
        left: "-8%",
      }}
    />

    <div className="container relative z-10">

      {/* Header asimétrico — label arriba derecha */}
      <div className="flex items-start justify-between mb-16 gap-8">
        <SectionReveal>
          <div>
            <p
              className="font-display text-primary mb-3"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
            >
              La diferencia que se siente
            </p>
            <h2
              className="font-bold text-foreground leading-none"
              style={{
                fontSize: "clamp(2.2rem, 6.5vw, 5.5rem)",
                letterSpacing: "clamp(0.02em, 0.4vw, 0.07em)",
              }}
            >
              La prueba<br />de suavidad
            </h2>
          </div>
        </SectionReveal>

        {/* Imagen secundaria — doodle en esquina */}
        <SectionReveal delay={80} distance={12} className="hidden lg:block flex-shrink-0">
          <div
            className="overflow-hidden opacity-40"
            style={{ width: "clamp(80px, 10vw, 140px)", aspectRatio: "1/1" }}
          >
            <img
              src={texturaDoodle}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </SectionReveal>
      </div>

      {/* Layout asimétrico: imagen izquierda + items esparcidos derecha */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-start">

        {/* Imagen principal — col 1-5 */}
        <SectionReveal delay={60} distance={20} className="lg:col-span-5">
          <div className="relative">
            <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img
                src={texturaImg}
                alt="Textura ultra suave de tela Papachoa"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={480}
                height={640}
              />
            </div>

            {/* Cita flotante sobre imagen */}
            <div
              className="absolute bottom-0 left-0 right-0 p-6"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)" }}
            >
              <p
                className="font-display text-white leading-snug"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
              >
                "Tan suave como un apapacho."
              </p>
            </div>
          </div>
        </SectionReveal>

        {/* Items esparcidos — col 7-12 */}
        <div className="lg:col-span-6 lg:col-start-7">
          {qualities.map((q, i) => (
            <SectionReveal key={i} delay={q.delay} distance={12}>
              <div
                className="flex items-start gap-5 py-5 border-b border-border/20"
                style={{ paddingLeft: q.offset }}
              >
                {/* Número lateral */}
                <span
                  className="flex-shrink-0 font-bold text-foreground/10 select-none"
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    lineHeight: 1.1,
                    minWidth: "2rem",
                    letterSpacing: "-0.02em",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="flex-1 pt-1">
                  <span
                    className="text-primary mr-2"
                    style={{ fontSize: "0.65rem" }}
                    aria-hidden="true"
                  >★</span>
                  <span
                    className="text-foreground font-light leading-relaxed"
                    style={{ fontSize: "clamp(0.93rem, 1.4vw, 1.02rem)" }}
                  >
                    {q.text}
                  </span>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default Suavidad;
