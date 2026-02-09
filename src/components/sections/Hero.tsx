import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-family.png";

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] bg-papachoa-cream pt-24 pb-8 overflow-hidden flex flex-col">
      {/* ========================================
          LAYER A: Decorative Background Elements
          - NO interactivity
          - NO hotspots
          ======================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large blob top right */}
        <div className="absolute -top-20 -right-32 w-80 h-80 bg-papachoa-blush/50 rounded-full blur-3xl" />
        {/* Blob bottom left */}
        <div className="absolute bottom-20 -left-20 w-60 h-60 bg-papachoa-sky/40 rounded-full blur-2xl" />
        {/* Small accent circles */}
        <div className="absolute top-1/3 left-8 w-4 h-4 bg-papachoa-sage rounded-full opacity-60" />
        <div className="absolute top-1/2 right-12 w-3 h-3 bg-papachoa-blush-mid rounded-full opacity-70" />
        <div className="absolute bottom-1/3 left-1/4 w-2 h-2 bg-papachoa-sky-mid rounded-full opacity-50" />
        {/* Decorative stars/sparkles */}
        <span className="absolute top-32 right-8 text-2xl opacity-30">✦</span>
        <span className="absolute bottom-40 left-6 text-xl opacity-25">✧</span>
        <span className="absolute top-1/2 right-1/4 text-lg opacity-20">✦</span>
      </div>

      <div className="container flex-1 flex flex-col justify-center relative z-10">
        {/* ========================================
            LAYER B: Interactive Image Container
            ======================================== */}
        {/* Hero image – purely visual, no interactivity */}
        <div className="relative mx-auto w-full max-w-[280px] md:max-w-[320px] mb-6">
          <div className="absolute inset-0 bg-papachoa-blush/40 blob-shape scale-105 pointer-events-none" />
          <img
            src={heroImage}
            alt="Familia usando pijamas Papachoa"
            className="relative z-10 w-full h-auto rounded-[2rem] object-cover"
            fetchPriority="high"
            draggable={false}
          />
        </div>

        {/* Text content */}
        <div className="text-center">
          <div className="inline-block bg-papachoa-sage/60 px-3 py-1 rounded-full mb-4">
            <span className="text-xs font-semibold text-accent-foreground">🧸 Nueva colección</span>
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.15] mb-3">
            Pensado por
            <br />
            <span className="italic text-papachoa-blush-dark">mamás,</span> para mamás
          </h1>
          
          <p className="text-base text-muted-foreground font-light mb-6 max-w-xs mx-auto">
            Pijamas y cobijos ultra suaves que apapachan a toda la familia
          </p>

          {/* CTA Button - prominent */}
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
