import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import SectionReveal from "@/components/ui/SectionReveal";

/* ─────────────────────────────────────────
   #apapacho — Carrusel horizontal infinito con auto-scroll
   Cards expandibles al hover, auto-play con pausa al interactuar
   ───────────────────────────────────────── */

const items = [
  {
    label: "Calma",
    description: "Para que tu bebé duerma tranquilo toda la noche. Telas que respiran y abrazan sin apretar.",
    href: "/catalogo?categoria=mama-bebe",
    icon: "🌙",
    num: "01",
    bg: "hsl(var(--papachoa-blue) / 0.06)",
    accent: "hsl(var(--papachoa-blue))",
  },
  {
    label: "Ternura",
    description: "El primer regalo que importa. Suavidad diseñada para piel recién nacida.",
    href: "/catalogo?categoria=mama-bebe",
    icon: "🤱",
    num: "02",
    bg: "hsl(var(--papachoa-coral) / 0.07)",
    accent: "hsl(var(--papachoa-coral))",
  },
  {
    label: "Conexión",
    description: "Vestirse iguales en familia. Esos momentos que el corazón archiva para siempre.",
    href: "/catalogo?categoria=mama-hija",
    icon: "👨‍👩‍👧",
    num: "03",
    bg: "hsl(var(--papachoa-magenta) / 0.07)",
    accent: "hsl(var(--papachoa-magenta))",
  },
  {
    label: "Regalar amor",
    description: "El regalo que emociona de verdad. Un Papachoa dice más que cualquier tarjeta.",
    href: "/catalogo",
    icon: "🎁",
    num: "04",
    bg: "hsl(var(--papachoa-yellow) / 0.12)",
    accent: "hsl(var(--papachoa-yellow))",
  },
];

// Triplicamos items para scroll infinito sin saltos
const INFINITE_ITEMS = [...items, ...items, ...items];
const CARD_COUNT = items.length;

const ApaCard = ({
  item,
  isActive,
}: {
  item: typeof items[0];
  isActive: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const open = hovered || isActive;

  return (
    <Link
      to={item.href}
      className="block flex-shrink-0"
      style={{
        width: open
          ? "clamp(220px, 28vw, 360px)"
          : "clamp(130px, 17vw, 195px)",
        transition: "width 0.5s cubic-bezier(.22,1,.36,1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Explorar: ${item.label}`}
    >
      <div
        className="relative overflow-hidden"
        style={{
          background: item.bg,
          padding: "clamp(1.4rem, 3vw, 2.4rem)",
          minHeight: "clamp(240px, 36vw, 420px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          transition: "background 0.4s ease",
        }}
      >
        {/* Número decorativo */}
        <span
          className="block font-bold leading-none select-none"
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
            color: item.accent,
            opacity: open ? 0.32 : 0.12,
            letterSpacing: "-0.03em",
            transition: "opacity 0.4s ease",
          }}
          aria-hidden="true"
        >
          {item.num}
        </span>

        {/* Icono */}
        <span
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            display: "block",
            transition: "transform 0.4s cubic-bezier(.22,1,.36,1)",
            transform: open ? "scale(1.15)" : "scale(1)",
          }}
          aria-hidden="true"
        >
          {item.icon}
        </span>

        {/* Título + descripción */}
        <div>
          <h3
            className="font-bold text-foreground"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.4rem)",
              letterSpacing: "0.04em",
              marginBottom: open ? "0.7rem" : "0",
              transition: "margin 0.4s ease",
            }}
          >
            {item.label}
          </h3>

          <div
            style={{
              maxHeight: open ? "120px" : "0px",
              overflow: "hidden",
              opacity: open ? 1 : 0,
              transition:
                "max-height 0.5s cubic-bezier(.22,1,.36,1), opacity 0.35s ease",
            }}
          >
            <p
              className="text-muted-foreground font-light leading-relaxed"
              style={{
                fontSize: "clamp(0.84rem, 1.2vw, 0.95rem)",
                paddingTop: "0.2rem",
              }}
            >
              {item.description}
            </p>
            <p
              className="mt-3 inline-flex items-center gap-1 border-b border-foreground/30 pb-0.5"
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              Ver más →
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ApatachoItems = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const userInteracting = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const blockWidthRef = useRef(0);        // cached to avoid DOM reads every frame
  const cardWidthRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const initialized = useRef(false);

  // Measure and cache card + block width — also re-runs on resize
  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-card]");
    if (!first) return;
    // gap-3 = 12px, gap-4 = 16px — compute real gap from computed style
    const gap = parseFloat(getComputedStyle(el).gap) || 12;
    const cw = first.offsetWidth + gap;
    cardWidthRef.current = cw;
    blockWidthRef.current = cw * CARD_COUNT;
    if (!initialized.current) {
      el.scrollLeft = blockWidthRef.current; // start at middle block
      initialized.current = true;
    }
  }, []);

  // ResizeObserver so remeasure happens after layout, not on a blind rAF
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure(); // initial measure
    return () => ro.disconnect();
  }, [measure]);

  // Scroll loop — reads from cached values, no DOM touches per frame
  const loopScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || blockWidthRef.current === 0) return;
    const bw = blockWidthRef.current;
    if (el.scrollLeft >= bw * 2) {
      el.scrollLeft -= bw;
    } else if (el.scrollLeft < bw * 0.25) {
      el.scrollLeft += bw;
    }
  }, []);

  // rAF auto-scroll — uses timestamp delta for frame-rate-independent speed
  const prevTs = useRef<number>(0);
  const autoScroll = useCallback((ts: number) => {
    const el = trackRef.current;
    if (!el) { rafRef.current = requestAnimationFrame(autoScroll); return; }

    if (!userInteracting.current && blockWidthRef.current > 0) {
      const delta = prevTs.current ? ts - prevTs.current : 16;
      const speed = 40; // px per second
      el.scrollLeft += (speed * delta) / 1000;
      loopScroll();

      // Update active dot — throttled via integer comparison
      const bw = blockWidthRef.current;
      const cw = cardWidthRef.current;
      const normalized = ((el.scrollLeft % bw) + bw) % bw;
      const idx = Math.floor(normalized / cw + 0.5) % CARD_COUNT;
      setActiveIndex((prev) => (prev !== idx ? idx : prev));
    }
    prevTs.current = ts;
    rafRef.current = requestAnimationFrame(autoScroll);
  }, [loopScroll]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(autoScroll);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [autoScroll]);

  // Pausa al interactuar, reanuda después de 2s
  const pauseAuto = () => {
    userInteracting.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      userInteracting.current = false;
    }, 2000);
  };

  // Drag handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = "grabbing";
    pauseAuto();
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.3;
    loopScroll();
  };

  // Touch handlers
  const touchStartX = useRef(0);
  const touchScrollLeft = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    touchStartX.current = e.touches[0].pageX;
    touchScrollLeft.current = trackRef.current.scrollLeft;
    pauseAuto();
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const dx = touchStartX.current - e.touches[0].pageX;
    trackRef.current.scrollLeft = touchScrollLeft.current + dx;
    loopScroll();
  };

  return (
    <section
      id="apapacho"
      className="overflow-hidden"
      style={{
        background: "#fff",
        paddingTop: "clamp(5rem, 10vw, 9rem)",
        paddingBottom: "clamp(5rem, 10vw, 9rem)",
      }}
    >
      {/* Header */}
      <div className="container mb-12">
        <div className="flex items-end gap-6 flex-wrap">
          <div>
            <SectionReveal>
              <p
                className="font-display text-primary mb-3"
                style={{ fontSize: "clamp(1.05rem, 2vw, 1.3rem)" }}
              >
                Encuentra el tuyo
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
                ¿Qué apapacho
                <br />
                necesitas?
              </h2>
            </SectionReveal>
          </div>
          <SectionReveal delay={120} className="self-end pb-1">
            <img
              src={pajaroNaranja}
              alt=""
              aria-hidden="true"
              style={{
                width: "clamp(40px, 6vw, 72px)",
                height: "auto",
                opacity: 0.5,
              }}
              loading="lazy"
            />
          </SectionReveal>
        </div>
        <SectionReveal delay={160}>
          <p
            className="text-muted-foreground font-light mt-4 italic"
            style={{
              fontSize: "clamp(0.83rem, 1.2vw, 0.96rem)",
              letterSpacing: "0.04em",
            }}
          >
            Pasa el cursor para descubrir · Arrastra para navegar
          </p>
        </SectionReveal>
      </div>

      {/* Carrusel infinito */}
      <div
        ref={trackRef}
        className="flex gap-3 md:gap-4 overflow-x-auto pb-2 select-none"
        style={{
          paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          paddingRight: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "grab",
          alignItems: "stretch",
          /* Sin scroll-snap para que el auto-scroll sea suave */
        }}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onScroll={loopScroll}
      >
        {INFINITE_ITEMS.map((item, idx) => (
          <div key={`${item.label}-${idx}`} data-card style={{ display: "flex" }}>
            <ApaCard
              item={item}
              isActive={idx % CARD_COUNT === activeIndex}
            />
          </div>
        ))}
      </div>

      {/* Dots indicadores */}
      <div className="container mt-8 flex gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a ${items[i].label}`}
            onClick={() => {
              const el = trackRef.current;
              if (!el || !blockWidthRef.current) return;
              el.scrollLeft = blockWidthRef.current + cardWidthRef.current * i;
              pauseAuto();
            }}
            style={{
              width: activeIndex === i ? "2rem" : "0.5rem",
              height: "0.5rem",
              borderRadius: "9999px",
              background:
                activeIndex === i
                  ? "hsl(var(--primary))"
                  : "hsl(var(--foreground) / 0.15)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ApatachoItems;
