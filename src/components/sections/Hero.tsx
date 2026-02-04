import heroImage from "@/assets/hero-family.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-papachoa-cream pt-28 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-32 right-0 w-72 h-72 bg-papachoa-blush blob-shape opacity-60 -z-10" />
      <div className="absolute bottom-20 left-0 w-48 h-48 bg-papachoa-sky blob-shape-2 opacity-50 -z-10" />
      <div className="absolute top-1/2 left-10 w-20 h-20 bg-papachoa-sage rounded-full opacity-40 -z-10" />

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Text content */}
          <div className="order-2 lg:order-1 text-center lg:text-left pb-12 lg:pb-0">
            <div className="inline-block bg-papachoa-sage/60 px-4 py-1.5 rounded-full mb-6">
              <span className="text-sm font-semibold text-accent-foreground">🧸 Nueva colección</span>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-[1.1] mb-6">
              Pensado por
              <br />
              <span className="italic text-papachoa-blush-dark">mamás,</span>
              <br />
              para mamás
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-md mx-auto lg:mx-0">
              Pijamas y cobijos ultra suaves que apapachan a toda la familia
            </p>

            <a
              href="/catalogo"
              className="inline-flex items-center gap-3 bg-papachoa-warm-brown text-card font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
            >
              Descubrir colección
              <span className="text-xl">→</span>
            </a>
          </div>

          {/* Image with organic frame */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Organic background shape */}
              <div className="absolute inset-0 bg-papachoa-blush blob-shape scale-110 -z-10" />
              
              {/* Main image */}
              <div className="blob-shape overflow-hidden">
                <img
                  src={heroImage}
                  alt="Familia usando pijamas Papachoa"
                  className="w-full h-full object-cover aspect-[4/5]"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -bottom-4 -left-4 md:bottom-8 md:-left-8 bg-card rounded-3xl shadow-xl p-4 md:p-5 animate-float">
                <p className="font-display text-lg text-foreground">
                  Ultra <span className="italic text-papachoa-blush-dark">suave</span> ✨
                </p>
              </div>
              
              <div className="absolute top-10 -right-2 md:top-20 md:-right-6 bg-papachoa-sage rounded-2xl shadow-lg p-3 md:p-4 animate-float" style={{ animationDelay: "1s" }}>
                <p className="text-sm font-semibold text-accent-foreground">🇲🇽 Hecho en México</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
