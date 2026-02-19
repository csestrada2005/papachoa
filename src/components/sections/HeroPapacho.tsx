import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import heroKids from "@/assets/hero-kids.png";

/* ─── Letter scatter targets (stable pseudo-random per letter) ─── */
const TEXT = "Pijamas que abrazan";

interface LetterTarget {
  char: string;
  tx: number;
  ty: number;
  tz: number;
  rot: number;
}

const SEED_TARGETS: LetterTarget[] = TEXT.split("").map((char, i) => {
  const s = Math.sin(i * 47.3 + 7.1);
  const c = Math.cos(i * 31.7 + 3.9);
  return {
    char,
    tx: s * 340 + c * 160,
    ty: c * 200 + Math.sin(i * 13.1) * 140,
    tz: Math.sin(i * 23.7) * 450,
    rot: s * 40 + c * 25,
  };
});

const HeroPapacho = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const raw = -rect.top / scrollable;
    setProgress(Math.max(0, Math.min(1, raw)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const lineScale = progress;
  const scatter = progress;
  const contentOpacity = Math.max(0, 1 - Math.max(0, (progress - 0.7) / 0.3));

  return (
    <section ref={sectionRef} className="relative" style={{ height: "200vh" }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
        style={{
          background: "hsl(var(--papachoa-cream))",
          perspective: "1000px",
        }}
      >
        {/* Image + Line */}
        <div
          className="relative flex flex-col items-center"
          style={{ opacity: contentOpacity }}
        >
          <img
            src={heroKids}
            alt="Niños felices en pijamas Papachoa"
            className="object-cover select-none pointer-events-none"
            style={{ maxHeight: "50vh", width: "auto", maxWidth: "90vw" }}
            loading="eager"
            draggable={false}
          />
          {/* Expanding line flush with image bottom */}
          <div
            className="w-full"
            style={{
              height: "3px",
              background: "hsl(var(--primary))",
              transformOrigin: "center",
              transform: `scaleX(${lineScale})`,
            }}
          />
        </div>

        {/* 3D Scattered Text */}
        <div
          className="mt-6 md:mt-8"
          style={{ perspective: "1000px", opacity: contentOpacity }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground text-center leading-none select-none"
            style={{ transformStyle: "preserve-3d" }}
            aria-label={TEXT}
          >
            {SEED_TARGETS.map((l, i) => {
              const x = l.tx * scatter;
              const y = l.ty * scatter;
              const z = l.tz * scatter;
              const r = l.rot * scatter;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className="inline-block will-change-transform"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${r}deg)`,
                    whiteSpace: l.char === " " ? "pre" : "normal",
                  }}
                >
                  {l.char === " " ? "\u00A0" : l.char}
                </span>
              );
            })}
          </h1>
        </div>

        {/* Subtitle + CTA */}
        <div
          className="mt-6 flex flex-col items-center gap-4"
          style={{
            opacity: Math.max(0, 1 - progress * 4),
            transform: `translateY(${progress * 30}px)`,
            pointerEvents: progress < 0.15 ? "auto" : "none",
          }}
        >
          <p className="text-muted-foreground text-base md:text-lg text-center max-w-md font-light leading-relaxed">
            Suaves, cálidos y con magia de hogar.
            <br />
            Hechos en México con amor.
          </p>
          <Link to="/catalogo" className="btn-artisan inline-flex text-sm px-8 py-3">
            Ver colección <span className="text-lg">→</span>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          style={{ opacity: Math.max(0, 1 - progress * 5) }}
        >
          <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60 font-medium">
            scroll
          </span>
          <div className="w-px h-6 bg-muted-foreground/30 animate-float-gentle" />
        </div>
      </div>
    </section>
  );
};

export default HeroPapacho;
