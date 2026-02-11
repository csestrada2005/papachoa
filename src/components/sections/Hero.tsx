import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useParallax } from "@/hooks/useParallax";
import heroImage from "@/assets/hero-family.png";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const heroSlides = [
  { src: heroImage, alt: "Familia usando pijamas Papachoa", pos: "52% 60%" },
  { src: hero2, alt: "Pijamas Papachoa estilo 2", pos: "50% 35%" },
  { src: hero3, alt: "Pijamas Papachoa estilo 3", pos: "50% 30%" },
  { src: hero4, alt: "Pijamas Papachoa estilo 4", pos: "50% 40%" },
  { src: hero5, alt: "Pijamas Papachoa estilo 5", pos: "50% 55%" },
];

/* Floating thread particles */
const ThreadParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className="thread-particle"
        style={{
          left: `${15 + i * 14}%`,
          height: `${20 + (i % 3) * 12}px`,
          background: `hsl(${[14, 38, 162, 38, 14, 228][i]} ${[52, 60, 22, 45, 38, 28][i]}% ${[46, 52, 42, 80, 74, 58][i]}%)`,
          animationDuration: `${12 + i * 4}s`,
          animationDelay: `${i * 2.5}s`,
        }}
      />
    ))}
  </div>
);

const Hero = () => {
  const parallaxRef = useParallax(0.08);
  const stitchRef = useRef<SVGRectElement>(null);
  const [stitchVisible, setStitchVisible] = useState(false);

  /* Animate stitched border on load */
  useEffect(() => {
    const timer = setTimeout(() => setStitchVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col">
      {/* Preload */}
      {heroSlides.map((slide, i) => (
        <link key={i} rel="preload" as="image" href={slide.src} />
      ))}

      {/* FULL-WIDTH IMAGE BACKGROUND */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <img
            key={i}
            src={slide.src}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover hero-slide hero-slide-${i}`}
            style={{ objectPosition: slide.pos, willChange: "opacity" }}
            fetchPriority={i === 0 ? "high" : undefined}
            loading="eager"
            draggable={false}
          />
        ))}
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
        {/* Textile texture overlay */}
        <div className="absolute inset-0 texture-linen" style={{ opacity: 0.03 }} />
      </div>

      {/* Parallax floating decorative elements */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none will-change-transform z-[1]">
        <div className="absolute -top-10 -right-24 w-72 h-72 opacity-[0.08] animate-drift"
          style={{
            background: "radial-gradient(ellipse 60% 80%, hsl(38 60% 52% / 0.5), transparent 70%)",
            borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%"
          }} />
        <div className="absolute bottom-32 -left-16 w-56 h-56 opacity-[0.06] animate-drift-slow"
          style={{
            background: "radial-gradient(ellipse 70% 50%, hsl(14 52% 46% / 0.4), transparent 70%)",
            borderRadius: "55% 45% 40% 60% / 45% 55% 45% 55%"
          }} />
      </div>

      <ThreadParticles />

      {/* Content — centered */}
      <div className="flex-1 flex flex-col justify-center items-center relative z-10 pt-28 pb-20 md:pb-28">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-body text-[11px] tracking-[0.4em] uppercase text-white/70 mb-5">
              Textiles artesanales para la familia
            </p>

            <h1 className="font-display text-5xl md:text-6xl lg:text-8xl text-white leading-[1.05] mb-6 drop-shadow-lg">
              Pensado por
              <br />
              <em className="hero-mamas-word text-papachoa-marigold-light relative inline-block cursor-default">
                mamás,
                <span className="absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 transition-transform duration-500 ease-out"
                  style={{
                    backgroundImage: "repeating-linear-gradient(90deg, hsl(38 60% 72%) 0px, hsl(38 60% 72%) 4px, transparent 4px, transparent 7px)",
                  }}
                />
              </em>{" "}
              para mamás
            </h1>

            <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-lg mx-auto leading-relaxed">
              Pijamas y cobijos ultra suaves que apapachan a toda la familia
            </p>

            <Link to="/catalogo" className="btn-artisan inline-flex text-base px-10 py-4">
              Ver colección
              <span className="text-xl">→</span>
            </Link>
          </div>

          {/* Animated stitched frame — draws itself */}
          <svg
            className="absolute bottom-8 right-4 md:bottom-16 md:right-12 w-32 h-32 md:w-48 md:h-48 opacity-[0.15] pointer-events-none hidden md:block"
            viewBox="0 0 100 100"
          >
            <rect
              ref={stitchRef}
              x="5" y="5" width="90" height="90" rx="3"
              fill="none"
              stroke="hsl(38 60% 72%)"
              strokeWidth="0.8"
              strokeDasharray="3 4"
              strokeDashoffset={stitchVisible ? 0 : 380}
              style={{
                transition: "stroke-dashoffset 3s cubic-bezier(.22,1,.36,1)",
              }}
            />
            {/* Inner stitch */}
            <rect
              x="12" y="12" width="76" height="76" rx="2"
              fill="none"
              stroke="hsl(14 52% 60%)"
              strokeWidth="0.5"
              strokeDasharray="2 5"
              strokeDashoffset={stitchVisible ? 0 : 320}
              style={{
                transition: "stroke-dashoffset 4s cubic-bezier(.22,1,.36,1) 0.5s",
              }}
            />
          </svg>
        </div>
      </div>

      {/* Organic gradient transition to next section — no hard line */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 100%)",
        }}
      />
    </section>
  );
};

export default Hero;
