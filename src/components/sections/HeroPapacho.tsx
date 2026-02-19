import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroBird from "@/assets/hero-bird-editorial.png";
import printPapachoa from "@/assets/brand/print-papachoa.png";

import letterP1 from "@/assets/letters/P1.png";
import letterA1 from "@/assets/letters/A1.png";
import letterP2 from "@/assets/letters/P2.png";
import letterA2 from "@/assets/letters/A2.png";
import letterC from "@/assets/letters/C.png";
import letterH from "@/assets/letters/H.png";
import letterO from "@/assets/letters/O.png";
import letterA3 from "@/assets/letters/A3.png";

// P A P A C H O A — visual order
const LETTERS = [
  { src: letterP1, alt: "P" },
  { src: letterA1, alt: "A" },
  { src: letterP2, alt: "P" },
  { src: letterA3, alt: "A" },
  { src: letterC,  alt: "C" },
  { src: letterH,  alt: "H" },
  { src: letterO,  alt: "O" },
  { src: letterA2, alt: "A" },
];

const LETTER_DELAY_BASE = 300; // ms after mount before first letter
const LETTER_STAGGER    = 60;  // ms between each letter
const SUBTITLE_DELAY    = LETTER_DELAY_BASE + LETTERS.length * LETTER_STAGGER + 120;
const CTA_DELAY         = SUBTITLE_DELAY + 160;

const HeroPapacho = () => {
  const [ready, setReady] = useState(false);

  // Single tick after mount to trigger CSS transitions
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      {/* Subtle paper texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url(${printPapachoa})`,
          backgroundSize: "380px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Bird illustration ── */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          paddingTop: "clamp(5rem, 10vh, 8rem)",
          flex: "0 0 auto",
        }}
      >
          <img
            src={heroBird}
            alt="Pájaro Papachoa en su nido"
            className="select-none pointer-events-none"
            style={{
              width: "clamp(220px, 38vw, 480px)",
              height: "auto",
              display: "block",
              opacity: ready ? 1 : 0,
              transform: ready ? "scale(1) translateY(0)" : "scale(0.93) translateY(16px)",
              transition: "opacity 1.2s cubic-bezier(.22,1,.36,1) 80ms, transform 1.2s cubic-bezier(.22,1,.36,1) 80ms",
              willChange: "opacity, transform",
            }}
            loading="eager"
            decoding="async"
          />
      </div>

      {/* ── PAPACHOA wordmark — letter stagger ── */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          flex: "0 0 auto",
          marginTop: "clamp(-2rem, -4vw, -3rem)", // overlap bird slightly
        }}
      >
        {/* Letter row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "clamp(6px, 1.4vw, 18px)",
            isolation: "isolate",
          }}
          aria-label="Papachoa"
          role="heading"
          aria-level={1}
        >
          {LETTERS.map((letter, i) => {
            const delay = LETTER_DELAY_BASE + i * LETTER_STAGGER;
            return (
              <div key={i} aria-hidden="true" style={{ lineHeight: 0 }}>
                <img
                  src={letter.src}
                  alt={letter.alt}
                  draggable={false}
                  className="select-none pointer-events-none"
                  style={{
                    height: "clamp(56px, 9.5vw, 116px)",
                    width: "auto",
                    objectFit: "contain",
                    display: "block",
                    opacity: ready ? 1 : 0,
                    transform: ready ? "translateY(0)" : "translateY(24px)",
                    transition: ready
                      ? `opacity 0.72s cubic-bezier(.22,1,.36,1) ${delay}ms, transform 0.72s cubic-bezier(.22,1,.36,1) ${delay}ms`
                      : "none",
                    willChange: "opacity, transform",
                  }}
                  loading="eager"
                />
              </div>
            );
          })}
        </div>

        {/* Subtitle */}
        <p
          className="text-base md:text-lg text-muted-foreground font-light mt-7 mb-0 max-w-sm md:max-w-md mx-auto text-center leading-relaxed tracking-wide"
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(18px)",
            transition: ready
              ? `opacity 0.8s cubic-bezier(.22,1,.36,1) ${SUBTITLE_DELAY}ms, transform 0.8s cubic-bezier(.22,1,.36,1) ${SUBTITLE_DELAY}ms`
              : "none",
          }}
        >
          Suaves, cálidos y con magia de hogar.
          <br />
          Hechos en México con amor.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(14px)",
            transition: ready
              ? `opacity 0.7s ease ${CTA_DELAY}ms, transform 0.7s ease ${CTA_DELAY}ms`
              : "none",
            marginTop: "clamp(1.5rem, 3vw, 2rem)",
          }}
        >
          <Link
            to="/catalogo"
            className="btn-artisan inline-flex text-sm md:text-base px-8 md:px-10 py-3.5 md:py-4"
          >
            Ver colección
            <span className="text-lg md:text-xl">→</span>
          </Link>
        </div>
      </div>

      {/* ── Bottom breathing room ── */}
      <div
        className="relative z-10 w-full"
        style={{
          flex: "0 0 auto",
          paddingBottom: "clamp(3rem, 6vh, 5rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {/* Scroll hint */}
        <div
          style={{
            opacity: ready ? 0.35 : 0,
            transition: ready ? `opacity 1s ease ${CTA_DELAY + 400}ms` : "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
          aria-hidden="true"
        >
          <span
            className="text-xs tracking-[0.22em] uppercase text-muted-foreground font-light"
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "36px",
              background: "hsl(var(--muted-foreground))",
              animation: "scroll-line 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll-line {
          0%, 100% { transform: scaleY(1); opacity: 0.35; }
          50%       { transform: scaleY(0.4); opacity: 0.12; }
        }
      `}</style>
    </section>
  );
};

export default HeroPapacho;
