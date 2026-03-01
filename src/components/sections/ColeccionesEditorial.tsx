import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionReveal from "@/components/ui/SectionReveal";
import pijamaRosa0 from "@/assets/pijama-rosa-0-familia-azul.jpg";
import pijamaBlanca from "@/assets/pijama-blanca-1-dibujando.jpg";
import pijamaDino from "@/assets/pijama-dinosaurio-1-papa-nina.jpg";

/* ─────────────────────────────────────────
   #colecciones — Carrusel horizontal editorial
   Cards con slight rotation, color blocks sutiles,
   scroll suave con drag
   ───────────────────────────────────────── */

interface CollectionEntry {
  id: string;
  title: string;
  url: string;
  description_short: string;
  price_from: number;
  image: string;
  imageAlt: string;
  accent: string;
  rotation: string;
}

const catalogCollections: CollectionEntry[] = [
  {
    id: "flores",
    title: "Flores",
    url: "/catalogo?categoria=flores",
    description_short: "Suavidad que florece en cada abrazo.",
    price_from: 1290,
    image: pijamaRosa0,
    imageAlt: "Familia en pijamas con estampado de flores",
    accent: "hsl(var(--papachoa-coral) / 0.08)",
    rotation: "-1.5deg",
  },
  {
    id: "changos",
    title: "Changos",
    url: "/catalogo?categoria=changos",
    description_short: "Diversión salvaje para toda la familia.",
    price_from: 1390,
    image: pijamaBlanca,
    imageAlt: "Familia en pijamas con estampado de changos",
    accent: "hsl(var(--papachoa-magenta) / 0.07)",
    rotation: "0.8deg",
  },
  {
    id: "para-pintar",
    title: "Para pintar",
    url: "/catalogo?categoria=para-pintar",
    description_short: "Creatividad que se viste de arte.",
    price_from: 1290,
    image: pijamaBlanca,
    imageAlt: "Familia en pijamas para pintar",
    accent: "hsl(var(--papachoa-yellow) / 0.08)",
    rotation: "-0.6deg",
  },
  {
    id: "hongos",
    title: "Hongos",
    url: "/catalogo?categoria=hongos",
    description_short: "Magia natural en cada puntada.",
    price_from: 1490,
    image: pijamaDino,
    imageAlt: "Familia en pijamas con estampado de hongos",
    accent: "hsl(var(--papachoa-blue) / 0.08)",
    rotation: "1deg",
  },
];


const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
});

const CollectionCard = ({ col, index }: { col: CollectionEntry; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-shrink-0"
      style={{ width: "clamp(260px, 34vw, 420px)" }}
    >
      <Link
        to={col.url}
        className="group block"
        aria-label={`Ver colección ${col.title}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Color block background con rotation */}
        <div
          style={{
            background: col.accent,
            borderRadius: 0,
            padding: "clamp(12px, 2vw, 20px)",
            transform: hovered ? "rotate(0deg)" : `rotate(${col.rotation})`,
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1), background 0.3s ease",
          }}
        >
          {/* Image */}
          <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <img
              src={col.image}
              alt={col.imageAlt}
              className="w-full h-full object-cover"
              style={{
                transition: "transform 0.6s cubic-bezier(.22,1,.36,1)",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
              loading="lazy"
              decoding="async"
              width={400}
              height={533}
            />
          </div>
        </div>

        {/* Meta below card */}
        <div className="pt-5 space-y-1.5 px-1">
          <h3
            className="font-bold text-foreground tracking-wide"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              letterSpacing: "0.06em",
              transition: "color 0.2s",
              color: hovered ? "hsl(var(--primary))" : "hsl(var(--foreground))",
            }}
          >
            {col.title}
          </h3>
          <p
            className="text-muted-foreground font-light"
            style={{ fontSize: "clamp(0.84rem, 1.1vw, 0.94rem)" }}
          >
            {col.description_short}
          </p>
          <p
            className="text-foreground/50 font-light"
            style={{ fontSize: "clamp(0.8rem, 1vw, 0.86rem)", letterSpacing: "0.04em" }}
          >
            Desde {priceFormatter.format(col.price_from)}
          </p>
          <p
            className="inline-flex items-center gap-1.5 mt-2 font-body"
            style={{
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              color: "hsl(var(--foreground))",
              transition: "color 300ms ease-out",
              ...(hovered ? { color: "hsl(var(--primary))" } : {}),
            }}
          >
            Ver colección{" "}
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                transition: "transform 300ms ease-out",
                transform: hovered ? "translateX(4px)" : "translateX(0)",
              }}
            >
              →
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

const ColeccionesEditorial = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <section
      id="colecciones"
      className="overflow-hidden"
      style={{
        background: "#fff",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      {/* Intro — offset izquierda + número derecha */}
      <div className="container">
        <div className="flex items-end justify-between mb-14 gap-8">
          <div className="max-w-xl">
            <SectionReveal>
              <p
                className="font-display text-primary mb-3"
                style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
              >
                Explora
              </p>
            </SectionReveal>
            <SectionReveal delay={80}>
              <h2
                className="font-bold text-foreground leading-none"
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  letterSpacing: "clamp(0.03em, 0.5vw, 0.08em)",
                }}
              >
                Catálogo
              </h2>
            </SectionReveal>
            <SectionReveal delay={100}>
              <p
                className="text-muted-foreground font-light mt-4"
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.05rem)" }}
              >
                Piezas únicas llenas de suavidad y apapachos para hacer match con tu familia
              </p>
            </SectionReveal>
          </div>
          {/* Hint de scroll */}
          <SectionReveal delay={160}>
            <p
              className="text-muted-foreground font-light hidden md:block text-right"
              style={{ fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase", maxWidth: "160px" }}
            >
              ← Arrastra para ver más →
            </p>
          </SectionReveal>
        </div>
      </div>

      {/* Carrusel — full width con padding inicial */}
      <div
        ref={trackRef}
        className="flex gap-6 md:gap-8 overflow-x-auto pb-8 select-none"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          paddingRight: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
         {catalogCollections.map((col, i) => (
          <div key={col.id} id={col.id} style={{ scrollSnapAlign: "start" }}>
            <SectionReveal delay={i * 80} threshold={0.05}>
              <CollectionCard col={col} index={i} />
            </SectionReveal>
          </div>
        ))}

        {/* CTA card final */}
        <div className="flex-shrink-0 flex items-center" style={{ width: "clamp(180px, 24vw, 280px)" }}>
          <SectionReveal delay={260} threshold={0.05}>
            <Link
              to="/catalogo"
              className="group flex flex-col items-start gap-4"
            >
              <span
                className="font-bold text-foreground/20 leading-none"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.04em" }}
                aria-hidden="true"
              >+</span>
              <p
                className="font-medium border-b-2 border-foreground/25 pb-1 transition-all duration-300 group-hover:border-foreground/70"
                style={{ fontSize: "0.8rem", letterSpacing: "0.13em", textTransform: "uppercase" }}
              >
                Ver todo el catálogo →
              </p>
            </Link>
          </SectionReveal>
        </div>
      </div>

      {/* Coming soon */}
      <div className="container mt-10">
        <p
          className="text-muted-foreground/50 font-light text-center italic"
          style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)", letterSpacing: "0.03em" }}
        >
          Pronto habrá: Catarinas, football, perros, ski
        </p>
      </div>

    </section>
  );
};

export default ColeccionesEditorial;
