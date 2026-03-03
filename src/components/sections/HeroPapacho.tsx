import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-mama-hija.png";
import papachoaLogo from "@/assets/brand/papachoa-logo-nuevo.png";
import birdYellow from "@/assets/brand/pajaro-amarillo-sf.png";
import birdBlue from "@/assets/brand/pajaro-azul-claro-sf.png";
import birdOrange from "@/assets/brand/pajaro-naranja-sf.png";

const TEXT = "Pensado por mamás para mamás";

const LETTER_COLORS = ["#416ba9"];

interface LetterScatter {
  char: string;
  tx: number;  // px
  ty: number;  // px
  rot: number; // deg
}

interface WordData {
  letters: LetterScatter[];
}

/* Scatter values in PIXELS — small ranges to avoid iOS clipping */
const SCATTER_MAP: Record<number, { tx: number; ty: number; rot: number }> = {
  0:  { tx:  45, ty:  55, rot:  25 },
  1:  { tx:  25, ty:  80, rot: -18 },
  2:  { tx:  60, ty:  40, rot:  30 },
  3:  { tx: -55, ty:  65, rot: -22 },
  4:  { tx: -40, ty:  90, rot:  15 },
  5:  { tx:  35, ty:  70, rot: -28 },
  6:  { tx: -75, ty:  50, rot:  20 },
  7:  { tx:  30, ty:  95, rot: -15 },
  8:  { tx: -65, ty:  60, rot:  18 },
  9:  { tx: -55, ty:  80, rot: -30 },
  10: { tx:  50, ty:  45, rot:  22 },
  11: { tx: -80, ty:  70, rot: -25 },
  12: { tx:  20, ty:  90, rot:  18 },
  13: { tx: -60, ty:  55, rot: -22 },
  14: { tx:  40, ty:  95, rot:  30 },
  15: { tx: -70, ty:  40, rot: -18 },
  16: { tx:   0, ty:  80, rot:  25 },
  17: { tx:  55, ty:  60, rot: -22 },
  18: { tx: -45, ty:  90, rot:  18 },
  19: { tx:  35, ty:  50, rot: -25 },
  20: { tx: -55, ty:  70, rot:  30 },
  21: { tx:  45, ty:  95, rot: -15 },
  22: { tx: -65, ty:  55, rot:  22 },
  23: { tx:  20, ty:  80, rot: -18 },
  24: { tx: -35, ty:  60, rot:  25 },
  25: { tx:  60, ty:  90, rot: -30 },
  26: { tx: -45, ty:  50, rot:  22 },
};

const WORDS: WordData[] = (() => {
  const words = TEXT.split(" ");
  let globalIdx = 0;
  return words.map((word) => ({
    letters: word.split("").map((char) => {
      const i = globalIdx++;
      const scatter = SCATTER_MAP[i] ?? { tx: 0, ty: 60, rot: 20 };
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
  const isTouchDevice = useRef(typeof window !== "undefined" && "ontouchstart" in window);

  useEffect(() => {
    const timer = setTimeout(() => setLineVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  /* Scroll progress — throttled with RAF */
  const rafScroll = useRef<number | null>(null);
  const onScroll = useCallback(() => {
    if (rafScroll.current) return;
    rafScroll.current = requestAnimationFrame(() => {
      rafScroll.current = null;
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      const capped = Math.min(raw / 0.5, 1);
      setProgress(Math.max(0, Math.min(1, capped)));
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafScroll.current) cancelAnimationFrame(rafScroll.current);
    };
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

  /* Mouse parallax — desktop only */
  const onMouseMove = useCallback((e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x: nx, y: ny });
  }, []);

  useEffect(() => {
    if (isTouchDevice.current) return;
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  const p = 1 - progress;
  const imgSlide = Math.min(progress / 0.6, 1);
  const imgShift = `translate(${mouse.x * -6}px, ${mouse.y * -6 + imgSlide * -120}px)`;
  const textShift = `translate(${mouse.x * 8}px, ${mouse.y * 8}px)`;

  const logoOpacity = Math.max(0, Math.min(1, (progress - 0.6) / 0.3));
  const logoTranslateY = (1 - logoOpacity) * 20;

  return (
    <section ref={sectionRef} style={{ height: "calc(var(--vh, 1vh) * 350)", position: "relative", zIndex: 0 }}>
      <div
        ref={stickyRef}
        className={exiting ? "hero-exiting" : ""}
        style={{
          position: "sticky",
          top: 0,
          height: "calc(var(--vh, 1vh) * 100)",
          width: "100%",
          overflow: "clip",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "hsl(15 20% 96%)",
          zIndex: 0,
          transition: "transform 0.6s ease-out, opacity 0.6s ease-out",
        }}
      >
        {/* Background layer */}
        <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
          <div style={{ position: "absolute", inset: 0, background: "hsl(15 20% 96%)" }} />
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "150px",
            }}
          />
        </div>

        {/* Image with parallax */}
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
            className="object-cover object-top select-none w-auto"
            style={{
              filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.15))",
              imageRendering: "auto",
              objectFit: "cover",
              maxHeight: "calc(var(--vh, 1vh) * 90)",
            }}
            loading="eager"
            // @ts-expect-error fetchpriority is valid HTML but not yet in React types
            fetchpriority="high"
            draggable={false}
            width={800}
            height={900}
          />
        </div>

        {/* Scattered → assembled typography */}
        <div
          className="absolute z-20 inset-0 flex flex-col items-center justify-center"
          style={{
            transform: isTouchDevice.current ? "none" : textShift,
            transition: isTouchDevice.current ? "none" : "transform 0.15s ease-out",
          }}
        >
          <h1
            className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none select-none text-center"
            style={{
              minHeight: "1em",
              minWidth: "10ch",
            }}
            aria-label={TEXT}
          >
            {WORDS.map((word, wi) => (
              <span key={wi} className="inline-block">
                <span className="inline-block whitespace-nowrap">
                  {word.letters.map((l, li) => (
                    <span
                      key={li}
                      aria-hidden="true"
                      className="inline-block"
                      style={{
                        color: LETTER_COLORS[(wi * 10 + li) % LETTER_COLORS.length],
                        transform: `translate(${l.tx * p}px, ${l.ty * p}px) rotate(${l.rot * p}deg)`,
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
          <p
            className="mt-4 text-xl md:text-2xl font-bold text-center select-none font-display"
            style={{
              color: "#000000",
              opacity: Math.max(0, Math.min(1, (logoOpacity - 0.5) * 2)),
              transform: `translateY(${(1 - Math.max(0, Math.min(1, (logoOpacity - 0.5) * 2))) * 16}px)`,
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            pijamas que abrazan
          </p>
          <button
            onClick={() => navigate("/catalogo")}
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
