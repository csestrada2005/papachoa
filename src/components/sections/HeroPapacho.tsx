import { useEffect, useRef, useState, useCallback } from "react";
import heroKids from "@/assets/hero-kids.png";

/* ─── Brand colors ─── */
const LETTER_COLORS = [
  "#ac3c72", "#f5ce3e", "#ff8d6b", "#416ba9",
  "#c1438c", "#d4a92a", "#ff6b35", "#6b8fb5",
];

const TEXT = "Pijamas que abrazan";

interface LetterTarget {
  char: string;
  tx: number;
  ty: number;
  rot: number;
  color: string;
  floatDur: number;
  floatDelay: number;
}

/* Scatter positions spread wide around the image area */
const SEED_TARGETS: LetterTarget[] = TEXT.split("").map((char, i) => {
  const s = Math.sin(i * 47.3 + 7.1);
  const c = Math.cos(i * 31.7 + 3.9);
  const angle = (i / TEXT.length) * Math.PI * 2 + s * 0.8;
  return {
    char,
    tx: Math.cos(angle) * 550 + s * 120,
    ty: Math.sin(angle) * 380 + c * 100,
    rot: s * 45 + c * 25,
    color: char === " " ? "transparent" : LETTER_COLORS[i % LETTER_COLORS.length],
    floatDur: 3 + (i % 3),
    floatDelay: i * 0.15,
  };
});

const HeroPapacho = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    hasScrolled.current = true;
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

  /* Phase mapping */
  const imgOpacity = progress < 0.3 ? 1 : progress > 0.55 ? 0 : 1 - (progress - 0.3) / 0.25;
  const imgTranslateY = progress * -60;

  // Letters: scattered at progress=0, assemble by ~0.67
  const scatter = Math.max(0, 1 - progress * 1.5);
  const letterOpacity = 1;

  const textGlow = progress > 0.5 ? Math.min(1, (progress - 0.5) * 4) : 0;

  const showFloat = scatter > 0.85;

  return (
    <section ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ background: "hsl(var(--papachoa-cream))" }}
      >
        {/* Large centered image */}
        <div
          className="absolute inset-0 flex items-end justify-center pointer-events-none pb-0"
          style={{
            transform: `translateY(${imgTranslateY}vh)`,
            opacity: imgOpacity,
            transition: "opacity 0.05s linear",
          }}
        >
          <img
            src={heroKids}
            alt="Niños felices en pijamas Papachoa"
            className="object-cover select-none max-w-[92vw]"
            style={{ height: "80vh" }}
            loading="eager"
            draggable={false}
          />
        </div>

        {/* Scattered / assembling letters — absolutely positioned over everything */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: "800px", pointerEvents: "none" }}
        >
          <h1
            className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none select-none"
            style={{ transformStyle: "preserve-3d" }}
            aria-label={TEXT}
          >
            {SEED_TARGETS.map((l, i) => {
              const x = l.tx * scatter;
              const y = l.ty * scatter;
              const r = l.rot * scatter;
              const scale = 1 + scatter * 0.3;

              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className="inline-block will-change-transform"
                  style={{
                    color: l.color,
                    transform: `translate3d(${x}px, ${y}px, 0) rotateZ(${r}deg) scale(${scale})`,
                    opacity: letterOpacity,
                    whiteSpace: l.char === " " ? "pre" : "normal",
                    textShadow: textGlow > 0
                      ? `0 0 ${textGlow * 30}px ${l.color}40`
                      : "none",
                    animation: showFloat
                      ? `heroFloat ${l.floatDur}s ease-in-out infinite alternate ${l.floatDelay}s`
                      : "none",
                    transition: "text-shadow 0.3s ease",
                  }}
                >
                  {l.char === " " ? "\u00A0" : l.char}
                </span>
              );
            })}
          </h1>
        </div>
      </div>

      <style>{`
        @keyframes heroFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
      `}</style>
    </section>
  );
};

export default HeroPapacho;
