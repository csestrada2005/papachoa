// Optimized: removed printPapachoa (1MB) — replaced with inline SVG grain
import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-mama-hija.png";
import papachoaLogo from "@/assets/brand/papachoa-logo-nuevo.png";
import birdYellow from "@/assets/brand/pajaro-amarillo-sf.png";
import birdBlue from "@/assets/brand/pajaro-azul-claro-sf.png";
import birdOrange from "@/assets/brand/pajaro-naranja-sf.png";

const TEXT = "Pensado por mamás para mamás";

/* Brand palette cycling per letter */
const LETTER_COLORS = ["#416ba9"];

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
  17: { tx:  11, ty: 14, tz: -16, rot: -30 },
  18: { tx:  -9, ty: 20, tz: -22, rot:  25 },
  19: { tx:   6, ty: 10, tz: -18, rot: -35 },
  20: { tx: -11, ty: 16, tz: -14, rot:  40 },
  21: { tx:   8, ty: 22, tz: -20, rot: -20 },
  22: { tx: -14, ty: 12, tz: -24, rot:  30 },
  23: { tx:   3, ty: 18, tz: -16, rot: -25 },
  24: { tx:  -6, ty: 14, tz: -20, rot:  35 },
  25: { tx:  12, ty: 20, tz: -18, rot: -40 },
  26: { tx:  -8, ty: 10, tz: -22, rot:  30 },
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

const BIRDS = [
  { src: birdYellow, alt: "Pajarito amarillo", style: { top: "8%", left: "6%", width: 100 }, delay: "0s" },
  { src: birdBlue, alt: "Pajarito azul", style: { top: "18%", right: "5%", width: 110 }, delay: "1.2s" },
  { src: birdOrange, alt: "Pajarito naranja", style: { bottom: "14%", left: "8%", width: 90 }, delay: "2.1s" },
];

const HeroPapacho = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

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

  /* IntersectionObserver — hero shrink on exit */
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setExiting(!entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
    <section ref={sectionRef} style={{ height: "350vh", position: "relative", zIndex: 0 }}>
      <div
        ref={stickyRef}
        className={exiting ? "hero-exiting" : ""}
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
          zIndex: 0,
          transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
        }}
      >
        {/* Subtle grain texture via CSS — no image request */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "150px",
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
            alt="Familia feliz con pijamas Papachoa hechos en México"
            className="object-cover object-top select-none max-h-[90vh] w-auto"
            style={{ filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.15))", imageRendering: "auto", objectFit: "cover" }}
            loading="eager"
            // @ts-expect-error fetchpriority is valid HTML but not yet in React types
            fetchpriority="high"
            draggable={false}
            width={800}
            height={900}
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
            className="relative text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none select-none text-center"
            style={{ transformStyle: "preserve-3d", minHeight: "1em", maxWidth: "95vw" }}
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
              className="w-48 select-none"
              draggable={false}
            />
          </div>
          {/* Tagline — fade-in + slide-up after logo appears */}
          <p
            className="mt-4 text-xl md:text-2xl font-bold text-center select-none"
            style={{
              fontFamily: "'Lato', sans-serif",
              color: "#000000",
              opacity: Math.max(0, Math.min(1, (logoOpacity - 0.5) * 2)),
              transform: `translateY(${(1 - Math.max(0, Math.min(1, (logoOpacity - 0.5) * 2))) * 16}px)`,
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            pijamas que abrazan
          </p>
          {/* CTA — fade-in with greater delay */}
          <button
            onClick={() => {
              const el = document.getElementById("colecciones");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else navigate("/catalogo");
            }}
            className="mt-6 px-8 py-4 rounded-full font-semibold text-base tracking-wide shadow-lg transition-all duration-200 hover:scale-105 hover:brightness-110"
            style={{
              backgroundColor: "#ac3c72",
              color: "#ffffff",
              opacity: Math.max(0, Math.min(1, (logoOpacity - 0.7) * 3.33)),
              transform: `translateY(${(1 - Math.max(0, Math.min(1, (logoOpacity - 0.7) * 3.33))) * 16}px)`,
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            Ver catálogo
          </button>
        </div>

        {/* Floating birds — desktop only */}
        {BIRDS.map((bird, i) => (
          <img
            key={i}
            src={bird.src}
            alt={bird.alt}
            className="absolute pointer-events-none select-none hidden md:block z-30"
            style={{
              ...bird.style,
              animation: `floatBird 3.5s ease-in-out infinite`,
              animationDelay: bird.delay,
              mixBlendMode: "multiply",
              background: "transparent",
            }}
            aria-hidden="true"
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroPapacho;
