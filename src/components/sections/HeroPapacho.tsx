import { useEffect, useRef, useState, useCallback } from "react";
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

/* Build word-then-letter structure with viewport-unit scatter */
const WORDS: WordData[] = (() => {
  const words = TEXT.split(" ");
  let globalIdx = 0;
  return words.map((word) => ({
    letters: word.split("").map((char) => {
      const i = globalIdx++;
      const s = Math.sin(i * 47.3 + 7.1);
      const c = Math.cos(i * 31.7 + 3.9);
      return {
        char,
        tx: s * 10 + c * 5,          // ~ -15vw to 15vw
        ty: (c * 25 + s * 15),        // ~ -30vh to 45vh
        tz: -(Math.abs(Math.sin(i * 23.1)) * 35 + 2), // ~ -40vw to -2vw
        rot: s * 12 + c * 6,          // ~ -18deg to 18deg
      };
    }),
  }));
})();

const HeroPapacho = () => {
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
    setProgress(Math.max(0, Math.min(1, raw)));
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
    <section ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
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
              className="w-[240px] select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroPapacho;
