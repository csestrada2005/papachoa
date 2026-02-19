import lifestyleImage from "@/assets/lifestyle-1.png";
import pajaroAzulClaro from "@/assets/brand/pajaro-azul-claro.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #filosofia — "Nuestra filosofía"
   Elena "A Few Words About My Qualifications" pattern:
   Eye icon + title + star-bulleted list, 2-col with image
   ───────────────────────────────────────── */

const StarBullet = ({ text }: { text: string }) => (
  <li className="flex items-start gap-4">
    <span
      className="flex-shrink-0 mt-0.5 text-primary"
      style={{ fontSize: "1.1rem", lineHeight: 1.6 }}
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

const bullets = [
  "Cada prenda es cosida a mano en talleres locales bajo principios de comercio justo.",
  "Usamos telas ultra suaves, libres de químicos agresivos, aptas para piel de bebé.",
  "Diseñadas para verse iguales en toda la familia — del recién nacido al papá.",
  "Sin fast-fashion. Producimos por colecciones limitadas, con intención.",
  "El nombre de cada pieza viene de un pájaro mexicano. Es nuestra firma.",
];

const Filosofia = () => (
  <section
    id="filosofia"
    className="py-28 md:py-40 overflow-hidden"
    style={{ background: "hsl(15 20% 97%)" }}
  >
    <div className="container">

      {/* Decorative bird — like Elena's Eye icon */}
      <SectionReveal className="flex justify-start mb-14">
        <img
          src={pajaroAzulClaro}
          alt=""
          aria-hidden="true"
          style={{ width: "clamp(60px, 9vw, 100px)", height: "auto", opacity: 0.55 }}
          loading="lazy"
        />
      </SectionReveal>

      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

        {/* Left — title + bullets */}
        <div>
          <SectionReveal>
            <p
              className="font-display text-primary mb-4"
              style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}
            >
              Un par de palabras
            </p>
          </SectionReveal>

          <SectionReveal delay={80}>
            <h2
              className="font-bold text-foreground mb-10"
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                letterSpacing: "clamp(0.04em, 0.6vw, 0.1em)",
                lineHeight: 1.1,
              }}
            >
              Nuestra filosofía
            </h2>
          </SectionReveal>

          <SectionReveal delay={160}>
            <ul className="space-y-5">
              {bullets.map((b, i) => (
                <StarBullet key={i} text={b} />
              ))}
            </ul>
          </SectionReveal>
        </div>

        {/* Right — editorial image */}
        <SectionReveal delay={240} distance={20} className="lg:pt-6">
          <div className="overflow-hidden">
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
              width={480}
              height={640}
            />
          </div>
        </SectionReveal>

      </div>
    </div>
  </section>
);

export default Filosofia;
