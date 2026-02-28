const WORDS = ["SUAVIDAD", "FAMILIA", "DESCANSO", "TERNURA", "HOGAR", "APAPACHO", "CALMA"];

const BrandMarquee = () => (
  <section className="brand-marquee" aria-label="Valores de la marca Papachoa">
    <style>{`
      .brand-marquee {
        background: hsl(var(--papachoa-warm-brown));
        color: hsl(var(--primary-foreground));
      }

      .brand-marquee__viewport {
        overflow: hidden;
        width: 100%;
      }

      .brand-marquee__track {
        display: flex;
        width: max-content;
        animation: brand-marquee-scroll 26s linear infinite;
        will-change: transform;
        transform: translateZ(0);
      }

      .brand-marquee__group {
        display: flex;
        align-items: center;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .brand-marquee__word {
        display: inline-flex;
        align-items: center;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        letter-spacing: 0.14em;
        font-size: clamp(0.72rem, 1.2vw, 0.92rem);
        padding: 1rem 0;
        text-transform: uppercase;
      }

      .brand-marquee__dot {
        margin: 0 1.25rem;
        opacity: 0.85;
      }

      @keyframes brand-marquee-scroll {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .brand-marquee__track {
          animation: none;
        }
      }
    `}</style>

    <div className="brand-marquee__viewport">
      <div className="brand-marquee__track">
        <div className="brand-marquee__group">
          {WORDS.map((word, idx) => (
            <span key={`group-a-${idx}`} className="brand-marquee__word">
              {word}
              <span className="brand-marquee__dot" aria-hidden="true">•</span>
            </span>
          ))}
        </div>

        <div className="brand-marquee__group" aria-hidden="true">
          {WORDS.map((word, idx) => (
            <span key={`group-b-${idx}`} className="brand-marquee__word">
              {word}
              <span className="brand-marquee__dot" aria-hidden="true">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default BrandMarquee;
