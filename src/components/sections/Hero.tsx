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

const BIRDS = [
  { src: pajaroAmarillo, alt: "Pájaro amarillo", top: "18%", left: "12%", size: 54, dur: "8s", delay: "0s", flip: false },
  { src: pajaroAzul, alt: "Pájaro azul", top: "14%", right: "10%", size: 48, dur: "7s", delay: "1.5s", flip: true },
  { src: pajaroNaranja, alt: "Pájaro naranja", top: "28%", left: "42%", size: 40, dur: "9s", delay: "0.8s", flip: true },
  { src: pajaroAzulClaro, alt: "Pájaro azul claro", top: "22%", right: "18%", size: 44, dur: "10s", delay: "2.2s", flip: false },
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
          @keyframes bird-float-active {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(6px, -10px) rotate(3deg); }
            50% { transform: translate(-4px, -16px) rotate(-2deg); }
            75% { transform: translate(8px, -6px) rotate(2deg); }
          }
          @keyframes bird-float-calm {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(3px, -6px) rotate(1.5deg); }
          }
        `}</style>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}
        >
          {BIRDS.map((bird, i) => {
            const isAssembling = progress < 0.45;
            return (
              <img
                key={`bird-${i}`}
                src={bird.src}
                alt={bird.alt}
                draggable={false}
                className="select-none pointer-events-none"
                style={{
                  position: "absolute",
                  top: bird.top,
                  left: bird.left,
                  right: (bird as any).right,
                  width: bird.size,
                  height: "auto",
                  transform: bird.flip ? "scaleX(-1)" : undefined,
                  animation: `${isAssembling ? "bird-float-active" : "bird-float-calm"} ${bird.dur} ease-in-out ${bird.delay} infinite`,
                  mixBlendMode: "multiply",
                }}
              />
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
