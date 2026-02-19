import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-mama-hija.png";
import printPapachoa from "@/assets/brand/print-papachoa.png";
import papachoaLogo from "@/assets/brand/papachoa-logo.png";

const TEXT = "Pijamas que abrazan";

/* Brand palette cycling per letter */
const LETTER_COLORS = ["#ac3c72", "#f5ce3e", "#ff8d6b", "#416ba9"];

interface LetterScatter {
  char: string;
  tx: number;  // vw
  ty: number;  // vh
  tz: number;  // vw
  rot: number; // deg
}

interface WordData {
  letters: LetterScatter[];
}

/* Manually craft scatter so letters cross over each other dramatically */
const SCATTER_MAP: Record<number, { tx: number; ty: number; tz: number; rot: number }> = {
  // P - push far right
  0:  { tx:   8, ty: 12, tz: -20, rot:  35 },
  1:  { tx:   4, ty: 18, tz: -10, rot: -25 },
  2:  { tx:  10, ty:  8, tz: -25, rot:  40 },
  3:  { tx: -10, ty: 14, tz: -15, rot: -30 },
  4:  { tx:  -7, ty: 20, tz: -18, rot:  20 },
  5:  { tx:   6, ty: 16, tz: -12, rot: -35 },
  6:  { tx: -16, ty: 10, tz: -22, rot:  30 },
  7:  { tx:   5, ty: 22, tz: -14, rot: -20 },
  8:  { tx: -14, ty: 14, tz: -20, rot:  25 },
  9:  { tx: -12, ty: 18, tz: -16, rot: -40 },
  10: { tx:   9, ty: 10, tz: -24, rot:  30 },
  11: { tx: -18, ty: 16, tz: -18, rot: -35 },
  12: { tx:   3, ty: 20, tz: -12, rot:  25 },
  13: { tx: -13, ty: 12, tz: -20, rot: -30 },
  14: { tx:   7, ty: 22, tz: -26, rot:  40 },
  15: { tx: -15, ty:  8, tz: -15, rot: -25 },
  16: { tx:   0, ty: 18, tz: -20, rot:  35 },
};

const WORDS: WordData[] = (() => {
  const words = TEXT.split(" ");
  let globalIdx = 0;
  return words.map((word) => ({
    letters: word.split("").map((char) => {
      const i = globalIdx++;
      const scatter = SCATTER_MAP[i] ?? { tx: 0, ty: 15, tz: -15, rot: 20 };
      return { char, ...scatter };
    }),
  }));
})();

const HeroPapacho = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  /* Expanding line on mount */
  useEffect(() => {
    const timer = setTimeout(() => setLineVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /* Scroll progress */
  const onScroll = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const scrollable = el.offsetHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const raw = -rect.top / scrollable;
    // Animation completes at 50% scroll (250vh of 500vh), rest is for logo + overlap
    const capped = Math.min(raw / 0.5, 1);
    setProgress(Math.max(0, Math.min(1, capped)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  /* Mouse parallax */
  const onMouseMove = useCallback((e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x: nx, y: ny });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  const p = 1 - progress;
  // Image slides upward as user scrolls (no fade, just translate)
  const imgSlide = Math.min(progress / 0.6, 1); // image exits by 60% scroll
  const imgShift = `translate3d(${mouse.x * -6}px, ${mouse.y * -6 + imgSlide * -120}vh, 0)`;
  const textShift = `translate3d(${mouse.x * 8}px, ${mouse.y * 8}px, 0)`;

  // Logo fade-in between 60%-90% scroll
  const logoOpacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.3));
  const logoTranslateY = (1 - logoOpacity) * 20;

  return (
    <section ref={sectionRef} style={{ height: "500vh", position: "relative", zIndex: 1 }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(15 20% 96%)",
          zIndex: 1,
        }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${printPapachoa})`,
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
            opacity: 0.04,
          }}
        />

        {/* Image with parallax — slides up and out */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{
            transform: imgShift,
            transition: "transform 0.15s ease-out",
          }}
        >
          <img
            src={heroImage}
            alt="Niños felices en pijamas Papachoa"
            className="object-cover object-top select-none max-h-[90vh] w-auto"
            style={{ filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.15))" }}
            loading="eager"
            draggable={false}
          />
        </div>

        {/* Scattered → assembled typography — stays centered */}
        <div
          className="absolute z-20 inset-0 flex flex-col items-center justify-center"
          style={{
            perspective: "1000px",
            transform: textShift,
            transition: "transform 0.15s ease-out",
          }}
        >
          <h1
            className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none select-none text-center"
            style={{ transformStyle: "preserve-3d" }}
            aria-label={TEXT}
          >
            {WORDS.map((word, wi) => (
              <span key={wi} className="inline-block">
                <span className="inline-block whitespace-nowrap">
                  {word.letters.map((l, li) => (
                    <span
                      key={li}
                      aria-hidden="true"
                      className="inline-block will-change-transform"
                      style={{
                        color: LETTER_COLORS[(wi * 10 + li) % LETTER_COLORS.length],
                        transform: `translate3d(${l.tx * p}vw, ${l.ty * p}vh, ${l.tz * p}vw) rotateZ(${l.rot * p}deg)`,
                        transition: "transform 0.05s linear",
                      }}
                    >
                      {l.char}
                    </span>
                  ))}
                </span>
                {wi < WORDS.length - 1 && (
                  <span className="inline-block w-[0.3em]">{"\u00A0"}</span>
                )}
              </span>
            ))}
          </h1>
          <div
            className="flex justify-center mt-4"
            style={{
              opacity: logoOpacity,
              transform: `translateY(${logoTranslateY}px)`,
              transition: "opacity 0.2s linear, transform 0.2s ease-out",
            }}
          >
            <img
              src={papachoaLogo}
              alt="Papachoa"
              className="w-[360px] select-none"
              draggable={false}
            />
          </div>
          <button
            onClick={() => navigate("/catalogo")}
            className="mt-6 px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-base tracking-wide shadow-lg hover:opacity-90 transition-opacity"
            style={{
              opacity: logoOpacity,
              transform: `translateY(${logoTranslateY}px)`,
              transition: "opacity 0.2s linear, transform 0.2s ease-out",
            }}
          >
            Ver Catálogo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroPapacho;
