const features = [
  { emoji: "💛", label: "Comercio justo", color: "bg-papachoa-blush" },
  { emoji: "✋", label: "Hecho a mano", color: "bg-papachoa-sky" },
  { emoji: "🇲🇽", label: "100% Mexicano", color: "bg-papachoa-sage" },
];

const MadeInMexico = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Playful background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-papachoa-sage/30 blob-shape animate-float" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-papachoa-blush/25 blob-shape-2" />
        <span className="absolute top-16 left-20 text-2xl opacity-25 animate-wiggle hidden md:block">🇲🇽</span>
        <span className="absolute bottom-20 right-16 text-2xl opacity-20 animate-float hidden md:block">💫</span>
      </div>

      <div className="container relative">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-10">
            <div className="bg-papachoa-sage px-6 py-3 rounded-full flex items-center gap-3 shadow-md border-2 border-papachoa-sage-mid/30">
              <span className="text-2xl">🇲🇽</span>
              <span className="font-bold text-accent-foreground">Hecho en México con amor</span>
              <span className="text-2xl">💛</span>
            </div>
          </div>

          {/* Main text */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center leading-tight mb-8">
            Cada prenda tiene
            <br />
            <span className="italic text-papachoa-blush-dark relative inline-block">
              nombre y apellido
              <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                <path d="M0 6 Q25 0 50 6 Q75 12 100 6 Q125 0 150 6 Q175 12 200 6" fill="none" stroke="hsl(145 30% 65%)" strokeWidth="2.5" />
              </svg>
            </span>
          </h2>

          <p className="text-center text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-14 leading-relaxed">
            Trabajamos con talleres locales bajo principios de comercio justo. 
            Cada pijama lleva el cuidado de artesanas que ponen el corazón en cada puntada. ✨
          </p>

          {/* Playful feature cards */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {features.map((item, i) => (
              <div 
                key={item.label} 
                className="text-center group"
                style={{ transform: i === 1 ? "rotate(-2deg)" : i === 2 ? "rotate(1deg)" : "rotate(-1deg)" }}
              >
                <div className={`${item.color} w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-md border-2 border-card/60 group-hover:scale-110 group-hover:rotate-3 transition-all duration-200`}>
                  <span className="text-3xl md:text-4xl">{item.emoji}</span>
                </div>
                <p className="text-sm md:text-base font-bold text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scalloped divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,30 C80,10 160,50 240,30 C320,10 400,50 480,30 C560,10 640,50 720,30 C800,10 880,50 960,30 C1040,10 1120,50 1200,30 C1280,10 1360,50 1440,30 V50 H0 Z" 
            fill="hsl(15 50% 88% / 0.4)"
          />
        </svg>
      </div>
    </section>
  );
};

export default MadeInMexico;
