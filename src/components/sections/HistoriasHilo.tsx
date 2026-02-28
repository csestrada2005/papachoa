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
        <div className="hidden md:grid md:grid-cols-12 gap-6 lg:gap-8 items-end">

          {/* Col 1 — imagen grande + texto abajo */}
          <SectionReveal delay={100} distance={20} className="md:col-span-4">
            <div>
              <div
                className="overflow-hidden mb-6"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={stories[0].img}
                  alt={stories[0].imgAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                />
              </div>
              <span
                className="block font-bold leading-none mb-3 select-none"
                style={{
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  color: stories[0].accentColor,
                  opacity: 0.2,
                  letterSpacing: "-0.02em",
                }}
                aria-hidden="true"
              >{stories[0].num}</span>
               <h3
                 className="font-bold text-foreground mb-3"
                 style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", letterSpacing: "0.05em" }}
               >{stories[0].title}</h3>
               <p
                 className="font-light leading-relaxed text-muted-foreground"
                 style={{ fontSize: "clamp(0.88rem, 1.3vw, 0.98rem)" }}
               >{stories[0].body}</p>
            </div>
          </SectionReveal>

          {/* Col 2 — texto arriba + imagen más pequeña abajo, desfasada */}
          <div className="md:col-span-4" style={{ paddingTop: "clamp(3rem, 8vw, 6rem)" }}>
          <SectionReveal delay={180} distance={20}>
            <div>
              <span
                className="block font-bold leading-none mb-3 select-none"
                style={{
                  fontSize: "clamp(3rem, 5vw, 5rem)",
                  color: stories[1].accentColor,
                  opacity: 0.2,
                  letterSpacing: "-0.02em",
                }}
                aria-hidden="true"
              >{stories[1].num}</span>
               <h3
                 className="font-bold text-foreground mb-3"
                 style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", letterSpacing: "0.05em" }}
               >{stories[1].title}</h3>
               <p
                 className="font-light leading-relaxed text-muted-foreground mb-8"
                 style={{ fontSize: "clamp(0.88rem, 1.3vw, 0.98rem)" }}
              >{stories[1].body}</p>
              <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
                <img
                  src={stories[1].img}
                  alt={stories[1].imgAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={380}
                  height={380}
                />
              </div>
            </div>
          </SectionReveal>
          </div>

          {/* Col 3 — imagen media + texto flotante encima */}
          <div className="md:col-span-4" style={{ paddingTop: "clamp(1rem, 4vw, 3rem)" }}>
          <SectionReveal delay={260} distance={20}>
            <div>
              <div className="relative overflow-hidden mb-6" style={{ aspectRatio: "4/5" }}>
                <img
                  src={stories[2].img}
                  alt={stories[2].imgAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={380}
                  height={475}
                />
                {/* Texto flotante sobre imagen */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-5"
                   style={{ background: "linear-gradient(to top, rgba(245,240,255,0.95) 0%, transparent 100%)" }}
                 >
                  <span
                    className="block font-bold leading-none mb-2 select-none"
                    style={{
                      fontSize: "clamp(2.5rem, 4vw, 4rem)",
                      color: stories[2].accentColor,
                      opacity: 0.35,
                      letterSpacing: "-0.02em",
                    }}
                    aria-hidden="true"
                  >{stories[2].num}</span>
                   <h3
                     className="font-bold text-foreground mb-2"
                     style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", letterSpacing: "0.05em" }}
                   >{stories[2].title}</h3>
                   <p
                     className="font-light leading-relaxed text-muted-foreground"
                     style={{ fontSize: "clamp(0.83rem, 1.2vw, 0.93rem)" }}
                   >{stories[2].body}</p>
                </div>
              </div>
            </div>
          </SectionReveal>
          </div>

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
                <div className="overflow-hidden mb-4" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={story.img}
                    alt={story.imgAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                 <h3 className="font-bold text-foreground mb-2" style={{ fontSize: "1.4rem", letterSpacing: "0.05em" }}>
                   {story.title}
                 </h3>
                 <p className="font-light text-muted-foreground leading-relaxed" style={{ fontSize: "0.95rem" }}>
                   {story.body}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </div>
  </section>
);

export default HistoriasHilo;
