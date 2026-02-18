import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import pajaroNaranja from "@/assets/brand/pajaro-naranja.png";
import printPapachoa from "@/assets/brand/print-papachoa.png";

const TAGLINE = "Pijamas que abrazan";
const COLORS = [
  "hsl(331 48% 45%)",  // magenta
  "hsl(47 90% 50%)",   // yellow
  "hsl(14 100% 71%)",  // coral
  "hsl(216 44% 46%)",  // blue
  "hsl(331 48% 45%)",  // magenta
  "hsl(14 100% 71%)",  // coral
  "hsl(47 90% 50%)",   // yellow
  "hsl(216 44% 46%)",  // blue
  "hsl(331 48% 45%)",  // magenta
  "hsl(14 100% 71%)",  // coral
  "hsl(216 44% 46%)",  // blue
  "hsl(47 90% 50%)",   // yellow
  "hsl(331 48% 45%)",  // magenta
  "hsl(14 100% 71%)",  // coral
  "hsl(47 90% 50%)",   // yellow
  "hsl(216 44% 46%)",  // blue
  "hsl(331 48% 45%)",  // magenta
  "hsl(14 100% 71%)",  // coral
];

const getRandomTransform = (i: number) => ({
  "--start-x": `${(Math.random() - 0.5) * 200}px`,
  "--start-y": `${(Math.random() - 0.5) * 150 - 40}px`,
  "--start-rot": `${(Math.random() - 0.5) * 60}deg`,
  animationDelay: `${0.3 + i * 0.08}s`,
});

const Hero = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url(${printPapachoa})`,
          backgroundSize: "400px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Floating bird decoration */}
      <img
        src={pajaroNaranja}
        alt=""
        aria-hidden="true"
        className="absolute top-[15%] right-[8%] w-24 md:w-36 opacity-[0.12] animate-float-gentle pointer-events-none select-none"
        loading="eager"
        draggable={false}
      />

      {/* Content */}
      <div className="container relative z-10 text-center py-32 md:py-40">
        {/* Animated tagline */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold leading-[1.05] mb-8">
          {animate
            ? TAGLINE.split("").map((char, i) =>
                char === " " ? (
                  <span key={i} className="inline-block w-[0.3em]" />
                ) : (
                  <span
                    key={i}
                    className="hero-letter font-display"
                    style={{
                      color: COLORS[i % COLORS.length],
                      ...getRandomTransform(i),
                    } as React.CSSProperties}
                  >
                    {char}
                  </span>
                )
              )
            : <span className="opacity-0">{TAGLINE}</span>
          }
        </h1>

        <p
          className="text-lg md:text-xl text-muted-foreground font-light mb-12 max-w-md mx-auto leading-relaxed"
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 1.8s",
          }}
        >
          Suaves, cálidos y con magia de hogar.
          <br />
          Hechos en México con amor.
        </p>

        <div
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease-out 2.2s",
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