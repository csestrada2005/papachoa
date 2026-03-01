import pajaroAzulClaro from "@/assets/brand/pajaro-azul-claro.png";
import pijamaRosa1 from "@/assets/pijama-rosa-1-abrazo.jpg";
import pijamaRosa7 from "@/assets/pijama-rosa-7-familia.jpg";
import pijamaBlanca3 from "@/assets/pijama-blanca-3-familia.jpg";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #historias — Layout asimétrico masónico
   Textos flotantes en posiciones irregulares,
   imágenes de distintos tamaños y alturas
   ───────────────────────────────────────── */

const stories = [
  {
    num: "01",
    title: "Recién nacido",
    body: "Cada hilo es un primer abrazo. Desde el día uno, envolvemos a tu bebé con la suavidad que merece.",
    accentColor: "hsl(var(--papachoa-coral))",
    img: pijamaRosa1,
    imgAlt: "Mamá abrazando bebé",
  },
  {
    num: "02",
    title: "Familia",
    body: "Los momentos que se tejen juntos no se olvidan. Pijamas que unen a quienes más amas en una sola foto.",
    accentColor: "hsl(var(--papachoa-yellow))",
    img: pijamaRosa7,
    imgAlt: "Familia en pijamas iguales",
  },
  {
    num: "03",
    title: "Descanso",
    body: "El ritual de ponerse la pijama merece textiles pensados con intención. Para noches que se sienten como hogar.",
    accentColor: "hsl(var(--papachoa-blue))",
    img: pijamaBlanca3,
    imgAlt: "Familia durmiendo tranquila",
  },
];

const HistoriasHilo = () => (
  <section
    id="historias"
    className="relative overflow-hidden"
    style={{
      background: "#F5F0FF",
      paddingTop: "clamp(5rem, 10vw, 9rem)",
      paddingBottom: "clamp(5rem, 12vw, 10rem)",
    }}
  >
    {/* Pájaro decorativo — flotante */}
    <div className="absolute top-14 right-12 pointer-events-none" aria-hidden="true">
      <img
        src={pajaroAzulClaro}
        alt=""
        style={{ width: "clamp(60px, 10vw, 120px)", height: "auto", opacity: 0.12 }}
        loading="lazy"
      />
    </div>

    <div className="container">

      {/* Header */}
      <div className="mb-16 md:mb-24">
        <SectionReveal>
          <p
            className="font-display mb-4"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", color: "hsl(var(--papachoa-yellow))" }}
          >
            De hilo en hilo
          </p>
        </SectionReveal>
        <SectionReveal delay={80}>
          <h2
            className="font-bold text-foreground leading-none"
            style={{
              fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)",
              letterSpacing: "clamp(0.02em, 0.5vw, 0.08em)",
            }}
          >
            Historias en<br />cada hilo
          </h2>
        </SectionReveal>
      </div>

      {/* Layout masónico asimétrico */}
      <div className="relative">

        {/* Desktop: 3 cols con alturas variables */}
        <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-start">

          {stories.map((story, i) => (
            <SectionReveal
              key={story.num}
              delay={100 + i * 100}
              distance={20}
              className="md:col-span-4"
            >
              <div style={{ paddingTop: i === 1 ? "clamp(3rem, 8vw, 6rem)" : i === 2 ? "clamp(1rem, 4vw, 3rem)" : "0" }}>
                {/* Number */}
                <span
                  className="block font-bold leading-none mb-3 select-none"
                  style={{
                    fontSize: "clamp(3rem, 5vw, 5rem)",
                    color: story.accentColor,
                    opacity: 0.2,
                    letterSpacing: "-0.02em",
                  }}
                  aria-hidden="true"
                >{story.num}</span>

                {/* Title */}
                <h3
                  className="font-display text-foreground mb-3"
                  style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", letterSpacing: "0.05em" }}
                >{story.title}</h3>

                {/* Description */}
                <p
                  className="font-light leading-relaxed text-muted-foreground mb-6"
                  style={{ fontSize: "clamp(0.88rem, 1.3vw, 0.98rem)" }}
                >{story.body}</p>

                {/* Image */}
                <div
                  className="overflow-hidden rounded-xl"
                  style={{ aspectRatio: i === 0 ? "3/4" : i === 1 ? "1/1" : "4/5" }}
                >
                  <img
                    src={story.img}
                    alt={story.imgAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </SectionReveal>
          ))}

        </div>

        {/* Mobile: stack vertical con offset */}
        <div className="md:hidden space-y-14">
          {stories.map((story, i) => (
            <SectionReveal key={story.num} delay={i * 100} distance={16}>
              <div style={{ marginLeft: i === 1 ? "clamp(1rem, 6vw, 3rem)" : "0" }}>
                <span
                  className="block font-bold leading-none mb-3 select-none"
                  style={{
                    fontSize: "4rem",
                    color: story.accentColor,
                    opacity: 0.18,
                    letterSpacing: "-0.02em",
                  }}
                  aria-hidden="true"
                >{story.num}</span>
                <h3 className="font-display text-foreground mb-2" style={{ fontSize: "1.4rem", letterSpacing: "0.05em" }}>
                  {story.title}
                </h3>
                <p className="font-light text-muted-foreground leading-relaxed mb-4" style={{ fontSize: "0.95rem" }}>
                  {story.body}
                </p>
                <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={story.img}
                    alt={story.imgAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default HistoriasHilo;
