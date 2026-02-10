import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-family.png";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";

const heroImages = [heroImage, hero2, hero3, hero4, hero5];
const INTERVAL = 5000; // 5s per image
const FADE_MS = 800;

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroImages.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, INTERVAL);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <section className="relative min-h-[100svh] bg-papachoa-cream pt-24 pb-8 overflow-hidden flex flex-col">
      {/* ========================================
          LAYER A: Decorative Background Elements
          ======================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-32 w-80 h-80 bg-papachoa-blush/50 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-papachoa-sky/40 rounded-full blur-2xl" />
        <div className="absolute top-1/3 left-8 w-4 h-4 bg-papachoa-sage rounded-full opacity-60" />
        <div className="absolute top-1/2 right-12 w-3 h-3 bg-papachoa-blush-mid rounded-full opacity-70" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-papachoa-sky-mid rounded-full opacity-50" />
        <span className="absolute top-32 right-8 text-2xl opacity-30">✦</span>
        <span className="absolute bottom-40 left-6 text-xl opacity-25">✧</span>
        <span className="absolute top-1/2 right-1/4 text-lg opacity-20">✦</span>
      </div>

      <div className="container flex-1 flex flex-col justify-center relative z-10">
        {/* Hero image – auto-transitioning inside the same organic mask */}
        <div className="relative mx-auto w-full max-w-[280px] md:max-w-[320px] mb-3">
          <div className="absolute inset-0 bg-papachoa-blush/40 blob-shape scale-105 pointer-events-none" />

          {/* Locked aspect-ratio container – prevents CLS */}
          <div
            className="relative w-full"
            style={{ clipPath: "url(#hero-blob)", aspectRatio: "1 / 1" }}
          >
            {heroImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Familia usando pijamas Papachoa"
                className={`absolute inset-0 w-full h-full object-cover will-change-[opacity] ${i === 0 ? "object-[62%_18%]" : ""}`}
                style={{
                  opacity: i === current ? 1 : 0,
                  transition: `opacity ${FADE_MS}ms ease-in-out`,
                }}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            ))}
          </div>

          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
                <path d="M0.5,0.02 C0.75,-0.02,0.97,0.15,0.98,0.4 C0.99,0.65,0.85,0.88,0.6,0.97 C0.35,1.06,0.1,0.9,0.03,0.65 C-0.04,0.4,0.25,0.06,0.5,0.02Z" />
              </clipPath>
            </defs>
          </svg>
        </div>

        {/* Text content */}
        <div className="text-center">
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-3">
            Pensado por
            <br />
            <span className="italic text-papachoa-blush-dark">mamás,</span> para mamás
          </h1>
          
          <p className="text-base text-muted-foreground font-light mb-6 max-w-xs mx-auto">
            Pijamas y cobijos ultra suaves que apapachan a toda la familia
          </p>

          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 bg-papachoa-warm-brown text-card font-semibold px-7 py-3.5 rounded-full hover:scale-105 active:scale-95 transition-transform duration-150 shadow-lg text-sm"
          >
            Ver colección
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>

      {/* Subtle wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L60 55C120 50 240 42 360 40C480 38 600 42 720 44C840 46 960 46 1080 44C1200 42 1320 38 1380 36L1440 34V60H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
