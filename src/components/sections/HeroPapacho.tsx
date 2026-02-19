import { useEffect, useRef, useState, useCallback } from "react";
import heroKids from "@/assets/hero-kids.png";

/* ─── Brand colors for each letter ─── */
const LETTER_COLORS = [
  "#ac3c72", // Magenta
  "#f5ce3e", // Yellow
  "#ff8d6b", // Coral
  "#416ba9", // Blue
  "#c1438c", // Rose
  "#d4a92a", // Warm gold
  "#ff6b35", // Orange
  "#6b8fb5", // Soft blue
];

/* ─── Letter scatter targets (stable pseudo-random per letter) ─── */
const TEXT = "Pijamas que abrazan";

interface LetterTarget {
  char: string;
  tx: number;
  ty: number;
  tz: number;
  rot: number;
  color: string;
  floatDuration: number;
  floatDelay: number;
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
    color: char === " " ? "transparent" : LETTER_COLORS[i % LETTER_COLORS.length],
    floatDuration: 3 + (i % 3),
    floatDelay: i * 0.12,
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

  /* Reversed: letters start scattered (scatter=1), end assembled (scatter=0) */
  const scatter = 1 - progress;
  const lineScale = progress;
  /* Image starts big (~1.3) and shrinks to 1.0 */
  const imgScale = 1.3 - progress * 0.3;
  /* Float animation only visible when letters are mostly scattered */
  const showFloat = progress < 0.15;

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
        <div className="relative flex flex-col items-center">
          <img
            src={heroKids}
            alt="Niños felices en pijamas Papachoa"
            className="object-cover select-none pointer-events-none"
            style={{
              maxHeight: "50vh",
              width: "auto",
              maxWidth: "90vw",
              transform: `scale(${imgScale})`,
              transformOrigin: "center",
              transition: "transform 0.05s linear",
            }}
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

        {/* 3D Scattered Text — assembles on scroll */}
        <div
          className="mt-6 md:mt-8"
          style={{ perspective: "1000px" }}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-center leading-none select-none"
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
                    color: l.color,
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${r}deg)`,
                    whiteSpace: l.char === " " ? "pre" : "normal",
                    animation: showFloat
                      ? `heroFloat ${l.floatDuration}s ease-in-out infinite alternate ${l.floatDelay}s`
                      : "none",
                  }}
                >
                  {l.char === " " ? "\u00A0" : l.char}
                </span>
              );
            })}
          </h1>
        </div>
      </div>

      {/* Float keyframes */}
      <style>{`
        @keyframes heroFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
};

export default HeroPapacho;
