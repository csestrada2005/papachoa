import lifestyleImage from "@/assets/lifestyle-1.png";

const Emotion = () => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Playful background doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-papachoa-peach/40 blob-shape animate-float" />
        <div className="absolute bottom-10 -left-10 w-32 h-32 bg-papachoa-sage/30 rounded-full blur-xl" />
        <span className="absolute top-16 right-20 text-3xl opacity-30 animate-wiggle hidden md:block">💫</span>
        <span className="absolute bottom-20 left-16 text-2xl opacity-25 animate-float hidden md:block">⭐</span>
        {/* Decorative squiggle */}
        <svg className="absolute top-8 left-1/4 w-24 h-8 opacity-20 hidden md:block" viewBox="0 0 100 20">
          <path d="M0 10 Q12 0 25 10 Q37 20 50 10 Q62 0 75 10 Q87 20 100 10" fill="none" stroke="hsl(15 55% 75%)" strokeWidth="3" />
        </svg>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Image with playful frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* Colorful offset border */}
              <div className="absolute inset-0 bg-papachoa-sky blob-shape-2 scale-105 -z-10 rotate-3" />
              <div className="absolute inset-0 bg-papachoa-blush/50 blob-shape-2 scale-110 -z-20 -rotate-2" />
              <div className="blob-shape-2 overflow-hidden border-4 border-card shadow-xl">
                <img
                  src={lifestyleImage}
                  alt="Bebé descansando con cobijo Papachoa"
                  className="w-full aspect-[3/4] object-cover"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={533}
                />
              </div>
              {/* Fun sticker */}
              <div className="absolute -top-3 -right-3 bg-papachoa-sage rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-wiggle rotate-12 z-10">
                <span className="text-2xl">🤍</span>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="lg:col-span-7 lg:pl-8">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 bg-papachoa-blush px-5 py-2 rounded-full text-sm font-bold text-foreground/80 mb-8 shadow-sm">
                ✨ Nuestra filosofía
              </span>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
                Papachoa no vende pijamas.
                <br />
                <span className="italic text-papachoa-blush-dark relative inline-block">
                  Vende calma, descanso y hogar.
                  <svg className="absolute -bottom-1 left-0 w-full h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0 6 Q25 0 50 6 Q75 12 100 6 Q125 0 150 6 Q175 12 200 6" fill="none" stroke="hsl(15 40% 60%)" strokeWidth="2" />
                  </svg>
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                Creemos que cada momento de descanso merece sentirse especial. 
                Por eso, cada prenda está pensada para hacer tu hogar más suave, 
                más cálido, más tuyo. 💛
              </p>

              <div className="flex flex-wrap gap-3">
                {[
                  { tag: "Calma", emoji: "☁️", bg: "bg-papachoa-sky" },
                  { tag: "Ternura", emoji: "💛", bg: "bg-papachoa-blush" },
                  { tag: "Apapacho", emoji: "🤗", bg: "bg-papachoa-sage" },
                ].map(({ tag, emoji, bg }) => (
                  <span 
                    key={tag}
                    className={`${bg} text-foreground px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:scale-105 transition-transform cursor-default`}
                  >
                    {emoji} {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Emotion;
