import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import heroBird from "@/assets/hero-bird-editorial.png";

/* ─────────────────────────────────────────
   HeroPapacho — Elena Borisova dispersed-letters clone
   ─ Each letter: position:absolute with unique x/y
   ─ Staggered letterAppear on load (scale+opacity)
   ─ Parallax + fade-out on scroll
   ─ Background colour transition → warm at 70% scroll
   ───────────────────────────────────────── */

/* ── Responsive scale factors ── */
function getScale() {
  const w = typeof window !== "undefined" ? window.innerWidth : 1280;
  if (w < 480) return 0.38;
  if (w < 768) return 0.54;
  if (w < 1024) return 0.72;
  return 1;
}

/* ── Letter definitions for "PIJAMAS QUE ABRAZAN"
   Each letter has a base x/y tuned for 1280px-wide viewport.
   Scale applied at runtime for smaller breakpoints.
   Y anchors are expressed as % of viewport height (0-100).
   X as px from centre (negative = left of centre).
   ── */
interface LetterDef {
  char: string;
  /** px from viewport centre-x (negative = left) */
  ox: number;
  /** % of viewport height */
  yp: number;
  /** extra rotation deg */
  rot?: number;
  /** colour — defaults to foreground */
  color?: string;
}

const LETTERS: LetterDef[] = [
  // Row 1 — "PIJAMAS"
  { char: "P", ox: -460, yp: 30, rot:  1,  color: "hsl(331 48% 45%)" },
  { char: "I", ox: -330, yp: 26, rot: -1 },
  { char: "J", ox: -215, yp: 32, rot:  0.5, color: "hsl(47 90% 42%)" },
  { char: "A", ox:  -85, yp: 27, rot: -0.5 },
  { char: "M", ox:   60, yp: 31, rot:  1 },
  { char: "A", ox:  200, yp: 27, rot: -1,  color: "hsl(331 48% 45%)" },
  { char: "S", ox:  350, yp: 30, rot:  0.5, color: "hsl(216 44% 46%)" },

  // Row 2 — "QUE"
  { char: "Q", ox: -240, yp: 52, rot: -1,  color: "hsl(14 100% 58%)" },
  { char: "U", ox:  -70, yp: 55, rot:  1 },
  { char: "E", ox:   90, yp: 51, rot: -0.5, color: "hsl(331 48% 45%)" },

  // Row 3 — "ABRAZAN"
  { char: "A", ox: -430, yp: 73, rot:  0.5 },
  { char: "B", ox: -290, yp: 70, rot: -1,  color: "hsl(216 44% 46%)" },
  { char: "R", ox: -155, yp: 74, rot:  1 },
  { char: "A", ox:   -5, yp: 70, rot: -0.5, color: "hsl(47 90% 42%)" },
  { char: "Z", ox:  145, yp: 75, rot:  0.5, color: "hsl(331 48% 45%)" },
  { char: "A", ox:  295, yp: 71, rot: -1 },
  { char: "N", ox:  435, yp: 74, rot:  1,  color: "hsl(14 100% 58%)" },
];

const STAGGER_MS = 62;      // ms between letters
const LETTER_DUR = 420;     // ms per letter animation
const LETTER_EASING = "cubic-bezier(0.34, 1.42, 0.64, 1)";
const BIRD_DELAY = 1100;    // ms — after first ~half letters
const EYEBROW_DELAY = 200;
const SUB_DELAY = LETTERS.length * STAGGER_MS + LETTER_DUR + 80;
const CTA_DELAY = SUB_DELAY + 180;
const HINT_DELAY = CTA_DELAY + 300;

const FONT_BASE = 118;      // px at 1× scale

const HeroPapacho = () => {
  const [ready, setReady]         = useState(false);
  const [scale, setScale]         = useState(1);
  const [scrollY, setScrollY]     = useState(0);
  const [viewH, setViewH]         = useState(600);
  const sectionRef                = useRef<HTMLElement>(null);
  const rafRef                    = useRef<number>(0);

  /* ── Init: fire ready after paint ── */
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setTimeout(() => setReady(true), 30)
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  /* ── Responsive scale ── */
  const updateScale = useCallback(() => {
    setScale(getScale());
    setViewH(window.innerHeight);
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener("resize", updateScale, { passive: true });
    return () => window.removeEventListener("resize", updateScale);
  }, [updateScale]);

  /* ── Scroll parallax ── */
  useEffect(() => {
    const onScroll = () => {
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const heroH   = viewH;       // 100vh
  // Parallax: letters drift up at 0.45× scroll speed
  const parallaxY     = scrollY * 0.45;
  // Fade: fully opaque until 20% scroll, then fade to 0 by 55%
  const lettersOpacity = Math.max(0, 1 - (scrollY / (heroH * 0.55)) * 1.4);
  // Background warm transition: 0→1 between 60% and 85% of heroH
  const bgProgress = Math.min(1, Math.max(0, (scrollY - heroH * 0.6) / (heroH * 0.25)));

  const fontSize = Math.round(FONT_BASE * scale);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: "100svh",
        /* Warm colour blend based on scroll */
        background: `rgb(
          ${Math.round(247 + (139 - 247) * bgProgress)},
          ${Math.round(244 + (100 - 244) * bgProgress)},
          ${Math.round(243 + ( 86 - 243) * bgProgress)}
        )`,
        transition: "none",
      }}
      aria-label="Hero Papachoa"
    >
      {/* ── Scattered letters container ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: lettersOpacity,
          transform: `translateY(${parallaxY}px)`,
          willChange: "transform, opacity",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        {LETTERS.map((l, i) => {
          const delay = i * STAGGER_MS;
          const x = (typeof window !== "undefined" ? window.innerWidth / 2 : 640) + l.ox * scale;
          const y = (viewH * l.yp) / 100;

          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: ready
                  ? `translate(${x}px, ${y}px) rotate(${l.rot ?? 0}deg) scale(1)`
                  : `translate(${x}px, ${y}px) rotate(${l.rot ?? 0}deg) scale(0.7) translateY(-18px)`,
                fontSize: `${fontSize}px`,
                fontWeight: 900,
                fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
                lineHeight: 1,
                color: l.color ?? "hsl(220 15% 18%)",
                opacity: ready ? 1 : 0,
                transition: ready
                  ? `opacity ${LETTER_DUR}ms ${LETTER_EASING} ${delay}ms,
                     transform ${LETTER_DUR}ms ${LETTER_EASING} ${delay}ms`
                  : "none",
                userSelect: "none",
                letterSpacing: "-0.01em",
              }}
            >
              {l.char}
            </span>
          );
        })}
      </div>

      {/* ── Bird illustration — centred, appears mid-sequence ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: ready
            ? `translate(-50%, -50%) scale(1) translateY(${parallaxY * 0.3}px)`
            : "translate(-50%, -50%) scale(0.82)",
          opacity: ready ? Math.max(0.08, lettersOpacity * 0.55) : 0,
          transition: ready
            ? `opacity ${LETTER_DUR * 1.2}ms ease ${BIRD_DELAY}ms,
               transform ${LETTER_DUR * 1.2}ms ease ${BIRD_DELAY}ms`
            : "none",
          pointerEvents: "none",
          zIndex: 2,
        }}
        aria-hidden="true"
      >
        <img
          src={heroBird}
          alt=""
          draggable={false}
          style={{
            width: `clamp(180px, ${28 * scale * 100}%, 420px)`,
            height: "auto",
            display: "block",
          }}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ── Overlay content: eyebrow + subtitle + CTAs ── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          minHeight: "100svh",
          paddingBottom: "clamp(5rem, 12vh, 9rem)",
          textAlign: "center",
          opacity: lettersOpacity,
          transform: `translateY(${parallaxY * 0.25}px)`,
          willChange: "transform, opacity",
          pointerEvents: lettersOpacity < 0.1 ? "none" : undefined,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: "clamp(0.75rem, 1.4vw, 0.95rem)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "hsl(331 48% 45%)",
            fontWeight: 500,
            marginBottom: "clamp(1.4rem, 4vh, 2.8rem)",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(10px)",
            transition: ready ? `opacity 600ms ease ${EYEBROW_DELAY}ms, transform 600ms ease ${EYEBROW_DELAY}ms` : "none",
          }}
        >
          Pijamas que abrazan
        </p>

        {/* Subtitle — screen-reader title */}
        <h1 className="sr-only">Pijamas Papachoa — Suaves y con magia de hogar</h1>

        <p
          style={{
            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
            color: "hsl(220 15% 36%)",
            fontWeight: 300,
            maxWidth: "440px",
            lineHeight: 1.65,
            letterSpacing: "0.02em",
            marginBottom: "clamp(1.75rem, 4vh, 3rem)",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(12px)",
            transition: ready ? `opacity 700ms ease ${SUB_DELAY}ms, transform 700ms ease ${SUB_DELAY}ms` : "none",
          }}
        >
          Suaves, cálidos y con magia de hogar.
          <br />
          Hechos en México con amor.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(0.75rem, 2vw, 1.5rem)",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition: ready ? `opacity 600ms ease ${CTA_DELAY}ms, transform 600ms ease ${CTA_DELAY}ms` : "none",
          }}
        >
          <Link
            to="/catalogo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4em",
              fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)",
              fontWeight: 500,
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              color: "hsl(220 15% 18%)",
              borderBottom: "2px solid hsl(220 15% 18%)",
              paddingBottom: "2px",
              transition: "gap 200ms ease, opacity 200ms ease",
            }}
            onMouseEnter={e => (e.currentTarget.style.gap = "0.65em")}
            onMouseLeave={e => (e.currentTarget.style.gap = "0.4em")}
          >
            Ver catálogo <span aria-hidden="true">→</span>
          </Link>

          <span style={{ color: "hsl(220 15% 72%)", fontSize: "0.7rem" }} aria-hidden="true">·</span>

          <button
            onClick={() => document.getElementById("filosofia")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontSize: "clamp(0.78rem, 1.2vw, 0.92rem)",
              fontWeight: 300,
              color: "hsl(220 15% 46%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              letterSpacing: "0.03em",
              transition: "color 200ms ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "hsl(220 15% 18%)")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "hsl(220 15% 46%)")}
          >
            Conocer filosofía
          </button>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: ready ? Math.min(0.4, lettersOpacity * 0.7) : 0,
          transition: ready ? `opacity 800ms ease ${HINT_DELAY}ms` : "none",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "hsl(220 15% 46%)" }}>
          scroll
        </span>
        <div style={{ width: "1px", height: "38px", background: "hsl(220 15% 46%)", animation: "scroll-hint-pulse 2.2s ease-in-out infinite", transformOrigin: "top" }} />
      </div>

      <style>{`
        @keyframes scroll-hint-pulse {
          0%, 100% { transform: scaleY(1);   opacity: 0.45; }
          55%       { transform: scaleY(0.28); opacity: 0.07; }
        }
      `}</style>
    </section>
  );
};

export default HeroPapacho;
