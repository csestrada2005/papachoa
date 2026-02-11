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

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] pt-24 pb-12 overflow-hidden flex flex-col section-terracotta texture-linen">
      {/* Preload */}
      {heroSlides.map((slide, i) => (
        <link key={i} rel="preload" as="image" href={slide.src} />
      ))}

      {/* Woven textile overlay */}
      <div className="absolute inset-0 pointer-events-none texture-woven" />

      {/* Deep layered background — Oaxacan sunset + fabric shadows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm radial glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 70% 60% at 30% 50%, hsl(14 52% 46% / 0.08), transparent 60%)"
        }} />
        {/* Folded fabric shadow shapes — floating */}
        <div className="absolute -top-10 -right-24 w-72 h-72 opacity-[0.07] animate-drift"
          style={{
            background: "radial-gradient(ellipse 60% 80%, hsl(38 60% 52% / 0.5), transparent 70%)",
            borderRadius: "40% 60% 55% 45% / 50% 40% 60% 50%"
          }} />
        <div className="absolute bottom-20 -left-16 w-56 h-56 opacity-[0.06] animate-drift-slow"
          style={{
            background: "radial-gradient(ellipse 70% 50%, hsl(228 38% 28% / 0.4), transparent 70%)",
            borderRadius: "55% 45% 40% 60% / 45% 55% 45% 55%"
          }} />
        <div className="absolute top-1/3 right-12 w-40 h-40 opacity-[0.05] animate-float-gentle"
          style={{
            background: "radial-gradient(circle, hsl(162 22% 42% / 0.4), transparent 70%)",
            borderRadius: "50% 50% 35% 65% / 60% 40% 60% 40%"
          }} />

        {/* Embroidered sun motif — large, atmospheric */}
        <svg className="absolute top-[15%] left-[15%] w-[400px] h-[400px] opacity-[0.035] animate-drift-slow" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(38 60% 52%)" strokeWidth="0.8" strokeDasharray="3 5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(14 52% 46%)" strokeWidth="0.6" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(38 60% 52%)" strokeWidth="0.4" strokeDasharray="2 8" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 100 + 52 * Math.cos(angle);
            const y1 = 100 + 52 * Math.sin(angle);
            const x2 = 100 + 68 * Math.cos(angle);
            const y2 = 100 + 68 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(38 60% 52%)" strokeWidth="0.6" strokeDasharray="2 3" />;
          })}
        </svg>
      </div>

      <div className="container flex-1 flex flex-col justify-center relative z-10">
        {/* EDITORIAL LAYOUT: Image + overlapping typography */}
        <div className="relative mx-auto w-full max-w-lg md:max-w-2xl">
          {/* Image — fabric-cut frame with paper shadow layers */}
          <div className="relative mx-auto w-[260px] md:w-[300px] mb-4">
            {/* Paper shadow layers */}
            <div className="absolute inset-[-8px] opacity-15 rotate-[2deg] pointer-events-none"
              style={{
                background: "hsl(14 38% 74%)",
                clipPath: "polygon(2% 4%, 6% 1%, 15% 3%, 25% 0%, 35% 2%, 48% 0%, 60% 1%, 72% 0%, 82% 2%, 92% 0%, 97% 3%, 100% 8%, 99% 18%, 100% 30%, 98% 42%, 100% 55%, 99% 68%, 100% 78%, 98% 88%, 100% 95%, 96% 98%, 88% 100%, 78% 97%, 65% 100%, 52% 98%, 40% 100%, 28% 99%, 18% 100%, 8% 98%, 2% 100%, 0% 94%, 1% 82%, 0% 70%, 2% 58%, 0% 45%, 1% 32%, 0% 20%, 2% 10%)",
                filter: "blur(8px)"
              }} />
            <div className="absolute inset-[-12px] opacity-10 rotate-[-1.5deg] pointer-events-none"
              style={{
                background: "hsl(38 45% 80%)",
                clipPath: "polygon(4% 2%, 12% 0%, 22% 3%, 35% 1%, 50% 0%, 65% 2%, 78% 0%, 88% 1%, 96% 3%, 100% 6%, 98% 15%, 100% 28%, 99% 40%, 100% 52%, 98% 65%, 100% 80%, 99% 90%, 100% 96%, 95% 100%, 85% 97%, 72% 100%, 58% 98%, 45% 100%, 32% 99%, 20% 100%, 10% 98%, 3% 100%, 0% 92%, 2% 80%, 0% 65%, 1% 50%, 0% 35%, 2% 22%, 0% 12%)",
                filter: "blur(12px)"
              }} />

            {/* Stitched frame border — drawn around image */}
            <svg className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
              <rect x="1" y="1" width="98" height="98" rx="2" fill="none" stroke="hsl(14 52% 46% / 0.25)" strokeWidth="0.6" strokeDasharray="2.5 3.5" />
            </svg>

            {/* Image — fabric-cut edge */}
            <div className="relative w-full frame-fabric" style={{ aspectRatio: "1 / 1", contain: "paint" }}>
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
          </div>

          {/* Typography — overlaps upward into image zone */}
          <div className="text-center relative -mt-2">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Textiles artesanales para la familia
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.05] mb-5">
              Pensado por
              <br />
              <em className="text-primary">mam&aacute;s,</em> para mam&aacute;s
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground font-light mb-8 max-w-sm mx-auto leading-relaxed">
              Pijamas y cobijos ultra suaves que apapachan a toda la familia
            </p>

            <Link to="/catalogo" className="btn-artisan">
              Ver colecci&oacute;n
              <span className="text-lg">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Organic curve divider */}
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
