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

import pajaroAmarillo from "@/assets/brand/pajaro-amarillo-sf.png";
import pajaroAzulClaro from "@/assets/brand/pajaro-azul-claro-sf.png";
import pajaroAzul from "@/assets/brand/pajaro-azul-sf.png";
import pajaroNaranja from "@/assets/brand/pajaro-naranja-sf.png";

// Final positions (where birds settle at 45% scroll)
// Start positions are off-screen corners
const BIRDS = [
  {
    src: pajaroAmarillo, alt: "Pájaro amarillo",
    // Final: upper-left of wordmark
    finalTop: 22, finalLeft: 8,
    // Start: off-screen top-left
    startX: -25, startY: -30,
    dur: "6.8s",
  },
  {
    src: pajaroNaranja, alt: "Pájaro naranja",
    // Final: upper-center-right
    finalTop: 18, finalLeft: 55,
    // Start: off-screen top
    startX: 0, startY: -35,
    dur: "7.6s",
  },
  {
    src: pajaroAzulClaro, alt: "Pájaro azul claro",
    // Final: right-middle
    finalTop: 40, finalLeft: 85,
    // Start: off-screen right
    startX: 30, startY: 10,
    dur: "8.4s",
  },
  {
    src: pajaroAzul, alt: "Pájaro azul",
    // Final: upper-right
    finalTop: 16, finalLeft: 87,
    // Start: off-screen top-right
    startX: 30, startY: -30,
    dur: "9.2s",
  },
];

// Order: P A P A C H O A — last A is blue (A1)
const LETTERS = [
  { src: letterP1, alt: "Letra P morada", scatterX: -80, scatterY: -30, scatterRot: -12 },
  { src: letterA1, alt: "Letra A amarilla", scatterX: 60, scatterY: 25, scatterRot: 10 },
  { src: letterP2, alt: "Letra P azul", scatterX: -65, scatterY: 40, scatterRot: -8 },
  { src: letterA3, alt: "Letra A naranja", scatterX: 75, scatterY: -35, scatterRot: 14 },
  { src: letterC, alt: "Letra C azul marino", scatterX: -50, scatterY: 45, scatterRot: -10 },
  { src: letterH, alt: "Letra H morada", scatterX: 55, scatterY: -25, scatterRot: 9 },
  { src: letterO, alt: "Letra O amarilla", scatterX: -60, scatterY: -40, scatterRot: -14 },
  { src: letterA2, alt: "Letra A azul final", scatterX: 70, scatterY: 35, scatterRot: 11 },
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

  const assembleT = ease(Math.min(progress / 0.45, 1));
  const subP = Math.max(0, Math.min(1, (progress - 0.55) / 0.2));
  const ctaP = Math.max(0, Math.min(1, (progress - 0.65) / 0.15));

  return (
    <div ref={sectionRef} style={{ height: "240vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "visible",
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

        {/* Floating birds layer */}
        <style>{`
          @keyframes bird-lissajous-1 {
            0%   { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
            15%  { transform: translate(8px, -6px) rotate(2deg) scaleY(0.97); }
            30%  { transform: translate(12px, -12px) rotate(3.5deg) scaleY(1); }
            45%  { transform: translate(4px, -16px) rotate(1deg) scaleY(0.96); }
            60%  { transform: translate(-8px, -10px) rotate(-2.5deg) scaleY(1); }
            75%  { transform: translate(-12px, -4px) rotate(-3deg) scaleY(0.97); }
            90%  { transform: translate(-4px, 4px) rotate(-1deg) scaleY(1); }
            100% { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
          }
          @keyframes bird-lissajous-2 {
            0%   { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
            12%  { transform: translate(-10px, -8px) rotate(-3deg) scaleY(0.96); }
            28%  { transform: translate(-6px, -18px) rotate(-1deg) scaleY(1); }
            42%  { transform: translate(6px, -14px) rotate(2.5deg) scaleY(0.97); }
            58%  { transform: translate(14px, -6px) rotate(4deg) scaleY(1); }
            72%  { transform: translate(10px, 4px) rotate(2deg) scaleY(0.96); }
            88%  { transform: translate(-2px, 6px) rotate(-1.5deg) scaleY(1); }
            100% { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
          }
          @keyframes bird-lissajous-3 {
            0%   { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
            18%  { transform: translate(6px, -14px) rotate(3deg) scaleY(0.97); }
            35%  { transform: translate(-4px, -20px) rotate(1deg) scaleY(1); }
            50%  { transform: translate(-14px, -12px) rotate(-3.5deg) scaleY(0.96); }
            65%  { transform: translate(-10px, 2px) rotate(-2deg) scaleY(1); }
            80%  { transform: translate(4px, 8px) rotate(1.5deg) scaleY(0.97); }
            100% { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
          }
          @keyframes bird-lissajous-4 {
            0%   { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
            20%  { transform: translate(-8px, -10px) rotate(-2deg) scaleY(0.97); }
            40%  { transform: translate(4px, -20px) rotate(2deg) scaleY(1); }
            55%  { transform: translate(16px, -14px) rotate(3.5deg) scaleY(0.96); }
            70%  { transform: translate(12px, -2px) rotate(1deg) scaleY(1); }
            85%  { transform: translate(2px, 6px) rotate(-1.5deg) scaleY(0.97); }
            100% { transform: translate(0px, 0px) rotate(0deg) scaleY(1); }
          }
        `}</style>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 30,
            pointerEvents: "none",
            isolation: "isolate",
            overflow: "visible",
          }}
        >
          {BIRDS.map((bird, i) => {
            // Entry easing: cubic-bezier(0.22, 1, 0.36, 1) approximation
            const entryRaw = Math.min(progress / 0.45, 1);
            const entryT = 1 - Math.pow(1 - entryRaw, 3); // smooth decel

            // Interpolate from start (off-screen) to final position
            const currentX = bird.startX * (1 - entryT); // vw offset from final
            const currentY = bird.startY * (1 - entryT); // vh offset from final

            const hasArrived = progress >= 0.45;
            const animName = `bird-lissajous-${i + 1}`;

            return (
              <div
                key={`bird-${i}`}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: `${bird.finalTop}%`,
                  left: `${bird.finalLeft}%`,
                  background: "transparent",
                  lineHeight: 0,
                  border: "none",
                  boxShadow: "none",
                  outline: "none",
                  transformStyle: "flat" as any,
                  transform: hasArrived
                    ? "translate(0, 0)"
                    : `translate(${currentX}vw, ${currentY}vh)`,
                  animation: hasArrived
                    ? `${animName} ${bird.dur} ease-in-out infinite`
                    : "none",
                  transition: hasArrived ? "none" : "transform 0.05s linear",
                }}
              >
                <img
                  src={bird.src}
                  alt={bird.alt}
                  draggable={false}
                  className="select-none pointer-events-none"
                  style={{
                    width: "clamp(70px, 10vw, 150px)",
                    height: "auto",
                    display: "block",
                    objectFit: "contain",
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    mixBlendMode: "multiply",
                    filter: "brightness(0.98) contrast(1.02)",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Content layout: bird zone ~30% + letters zone ~70% */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            zIndex: 3,
          }}
        >
          {/* Bird placeholder zone */}
          <div style={{ flex: "0 0 30%", minHeight: 0 }} />

          {/* Letters + subtitle + CTA zone */}
          <div
            style={{
              flex: "1 1 70%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 0,
            }}
          >
            {/* Wordmark row */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                width: "min(980px, 92vw)",
                gap: "clamp(10px, 2.2vw, 26px)",
                padding: "0 6vw",
              }}
            >
              {LETTERS.map((letter, i) => {
                const offsetX = letter.scatterX * (1 - assembleT);
                const offsetY = letter.scatterY * (1 - assembleT);
                const rot = letter.scatterRot * (1 - assembleT);
                return (
                  <div
                    key={i}
                    style={{
                      background: "hsl(15 20% 96%)",
                      lineHeight: 0,
                      transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rot}deg)`,
                    }}
                  >
                    <img
                      src={letter.src}
                      alt={letter.alt}
                      draggable={false}
                      className="select-none pointer-events-none"
                      style={{
                        height: "clamp(70px, 10vw, 120px)",
                        width: "auto",
                        objectFit: "contain",
                        display: "block",
                        mixBlendMode: "multiply",
                      }}
                      loading="eager"
                    />
                  </div>
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
    </div>
  );
};

export default Hero;
