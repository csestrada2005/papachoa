import lifestyleImage from "@/assets/lifestyle-1.png";
import lifestyle2 from "@/assets/lifestyle-2.png";
import pajaroAzulClaro from "@/assets/brand/pajaro-azul-claro.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #filosofia — Offset editorial
   Imagen izquierda alta con imagen secundaria flotante,
   título + bullets derecha verticalmente desfasados
   ───────────────────────────────────────── */

const StarBullet = ({ text }: { text: string }) => (
  <li className="flex items-start gap-4 py-4 border-b border-border/15">
    <span
      className="flex-shrink-0 text-primary"
      style={{ fontSize: "0.7rem", lineHeight: 2.2, letterSpacing: "0.1em" }}
      aria-hidden="true"
    >
      ★
    </span>
    <span
      className="text-foreground/75 font-light leading-relaxed"
      style={{ fontSize: "clamp(0.93rem, 1.4vw, 1.02rem)" }}
    >
      {text}
    </span>
  </li>
);

const paragraphs = [
  "Apapacho viene del náhuatl. Y eso es exactamente lo que queremos lograr con cada prenda: abrazar el alma de los niños… y también la de mamá.",
  "Esto no es algo que encuentras en cualquier tienda. Nuestras pijamas tienen un propósito: dar apapachos. Que se sientan cómodos, libres, suaves, seguros. Que disfruten telas de la más alta calidad, cortes pensados para moverse y descansar, y prendas que duren mucho tiempo.",
  "Es más que una pijama. Queremos que elijas un producto comprometido con México — donde cada proceso ha sido valorado y cada persona justamente remunerada.",
  "Cada pieza es única. Cada print ha sido diseñado por Miriam y Mercedes. Y cada pieza es confeccionada con muchísimo cariño por Fer, Alondra y Lucy.",
];

const Filosofia = () => (
  <section
    id="filosofia"
    className="overflow-hidden"
    style={{
      background: "hsl(15 20% 97%)",
      paddingTop: "clamp(5rem, 10vw, 9rem)",
      paddingBottom: "clamp(5rem, 10vw, 9rem)",
    }}
  >
    <div className="container">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-0 items-start">

        {/* LEFT — imágenes apiladas / desfasadas (cols 1-5) */}
        <div className="lg:col-span-5 relative overflow-hidden" style={{ paddingBottom: "4rem" }}>
          <SectionReveal delay={40} distance={20}>
            {/* Imagen principal */}
            <div className="overflow-hidden" style={{ borderRadius: 0, marginRight: "clamp(0px, 3vw, 40px)" }}>
              <img
                src={lifestyleImage}
                alt="Bebé con cobijo Papachoa"
                className="w-full"
                style={{
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
                loading="lazy"
                decoding="async"
                width={440}
                height={586}
              />
            </div>

            {/* Imagen secundaria flotante hacia afuera derecha */}
            <div
              className="absolute overflow-hidden shadow-lg"
              style={{
                bottom: "0",
                right: "0",
                width: "clamp(110px, 24vw, 230px)",
                aspectRatio: "4/5",
                border: "4px solid white",
                zIndex: 2,
              }}
            >
              <img
                src={lifestyle2}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </SectionReveal>
        </div>

        {/* RIGHT — label + título + bullets (cols 7-12) desfasados arriba */}
        <div
          className="lg:col-span-6 lg:col-start-7"
          style={{ paddingTop: "clamp(0px, 6vw, 80px)" }}
        >
          {/* Pájaro decorativo */}
          <SectionReveal className="mb-8">
            <img
              src={pajaroAzulClaro}
              alt=""
              aria-hidden="true"
              style={{ width: "clamp(46px, 7vw, 76px)", height: "auto", opacity: 0.45 }}
              loading="lazy"
            />
          </SectionReveal>

          <SectionReveal delay={60}>
            <p
              className="font-display text-primary mb-3"
              style={{ fontSize: "clamp(1.05rem, 2vw, 1.35rem)" }}
            >
              Un par de palabras
            </p>
          </SectionReveal>

          <SectionReveal delay={120}>
            <h2
              className="font-bold text-foreground mb-10 leading-none"
              style={{
                fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)",
                letterSpacing: "clamp(0.03em, 0.5vw, 0.08em)",
              }}
            >
              Nuestra<br />filosofía
            </h2>
          </SectionReveal>

          <SectionReveal delay={200}>
            <div className="space-y-6">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-foreground/75 font-light leading-relaxed"
                  style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)", lineHeight: 1.7 }}
                >
                  {p}
                </p>
              ))}
            </div>
          </SectionReveal>
        </div>

      </div>
    </div>
  </section>
);

export default Filosofia;
