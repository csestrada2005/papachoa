import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import printPapachoa from "@/assets/brand/print-papachoa.png";

import letterP1 from "@/assets/letters/P1.png";
import letterA1 from "@/assets/letters/A1.png";
import letterP2 from "@/assets/letters/P2.png";
import letterA2 from "@/assets/letters/A2.png";
import letterC from "@/assets/letters/C.png";
import letterH from "@/assets/letters/H.png";
import letterO from "@/assets/letters/O.png";
import letterA3 from "@/assets/letters/A3.png";

// PAPACHOA = P A P A C H O A
// Scatter values are moderate to keep letters visible but playful
const LETTERS = [
  { src: letterP1, alt: "P", scatterX: -80, scatterY: -45, scatterRot: -7 },
  { src: letterA1, alt: "A", scatterX: 50, scatterY: 35, scatterRot: 6 },
  { src: letterP2, alt: "P", scatterX: -60, scatterY: 40, scatterRot: -5 },
  { src: letterA2, alt: "A", scatterX: 70, scatterY: -50, scatterRot: 8 },
  { src: letterC, alt: "C", scatterX: -45, scatterY: 50, scatterRot: -6 },
  { src: letterH, alt: "H", scatterX: 55, scatterY: -35, scatterRot: 5 },
  { src: letterO, alt: "O", scatterX: -50, scatterY: -40, scatterRot: -7 },
  { src: letterA3, alt: "A", scatterX: 65, scatterY: 45, scatterRot: 6 },
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  const onScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionH = section.offsetHeight;
    const viewH = window.innerHeight;
    // Scroll range: from section top at viewport top to section bottom minus one viewport
    // Letters assemble in first 50% of scroll, then stay assembled for remaining 50%
    const scrollable = sectionH - viewH;
    if (scrollable <= 0) return;
    const scrolled = -rect.top;
    const raw = scrolled / (scrollable * 0.5); // assemble in first half
    setProgress(Math.max(0, Math.min(1, raw)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Smooth cubic ease-in-out
  const ease = (t: number) => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  const t = ease(progress);

  // Subtitle/CTA appear after letters are fully assembled
  const subtitleProgress = Math.max(0, (progress - 0.85) / 0.15);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center overflow-hidden"
      style={{ minHeight: "250svh" }}
    >
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${printPapachoa})`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center">
        {/* Letter composition */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: "min(90vw, 800px)", height: "clamp(80px, 15vw, 160px)" }}
        >
          {LETTERS.map((letter, i) => {
            const offsetX = letter.scatterX * (1 - t);
            const offsetY = letter.scatterY * (1 - t);
            const rot = letter.scatterRot * (1 - t);

            return (
              <img
                key={i}
                src={letter.src}
                alt={letter.alt}
                draggable={false}
                className="select-none pointer-events-none"
                style={{
                  height: "100%",
                  width: "auto",
                  objectFit: "contain",
                  transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`,
                  transition: "none",
                  willChange: "transform",
                  marginLeft: i === 0 ? 0 : "clamp(-12px, -1.5vw, -6px)",
                }}
                loading="eager"
              />
            );
          })}
        </div>

        {/* Subtitle + CTA fade in after assembly */}
        <p
          className="text-lg md:text-xl text-muted-foreground font-light mt-8 mb-10 max-w-md mx-auto text-center leading-relaxed"
          style={{
            opacity: subtitleProgress,
            transform: `translateY(${(1 - subtitleProgress) * 20}px)`,
          }}
        >
          Suaves, cálidos y con magia de hogar.
          <br />
          Hechos en México con amor.
        </p>

        <div
          style={{
            opacity: Math.max(0, (progress - 0.9) / 0.1),
            transform: `translateY(${(1 - Math.max(0, (progress - 0.9) / 0.1)) * 20}px)`,
          }}
        >
          <Link to="/catalogo" className="btn-artisan inline-flex text-base px-10 py-4">
            Ver colección
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
