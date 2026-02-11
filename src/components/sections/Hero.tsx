import { Link } from "react-router-dom";
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

const FloatingDoodle = ({ children, className }: { children: React.ReactNode; className: string }) => (
  <span className={`absolute pointer-events-none select-none ${className}`}>{children}</span>
);

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] pt-24 pb-8 overflow-hidden flex flex-col"
      style={{ background: "linear-gradient(180deg, hsl(40 55% 94%) 0%, hsl(15 50% 92%) 40%, hsl(195 50% 92%) 70%, hsl(145 35% 90%) 100%)" }}>
      {/* Preload hero images */}
      {heroSlides.map((slide, i) => (
        <link key={i} rel="preload" as="image" href={slide.src} />
      ))}

      {/* ── Playful floating doodles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large blobs */}
        <div className="absolute -top-20 -right-24 w-72 h-72 bg-papachoa-blush/40 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-32 -left-16 w-56 h-56 bg-papachoa-sky/50 rounded-full blur-2xl" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-0 w-40 h-40 bg-papachoa-sage/40 rounded-full blur-2xl" style={{ animationDelay: "2s" }} />

        {/* Fun doodles */}
        <FloatingDoodle className="top-28 left-6 text-3xl md:text-4xl animate-float opacity-70">⭐</FloatingDoodle>
        <FloatingDoodle className="top-36 right-8 text-2xl animate-wiggle opacity-60">💛</FloatingDoodle>
        <FloatingDoodle className="top-1/3 left-3 text-xl animate-float opacity-50" >☁️</FloatingDoodle>
        <FloatingDoodle className="bottom-1/3 right-6 text-3xl animate-wiggle opacity-60" >✨</FloatingDoodle>
        <FloatingDoodle className="bottom-48 left-10 text-2xl animate-float opacity-50">🌙</FloatingDoodle>
        <FloatingDoodle className="top-1/2 right-1/4 text-xl animate-wiggle opacity-40">💫</FloatingDoodle>
        
        {/* Scallop dots decorative */}
        <div className="absolute top-24 right-16 hidden md:flex gap-2 opacity-30">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-2.5 h-2.5 rounded-full bg-papachoa-blush-dark" />
          ))}
        </div>
        <div className="absolute bottom-40 left-20 hidden md:flex flex-col gap-2 opacity-25">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-papachoa-sky-mid" />
          ))}
        </div>
      </div>

      <div className="container flex-1 flex flex-col justify-center relative z-10">
        {/* Hero image – playful flower-shaped mask */}
        <div className="relative mx-auto w-full max-w-[300px] md:max-w-[340px] mb-6">
          {/* Colorful glow behind */}
          <div className="absolute inset-0 scale-[1.15] blur-xl pointer-events-none"
            style={{ background: "radial-gradient(circle, hsl(15 50% 80% / 0.5) 0%, hsl(195 50% 85% / 0.3) 50%, transparent 70%)" }} />

          {/* Rotating decorative ring */}
          <div className="absolute inset-0 scale-[1.2] animate-spin-slow pointer-events-none opacity-30">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="20" r="6" fill="hsl(15 55% 75%)" />
              <circle cx="180" cy="100" r="5" fill="hsl(195 45% 78%)" />
              <circle cx="100" cy="180" r="6" fill="hsl(145 30% 70%)" />
              <circle cx="20" cy="100" r="5" fill="hsl(25 60% 85%)" />
            </svg>
          </div>

          {/* Image container with organic blob mask */}
          <div className="relative w-full"
            style={{ clipPath: "url(#hero-blob)", aspectRatio: "1 / 1", contain: "paint" }}>
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
          </div>

          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
                <path d="M0.5,0.02 C0.75,-0.02,0.97,0.15,0.98,0.4 C0.99,0.65,0.85,0.88,0.6,0.97 C0.35,1.06,0.1,0.9,0.03,0.65 C-0.04,0.4,0.25,0.06,0.5,0.02Z" />
              </clipPath>
            </defs>
          </svg>

          {/* Floating sticker badge */}
          <div className="absolute -bottom-2 -right-2 md:bottom-2 md:-right-4 bg-papachoa-blush rounded-2xl px-3 py-2 shadow-lg animate-wiggle rotate-3">
            <span className="font-display text-sm text-foreground">Ultra suave ✨</span>
          </div>
        </div>

        {/* Text content – bigger, more playful */}
        <div className="text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-5">
            Pensado por
            <br />
            <span className="italic text-papachoa-blush-dark relative inline-block">
              mamás,
              {/* Squiggly underline */}
              <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 100 12" preserveAspectRatio="none">
                <path d="M0 6 Q12 0 25 6 Q37 12 50 6 Q62 0 75 6 Q87 12 100 6" fill="none" stroke="hsl(15 40% 60%)" strokeWidth="2.5" />
              </svg>
            </span>{" "}
            para mamás
          </h1>
          
          <p className="text-lg text-muted-foreground font-light mb-8 max-w-sm mx-auto">
            Pijamas y cobijos ultra suaves que apapachan a toda la familia 💛
          </p>

          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2.5 bg-papachoa-warm-brown text-card font-bold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-150 shadow-xl text-base group"
          >
            Ver colección
            <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-8 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">🇲🇽 Hecho en México</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">🧸 Ultra suave</span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1">💝 Envío gratis</span>
          </div>
        </div>
      </div>

      {/* Scalloped wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,40 C60,20 120,60 180,40 C240,20 300,60 360,40 C420,20 480,60 540,40 C600,20 660,60 720,40 C780,20 840,60 900,40 C960,20 1020,60 1080,40 C1140,20 1200,60 1260,40 C1320,20 1380,60 1440,40 V60 H0 Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
