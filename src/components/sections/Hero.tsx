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
// Scatter: moderate offsets, rotations -18° to +18°, always near center
const LETTERS = [
  { src: letterP1, alt: "Letra P", scatterX: -90, scatterY: -50, scatterRot: -14 },
  { src: letterA1, alt: "Letra A", scatterX: 60, scatterY: 40, scatterRot: 10 },
  { src: letterP2, alt: "Letra P", scatterX: -70, scatterY: 45, scatterRot: -8 },
  { src: letterA2, alt: "Letra A", scatterX: 80, scatterY: -55, scatterRot: 16 },
  { src: letterC, alt: "Letra C", scatterX: -55, scatterY: 55, scatterRot: -12 },
  { src: letterH, alt: "Letra H", scatterX: 65, scatterY: -40, scatterRot: 9 },
  { src: letterO, alt: "Letra O", scatterX: -60, scatterY: -45, scatterRot: -18 },
  { src: letterA3, alt: "Letra A", scatterX: 75, scatterY: 50, scatterRot: 13 },
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
    const scrollable = sectionH - viewH;
    if (scrollable <= 0) return;
    const scrolled = -rect.top;
    const raw = scrolled / scrollable;
    setProgress(Math.max(0, Math.min(1, raw)));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // easeInOutCubic
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  // Letters assemble from 0% to 45% of scroll
  const assembleRaw = Math.min(progress / 0.45, 1);
  const t = ease(assembleRaw);

  // Subtitle + CTA fade in between 55% and 75%
  const subtitleProgress = Math.max(0, Math.min(1, (progress - 0.55) / 0.2));
  const ctaProgress = Math.max(0, Math.min(1, (progress - 0.65) / 0.15));

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ minHeight: "240vh" }}
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
      <div
        className="sticky top-0 w-full flex flex-col justify-center items-center"
        style={{
          height: "100vh",
          background: "transparent",
          boxShadow: "none",
          border: "none",
        }}
      >
        {/* Letter composition — NO background, NO card */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: "min(88vw, 900px)",
            height: "clamp(70px, 14vw, 160px)",
            padding: "0 6vw",
            background: "transparent",
            boxShadow: "none",
            border: "none",
          }}
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
                  display: "block",
                  background: "transparent",
                  imageRendering: "auto",
                  transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`,
                  transition: "none",
                  willChange: "transform",
                  marginLeft: i === 0 ? 0 : "clamp(-14px, -1.8vw, -6px)",
                }}
                loading="eager"
              />
            );
          })}
        </div>

        {/* Subtitle fades in after assembly */}
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

        {/* CTA */}
        <div
          style={{
            opacity: ctaProgress,
            transform: `translateY(${(1 - ctaProgress) * 20}px)`,
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
