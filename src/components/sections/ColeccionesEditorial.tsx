import { Link } from "react-router-dom";
import SectionReveal from "@/components/ui/SectionReveal";
import pijamaRosa from "@/assets/pijama-rosa-2-ternura.jpg";
import pijamaRosa0 from "@/assets/pijama-rosa-0-familia-azul.jpg";
import pijamaBlanca from "@/assets/pijama-blanca-1-dibujando.jpg";
import pijamaDino from "@/assets/pijama-dinosaurio-1-papa-nina.jpg";

/* ─────────────────────────────────────────
   #colecciones — Editorial collection grid
   Elena pattern: big image + title + 1-liner + price + link
   No ecommerce vibes. Pure editorial.
   ───────────────────────────────────────── */

interface CollectionEntry {
  id: string;
  title: string;
  url: string;
  description_short: string;
  price_from: number;
  image: string;
  imageAlt: string;
}

const catalogCollections: CollectionEntry[] = [
  {
    id: "mama-bebe",
    title: "Mamá & Hijos",
    url: "/catalogo?categoria=mama-bebe",
    description_short: "Suavidad desde el primer abrazo.",
    price_from: 1290,
    image: pijamaRosa0,
    imageAlt: "Mamá y bebé en pijamas iguales",
  },
  {
    id: "mama-hija",
    title: "Mamá & Hija",
    url: "/catalogo?categoria=mama-hija",
    description_short: "Momentos iguales, recuerdos eternos.",
    price_from: 1390,
    image: pijamaBlanca,
    imageAlt: "Mamá e hija dibujando juntas en pijamas",
  },
  {
    id: "papa-hija",
    title: "Papá & Hija",
    url: "/catalogo?categoria=papa-hija",
    description_short: "Complicidad en cada detalle.",
    price_from: 1490,
    image: pijamaDino,
    imageAlt: "Papá y su hija en pijamas de dinosaurio",
  },
];

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
});

const CollectionCard = ({ col, index }: { col: CollectionEntry; index: number }) => (
  <SectionReveal delay={index * 90} threshold={0.08}>
    <Link
      to={col.url}
      className="group block"
      aria-label={`Ver colección ${col.title}`}
    >
      {/* Image — 4:5 ratio, no border-radius, Elena style */}
      <div
        className="overflow-hidden mb-5"
        style={{ aspectRatio: "4/5" }}
      >
        <img
          src={col.image}
          alt={col.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
          width={480}
          height={600}
        />
      </div>

      {/* Meta */}
      <div className="space-y-1.5">
        {/* Title */}
        <h3
          className="font-bold text-foreground tracking-wide transition-colors duration-200 group-hover:text-primary"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
            letterSpacing: "0.06em",
          }}
        >
          {col.title}
        </h3>

        {/* 1-liner */}
        <p
          className="text-muted-foreground font-light leading-snug"
          style={{ fontSize: "clamp(0.84rem, 1.1vw, 0.94rem)" }}
        >
          {col.description_short}
        </p>

        {/* Price from */}
        <p
          className="text-foreground/60 font-light"
          style={{ fontSize: "clamp(0.8rem, 1vw, 0.88rem)", letterSpacing: "0.04em" }}
        >
          Desde {priceFormatter.format(col.price_from)}
        </p>

        {/* CTA link — thin underline, Elena style */}
        <p
          className="inline-flex items-center gap-1.5 border-b border-foreground/25 pb-0.5
            transition-all duration-300 group-hover:border-foreground/70 group-hover:gap-2.5"
          style={{
            fontSize: "0.76rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "hsl(var(--foreground))",
            marginTop: "8px",
          }}
        >
          Ver colección <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  </SectionReveal>
);

const ColeccionesEditorial = () => (
  <section
    id="colecciones"
    className="py-28 md:py-40 overflow-hidden"
    style={{ background: "#fff" }}
  >
    <div className="container">

      {/* ── Section intro — Elena-style block ── */}
      <div className="max-w-xl mb-20">
        <SectionReveal>
          <p
            className="font-display text-primary mb-4"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
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
              lineHeight: 1.08,
            }}
          >
            Nuestras<br />colecciones
          </h2>
        </SectionReveal>

        <SectionReveal delay={150}>
          <p
            className="text-muted-foreground font-light leading-relaxed"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.06rem)" }}
          >
            Cada colección nace de un vínculo de familia.
            Diseñadas para verse iguales, dormir mejor
            y recordar siempre.
          </p>
        </SectionReveal>
      </div>

      {/* ── 3-col editorial grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16 mb-16">
        {catalogCollections.map((col, i) => (
          <CollectionCard key={col.id} col={col} index={i} />
        ))}
      </div>

      {/* ── Bottom CTA — see full catalog ── */}
      <SectionReveal delay={120}>
        <div className="flex justify-start">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 font-medium border-b-2 border-foreground/30 pb-0.5
              transition-all duration-300 hover:gap-3 hover:border-foreground/80"
            style={{
              fontSize: "clamp(0.82rem, 1.2vw, 0.96rem)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "hsl(var(--foreground))",
            }}
          >
            Ver todo el catálogo <span aria-hidden="true">→</span>
          </Link>
        </div>
      </SectionReveal>

    </div>
  </section>
);

export default ColeccionesEditorial;
