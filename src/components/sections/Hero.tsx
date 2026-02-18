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

// Order: P A P A C H O Á
// Swap A1 (blue) to last position, A3 (orange/accent) to 2nd & 4th
const LETTERS = [
  { src: letterP1, alt: "Letra P", scatterX: -95, scatterY: -40, scatterRot: -14, accent: false },
  { src: letterA3, alt: "Letra A", scatterX: 65, scatterY: 35, scatterRot: 10, accent: false },
  { src: letterP2, alt: "Letra P", scatterX: -75, scatterY: 50, scatterRot: -8, accent: false },
  { src: letterA2, alt: "Letra A", scatterX: 85, scatterY: -45, scatterRot: 16, accent: false },
  { src: letterC, alt: "Letra C", scatterX: -60, scatterY: 55, scatterRot: -12, accent: false },
  { src: letterH, alt: "Letra H", scatterX: 70, scatterY: -35, scatterRot: 9, accent: false },
  { src: letterO, alt: "Letra O", scatterX: -65, scatterY: -50, scatterRot: -18, accent: false },
  { src: letterA1, alt: "Letra Á", scatterX: 80, scatterY: 45, scatterRot: 13, accent: true },
];

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const Hero = () => {
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

  // Assembly: 0–45%
  const assembleT = ease(Math.min(progress / 0.45, 1));
  // Subtitle: 55–75%
  const subP = Math.max(0, Math.min(1, (progress - 0.55) / 0.2));
  // CTA: 65–80%
  const ctaP = Math.max(0, Math.min(1, (progress - 0.65) / 0.15));

  return (
    <div ref={sectionRef} style={{ height: "230vh", position: "relative" }}>
      {/* Sticky container – stays in viewport during scroll */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "hsl(15 20% 96%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `url(${printPapachoa})`,
            backgroundSize: "400px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Centered content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            zIndex: 1,
          }}
        >
          {/* Bird space placeholder */}
          <div
            className="shrink-0"
            style={{ height: "clamp(120px, 14vh, 160px)" }}
          />

          {/* Wordmark row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "min(980px, 92vw)",
              gap: "clamp(4px, 1.2vw, 14px)",
              padding: "0 6vw",
            }}
          >
            {LETTERS.map((letter, i) => {
              const offsetX = letter.scatterX * (1 - assembleT);
              const offsetY = letter.scatterY * (1 - assembleT);
              const rot = letter.scatterRot * (1 - assembleT);
              return (
                <img
                  key={i}
                  src={letter.src}
                  alt={letter.alt}
                  draggable={false}
                  className="select-none pointer-events-none"
                  style={{
                    height: letter.accent
                      ? "clamp(78px, 15vw, 170px)"
                      : "clamp(70px, 13.5vw, 155px)",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                    background: "transparent",
                    mixBlendMode: "multiply",
                    transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`,
                    willChange: "transform",
                    marginBottom: letter.accent ? "-2px" : "0",
                  }}
                  loading="eager"
                />
              );
            })}
          </div>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl text-muted-foreground font-light mt-8 mb-6 max-w-md mx-auto text-center leading-relaxed"
            style={{
              opacity: subP,
              transform: `translateY(${(1 - subP) * 20}px)`,
            }}
          >
            Suaves, cálidos y con magia de hogar.
            <br />
            Hechos en México con amor.
          </p>

          {/* CTA */}
          <div
            style={{
              opacity: ctaP,
              transform: `translateY(${(1 - ctaP) * 20}px)`,
              pointerEvents: ctaP > 0.5 ? "auto" : "none",
            }}
          >
            <Link to="/catalogo" className="btn-artisan inline-flex text-base px-10 py-4">
              Ver colección
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
