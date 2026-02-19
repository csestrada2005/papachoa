import { Link } from "react-router-dom";
import pijamaDino from "@/assets/pijama-dinosaurio-1-papa-nina.jpg";
import pijamaRosa from "@/assets/pijama-rosa-2-ternura.jpg";
import pijamaBlanca from "@/assets/pijama-blanca-1-dibujando.jpg";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #colecciones — "Nuestras colecciones"
   Elena editorial pattern: text intro + 3 highlights
   No carousel/grid (that's a separate section)
   ───────────────────────────────────────── */

const highlights = [
  {
    name: "Papá & Hija",
    line: "Complicidad en cada detalle.",
    href: "/catalogo?categoria=papa-hija",
    img: pijamaDino,
  },
  {
    name: "Mamá & Hija",
    line: "Momentos iguales, recuerdos eternos.",
    href: "/catalogo?categoria=mama-hija",
    img: pijamaRosa,
  },
  {
    name: "Bebé",
    line: "Suavidad desde el primer abrazo.",
    href: "/catalogo?categoria=mama-bebe",
    img: pijamaBlanca,
  },
];

const ColeccionesEditorial = () => (
  <section
    id="colecciones"
    className="py-28 md:py-40 overflow-hidden"
    style={{ background: "#fff" }}
  >
    <div className="container">

      {/* Intro block */}
      <div className="max-w-xl mb-20">
        <SectionReveal>
          <p
            className="font-display text-primary mb-4"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}
          >
            Explora
          </p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="font-bold text-foreground mb-6"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
              letterSpacing: "clamp(0.04em, 0.7vw, 0.12em)",
              lineHeight: 1.1,
            }}
          >
            Nuestras colecciones
          </h2>
        </SectionReveal>

        <SectionReveal delay={140}>
          <p
            className="text-muted-foreground font-light leading-relaxed"
            style={{ fontSize: "clamp(0.97rem, 1.5vw, 1.08rem)" }}
          >
            Cada colección nace de una historia de familia.
            Diseñadas para verse iguales, para dormir mejor,
            para recordar siempre.
          </p>
        </SectionReveal>
      </div>

      {/* 3 editorial highlights */}
      <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-16">
        {highlights.map((col, i) => (
          <SectionReveal key={col.name} delay={i * 100}>
            <Link
              to={col.href}
              className="group block"
              aria-label={`Ver colección ${col.name}`}
            >
              {/* Image — no border-radius, Elena style */}
              <div className="overflow-hidden mb-6">
                <img
                  src={col.img}
                  alt={col.name}
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                  style={{
                    aspectRatio: "3/4",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                  decoding="async"
                  width={360}
                  height={480}
                />
              </div>

              {/* Caption */}
              <p
                className="font-bold text-foreground mb-1 tracking-wide transition-colors duration-200 group-hover:text-primary"
                style={{
                  fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
                  letterSpacing: "0.07em",
                }}
              >
                {col.name}
              </p>
              <p
                className="text-muted-foreground font-light"
                style={{ fontSize: "clamp(0.85rem, 1.2vw, 0.97rem)" }}
              >
                {col.line}
              </p>
              <p
                className="mt-2 inline-flex items-center gap-1.5 text-foreground border-b border-foreground/20 pb-0.5 transition-all duration-200 group-hover:border-foreground/60 group-hover:gap-2.5"
                style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                Ver colección <span aria-hidden="true">→</span>
              </p>
            </Link>
          </SectionReveal>
        ))}
      </div>

      {/* Link to full catalog */}
      <SectionReveal delay={200}>
        <div className="flex justify-start">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 font-medium border-b-2 border-foreground pb-0.5 transition-all duration-200 hover:gap-3"
            style={{
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "hsl(var(--foreground))",
            }}
          >
            Ver catálogo completo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </SectionReveal>

    </div>
  </section>
);

export default ColeccionesEditorial;
