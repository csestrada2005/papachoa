import { Link } from "react-router-dom";
import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #apapacho — "¿Qué apapacho necesitas?"
   Elena "I work with the following issues" pattern:
   headline + "click to learn more" + editorial list
   ───────────────────────────────────────── */

const items = [
  {
    label: "Calma",
    description: "Para que tu bebé duerma tranquilo toda la noche. Telas que respiran y abrazan sin apretar.",
    href: "/catalogo?categoria=mama-bebe",
    icon: "🌙",
  },
  {
    label: "Ternura",
    description: "El primer regalo que importa. Suavidad diseñada para piel recién nacida.",
    href: "/catalogo?categoria=mama-bebe",
    icon: "🤱",
  },
  {
    label: "Conexión",
    description: "Vestirse iguales en familia. Esos momentos que el corazón archiva para siempre.",
    href: "/catalogo?categoria=mama-hija",
    icon: "👨‍👩‍👧",
  },
  {
    label: "Regalar amor",
    description: "El regalo que emociona de verdad. Un Papachoa dice más que cualquier tarjeta.",
    href: "/catalogo",
    icon: "🎁",
  },
];

const ApatachoItems = () => (
  <section
    id="apapacho"
    className="py-28 md:py-40 overflow-hidden"
    style={{ background: "hsl(15 20% 97%)" }}
  >
    <div className="container">

      {/* Decorative bird — like Elena's Books image */}
      <div className="flex justify-end mb-12">
        <SectionReveal>
          <img
            src={pajaroNaranja}
            alt=""
            aria-hidden="true"
            style={{ width: "clamp(55px, 8vw, 90px)", height: "auto", opacity: 0.45 }}
            loading="lazy"
          />
        </SectionReveal>
      </div>

      <div className="max-w-3xl">
        <SectionReveal>
          <p
            className="font-display text-primary mb-4"
            style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)" }}
          >
            Encuentra el tuyo
          </p>
        </SectionReveal>

        <SectionReveal delay={80}>
          <h2
            className="font-bold text-foreground mb-3"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              letterSpacing: "clamp(0.03em, 0.5vw, 0.09em)",
              lineHeight: 1.1,
            }}
          >
            ¿Qué apapacho necesitas?
          </h2>
        </SectionReveal>

        {/* Elena's "Click to learn more" */}
        <SectionReveal delay={140}>
          <p
            className="text-muted-foreground font-light mb-14"
            style={{
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              letterSpacing: "0.05em",
              fontStyle: "italic",
            }}
          >
            Haz clic para descubrir
          </p>
        </SectionReveal>

        {/* Editorial list — like Elena's issues list */}
        <div className="space-y-0 divide-y divide-border/20">
          {items.map((item, i) => (
            <SectionReveal key={item.label} delay={160 + i * 90}>
              <Link
                to={item.href}
                className="group flex items-start gap-6 py-8 transition-colors duration-200 hover:text-primary"
              >
                {/* Number */}
                <span
                  className="flex-shrink-0 font-bold text-foreground/10 group-hover:text-primary/15 transition-colors duration-300"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 4rem)",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                    minWidth: "clamp(48px, 6vw, 80px)",
                  }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span aria-hidden="true" style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                    <h3
                      className="font-bold text-foreground group-hover:text-primary transition-colors duration-200"
                      style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.label}
                    </h3>
                  </div>
                  <p
                    className="text-muted-foreground font-light leading-relaxed"
                    style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)", maxWidth: "420px" }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className="flex-shrink-0 self-center text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 text-xl"
                  aria-hidden="true"
                >
                  →
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ApatachoItems;
