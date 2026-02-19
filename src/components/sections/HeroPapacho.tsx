import { useEffect, useRef, useState, useCallback } from "react";
import heroKids from "@/assets/hero-kids.png";
import printPapachoa from "@/assets/brand/print-papachoa.png";

/* ─── Brand colors ─── */
const BRAND_COLOR = "#A64D8A";

const TEXT = "Pijamas que abrazan";

interface LetterStyle {
  char: string;
  tx: number;
  ty: number;
  tz: number;
  rot: number;
}

/* Pseudo-random scattered positions — permanently fixed */
const SCATTERED_LETTERS: LetterStyle[] = TEXT.split("").map((char, i) => {
  const s = Math.sin(i * 47.3 + 7.1);
  const c = Math.cos(i * 31.7 + 3.9);
  return {
    char,
    tx: s * 60 + c * 30,
    ty: c * 25 + s * 15,
    tz: Math.sin(i * 23.1) * 80,
    rot: s * 18 + c * 12,
  };
});

const HeroPapacho = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /* Expanding line animation on mount */
  useEffect(() => {
    const timer = setTimeout(() => setLineVisible(true), 300);
    return () => clearTimeout(timer);
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

  const imgShift = `translate3d(${mouse.x * -15}px, ${mouse.y * -15}px, 0)`;
  const textShift = `translate3d(${mouse.x * 20}px, ${mouse.y * 20}px, 0)`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "hsl(15 20% 96%)" }}
    >
      {/* Background texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${printPapachoa})`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
          opacity: 0.04,
        }}
      />

      {/* Image container with parallax */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: imgShift,
          transition: "transform 0.2s ease-out",
        }}
      >
        <img
          src={heroKids}
          alt="Niños felices en pijamas Papachoa"
          className="object-cover object-top select-none max-h-[50vh] w-auto rounded-sm"
          style={{
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))",
          }}
          loading="eager"
          draggable={false}
        />

        {/* Expanding line flush with bottom of image */}
        <div
          className="w-full h-[3px]"
          style={{
            background: BRAND_COLOR,
            transform: lineVisible ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "center",
            transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>

      {/* Scattered typography with opposite parallax */}
      <div
        className="relative z-10 mt-8 sm:mt-10"
        style={{
          perspective: "1000px",
          transform: textShift,
          transition: "transform 0.2s ease-out",
        }}
      >
        <h1
          className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none select-none"
          style={{ transformStyle: "preserve-3d" }}
          aria-label={TEXT}
        >
          {SCATTERED_LETTERS.map((l, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="inline-block will-change-transform"
              style={{
                color: l.char === " " ? "transparent" : BRAND_COLOR,
                transform: `translate3d(${l.tx}px, ${l.ty}px, ${l.tz}px) rotateZ(${l.rot}deg)`,
                whiteSpace: l.char === " " ? "pre" : "normal",
              }}
            >
              {l.char === " " ? "\u00A0" : l.char}
            </span>
          ))}
        </h1>
      </div>
    </section>
  );
};

export default HeroPapacho;
