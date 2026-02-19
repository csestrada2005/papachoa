import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import aoIcon from "@/assets/brand/ao-icon.png";

/* ─────────────────────────────────────────
   HeroPapacho — Elena Borisova dispersed-letters clone
   ─ Letras con position:absolute coordenadas px reales
   ─ CSS @keyframes letterAppear — stagger por índice
   ─ ao-icon.png centrado con mix-blend-mode:multiply
   ─ Parallax + fade-out en scroll via rAF
   ─ Fondo crema → rosa suave al 70% del scroll
   Base viewport: 1200px ancho × 700px alto
   ───────────────────────────────────────── */

/* Scale factors por breakpoint */
function getScaleX(w: number) {
  if (w < 480)  return 0.40;
  if (w < 768)  return 0.55;
  if (w < 1024) return 0.75;
  return 1;
}
function getScaleY(w: number) {
  if (w < 480)  return 0.42;
  if (w < 768)  return 0.56;
  if (w < 1024) return 0.76;
  return 1;
}

/* Base font size at 1× */
const FONT_BASE = 108;

/* ── Letter definitions — base coords for 1200×700px viewport ──
   x: px from left edge
   y: px from top edge (of the hero section, NOT viewport)
   Each letter has a distinct brand colour
*/
interface LetterDef {
  char:  string;
  x:     number;   // px left (base 1200px wide)
  y:     number;   // px top  (base 700px high)
  size?: number;   // override font size in px
  rot?:  number;   // deg rotation
  color: string;
}

const LETTERS: LetterDef[] = [
  // ── Row 1: PIJAMAS ──
  { char: "P", x:  68,  y: 140, rot:  1.2, color: "#A64D8A", size: 112 },
  { char: "I", x: 220,  y: 118, rot: -0.8, color: "#8A8A8A", size:  95 },
  { char: "J", x: 310,  y: 150, rot:  0.6, color: "#D4A92A", size: 108 },
  { char: "A", x: 450,  y: 125, rot: -0.5, color: "#9A9A9A", size: 102 },
  { char: "M", x: 610,  y: 145, rot:  1.0, color: "#7A7A7A", size: 114 },
  { char: "A", x: 770,  y: 115, rot: -1.1, color: "#D64A8C", size: 102 },
  { char: "S", x: 924,  y: 140, rot:  0.7, color: "#4169B5", size: 108 },

  // ── Row 2: QUE ──
  { char: "Q", x: 112,  y: 305, rot: -1.0, color: "#3FA87E", size: 112 },
  { char: "U", x: 262,  y: 328, rot:  1.2, color: "#BBBBBB", size:  98 },
  { char: "E", x: 404,  y: 292, rot: -0.6, color: "#E8C547", size: 104 },

  // ── Row 3: ABRAZAN ──
  { char: "A", x:  72,  y: 490, rot:  0.5, color: "#555555", size: 112 },
  { char: "B", x: 230,  y: 464, rot: -1.0, color: "#8FA6D6", size: 106 },
  { char: "R", x: 378,  y: 502, rot:  1.1, color: "#FF5733", size: 108 },
  { char: "A", x: 530,  y: 472, rot: -0.5, color: "#1A1A1A", size: 102 },
  { char: "Z", x: 688,  y: 512, rot:  0.8, color: "#C1438C", size: 112 },
  { char: "A", x: 840,  y: 478, rot: -1.0, color: "#777777", size: 100 },
  { char: "N", x: 988,  y: 502, rot:  0.9, color: "#FF6B35", size: 108 },
];

const STAGGER_MS   = 68;
const LETTER_DUR   = 380;
const EASING       = "cubic-bezier(0.34, 1.52, 0.64, 1)";
const ICON_DELAY   = 900;
const SUB_DELAY    = LETTERS.length * STAGGER_MS + LETTER_DUR + 60;
const CTA_DELAY    = SUB_DELAY + 170;
const HINT_DELAY   = CTA_DELAY + 280;

/* ── Background colours: cream → warm rose ── */
const BG_FROM = { r: 249, g: 249, b: 249 }; // #F9F9F9
const BG_TO   = { r: 240, g: 229, b: 232 }; // #F0E5E8 rosa suave

const HeroPapacho = () => {
  const [ready,   setReady]   = useState(false);
  const [vw,      setVw]      = useState(1200);
  const [vh,      setVh]      = useState(700);
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number>(0);

  /* Fire ready on first paint */
  useEffect(() => {
    const id = requestAnimationFrame(() => setTimeout(() => setReady(true), 24));
    return () => cancelAnimationFrame(id);
  }, []);

  /* Viewport size tracking */
  const measure = useCallback(() => {
    setVw(window.innerWidth);
    setVh(window.innerHeight);
  }, []);
  useEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* Scroll via rAF */
  useEffect(() => {
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const sx = getScaleX(vw);
  const sy = getScaleY(vw);

  /* Parallax & fade */
  const heroH   = vh;
  const pY      = scrollY * 0.38;                                          // letter parallax
  const opacity = Math.max(0, 1 - scrollY / (heroH * 0.58) * 1.35);       // fade letters
  const bgT     = Math.min(1, Math.max(0, (scrollY - heroH * 0.62) / (heroH * 0.24))); // bg transition

  /* Dynamic background */
  const bg = `rgb(${Math.round(BG_FROM.r + (BG_TO.r - BG_FROM.r) * bgT)},${Math.round(BG_FROM.g + (BG_TO.g - BG_FROM.g) * bgT)},${Math.round(BG_FROM.b + (BG_TO.b - BG_FROM.b) * bgT)})`;

  /* Icon parallax is slightly slower */
  const iconPY = scrollY * 0.28;

  /* Hero min-height: taller on mobile so letters fit */
  const heroMinH = vw < 480 ? "125svh" : vw < 768 ? "110svh" : "100svh";

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: heroMinH, background: bg }}
      aria-label="Hero Papachoa"
    >
      {/* ── CSS keyframes injected once ── */}
      <style>{`
        @keyframes letterAppear {
          0%   { opacity: 0; transform: var(--lt) scale(0.62) translateY(-28px); }
          60%  { opacity: 0.75; }
          100% { opacity: 1; transform: var(--lt) scale(1) translateY(0); }
        }
        @keyframes scroll-hint-bob {
          0%, 100% { transform: scaleY(1);    opacity: 0.42; }
          55%       { transform: scaleY(0.26); opacity: 0.07; }
        }
        @keyframes hint-pulse {
          0%, 100% { opacity: 0.55; transform: translateY(0);  }
          50%       { opacity: 0.25; transform: translateY(4px); }
        }
      `}</style>

      {/* ── Hidden accessible title ── */}
      <h1 className="sr-only">Pijamas Papachoa — Suaves y con magia de hogar. Hechos en México.</h1>

      {/* ══════════════════════════════════════
          SCATTERED LETTERS (absolute positioned)
          ══════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity,
          transform: `translateY(${pY}px)`,
          willChange: "transform, opacity",
          pointerEvents: "none",
          /* Isolation so mix-blend of icon doesn't leak here */
          isolation: "isolate",
        }}
      >
        {LETTERS.map((l, i) => {
          const lx   = l.x * sx;
          const ly   = l.y * sy;
          const fs   = Math.round((l.size ?? FONT_BASE) * Math.min(sx, sy));
          const rot  = l.rot ?? 0;
          /* --lt stores base translate so keyframe can chain scale on top */
          const lt   = `translate(${lx}px, ${ly}px) rotate(${rot}deg)`;
          const delay = i * STAGGER_MS;

          return (
            <span
              key={i}
              style={{
                position:   "absolute",
                left:       0,
                top:        0,
                fontSize:   `${fs}px`,
                fontWeight: 800,
                fontFamily: "'Inter', 'DM Sans', 'Helvetica Neue', sans-serif",
                lineHeight: 1,
                color:      l.color,
                userSelect: "none",
                /* CSS custom property for the keyframe base transform */
                ["--lt" as string]: lt,
                animation:  ready
                  ? `letterAppear ${LETTER_DUR}ms ${EASING} ${delay}ms both`
                  : "none",
                opacity:    ready ? undefined : 0,
              } as React.CSSProperties}
            >
              {l.char}
            </span>
          );
        })}
      </div>

      {/* ══════════════════════════════════════
          CENTRAL ICON — ao-icon, mix-blend-mode:multiply
          ══════════════════════════════════════ */}
      <div
        aria-hidden="true"
        style={{
          position:  "absolute",
          top:       "50%",
          left:      "50%",
          zIndex:    4,
          transform: `translate(-50%, -48%) translateY(${iconPY * 0.3}px) scale(${ready ? 1 : 0.8})`,
          opacity:   ready ? Math.max(0.06, opacity * 0.62) : 0,
          transition: ready
            ? `opacity ${LETTER_DUR * 1.3}ms ease ${ICON_DELAY}ms,
               transform ${LETTER_DUR * 1.3}ms ease ${ICON_DELAY}ms`
            : "none",
          pointerEvents: "none",
        }}
      >
        <img
          src={aoIcon}
          alt=""
          draggable={false}
          loading="eager"
          decoding="async"
          style={{
            width:        `clamp(${vw < 480 ? 90 : 140}px, ${vw < 768 ? 18 : 22}vw, 280px)`,
            height:       "auto",
            display:      "block",
            /* Mix white pixels away over the cream background */
            mixBlendMode: "multiply",
          }}
        />
      </div>

      {/* ══════════════════════════════════════
          BOTTOM CONTENT — eyebrow / subtitle / CTAs
          ══════════════════════════════════════ */}
      <div
        style={{
          position:      "relative",
          zIndex:        10,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          justifyContent:"flex-end",
          minHeight:     heroMinH,
          paddingBottom: "clamp(4.5rem, 11vh, 8rem)",
          textAlign:     "center",
          padding:       `0 clamp(1.25rem,6vw,3rem) clamp(4.5rem,11vh,8rem)`,
          opacity,
          transform:     `translateY(${pY * 0.22}px)`,
          willChange:    "transform, opacity",
          pointerEvents: opacity < 0.08 ? "none" : undefined,
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize:      "clamp(0.68rem, 1.3vw, 0.88rem)",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color:         "#A64D8A",
            fontWeight:    500,
            marginBottom:  "clamp(1.2rem, 3.5vh, 2.5rem)",
            opacity:       ready ? 1 : 0,
            transform:     ready ? "translateY(0)" : "translateY(10px)",
            transition:    ready ? `opacity 580ms ease 180ms, transform 580ms ease 180ms` : "none",
          }}
        >
          Pijamas que abrazan
        </p>

        {/* Subtitle */}
        <p
          style={{
            fontSize:     "clamp(0.88rem, 1.45vw, 1.08rem)",
            color:        "#555555",
            fontWeight:   300,
            maxWidth:     "460px",
            lineHeight:   1.7,
            letterSpacing:"0.018em",
            marginBottom: "clamp(1.6rem, 3.8vh, 2.8rem)",
            opacity:      ready ? 1 : 0,
            transform:    ready ? "translateY(0)" : "translateY(12px)",
            transition:   ready ? `opacity 680ms ease ${SUB_DELAY}ms, transform 680ms ease ${SUB_DELAY}ms` : "none",
          }}
        >
          Suaves, cálidos y con magia de hogar.
          <br />
          Hechos en México con amor.
        </p>

        {/* CTAs */}
        <div
          style={{
            display:        "flex",
            flexWrap:       "wrap",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "clamp(0.75rem, 2.5vw, 1.8rem)",
            opacity:        ready ? 1 : 0,
            transform:      ready ? "scale(1) translateY(0)" : "scale(0.92) translateY(8px)",
            transition:     ready ? `opacity 540ms ease ${CTA_DELAY}ms, transform 540ms ease ${CTA_DELAY}ms` : "none",
          }}
        >
          {/* Primary */}
          <Link
            to="/catalogo"
            style={{
              display:       "inline-flex",
              alignItems:    "center",
              gap:           "0.38em",
              fontSize:      "clamp(0.74rem, 1.15vw, 0.9rem)",
              fontWeight:    600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color:         "#A64D8A",
              borderBottom:  "2px solid #A64D8A",
              paddingBottom: "3px",
              textDecoration:"none",
              transition:    "gap 200ms ease, color 200ms ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.gap = "0.6em"; e.currentTarget.style.color = "#7a3569"; (e.currentTarget.style as CSSStyleDeclaration & { borderColor: string }).borderColor = "#7a3569"; }}
            onMouseLeave={e => { e.currentTarget.style.gap = "0.38em"; e.currentTarget.style.color = "#A64D8A"; (e.currentTarget.style as CSSStyleDeclaration & { borderColor: string }).borderColor = "#A64D8A"; }}
          >
            Ver catálogo <span aria-hidden="true">→</span>
          </Link>

          <span style={{ color: "#CCCCCC", fontSize: "0.65rem" }} aria-hidden="true">·</span>

          {/* Secondary */}
          <button
            onClick={() => document.getElementById("filosofia")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              fontSize:     "clamp(0.74rem, 1.15vw, 0.9rem)",
              fontWeight:   300,
              color:        "#999999",
              background:   "none",
              border:       "none",
              cursor:       "pointer",
              letterSpacing:"0.03em",
              transition:   "color 200ms ease",
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = "#A64D8A")}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = "#999999")}
          >
            Conocer filosofía
          </button>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          bottom:        "1.75rem",
          left:          "50%",
          transform:     "translateX(-50%)",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "0.45rem",
          opacity:       ready ? Math.min(0.42, opacity * 0.72) : 0,
          transition:    ready ? `opacity 800ms ease ${HINT_DELAY}ms` : "none",
          zIndex:        10,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontSize:      "0.58rem",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color:         "#BBBBBB",
            animation:     ready ? "hint-pulse 2.4s ease-in-out infinite" : "none",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width:           "1px",
            height:          "36px",
            background:      "#BBBBBB",
            transformOrigin: "top",
            animation:       ready ? "scroll-hint-bob 2.2s ease-in-out infinite" : "none",
          }}
        />
      </div>
    </section>
  );
};

export default HeroPapacho;
