import lifestyleImage from "@/assets/lifestyle-1.png";

const Emotion = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-papachoa-peach blob-shape opacity-40" />
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-papachoa-sage rounded-full opacity-30" />

      <div className="container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Image with organic frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-papachoa-sky blob-shape-2 scale-105 -z-10" />
              <div className="blob-shape-2 overflow-hidden">
                <img
                  src={lifestyleImage}
                  alt="Bebé descansando con cobijo Papachoa"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="lg:col-span-7 lg:pl-8">
            <div className="max-w-xl">
              <span className="inline-block bg-papachoa-blush px-4 py-1.5 rounded-full text-sm font-semibold text-foreground/80 mb-8">
                Nuestra filosofía
              </span>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
                Papachoa no vende pijamas.
                <br />
                <span className="italic text-papachoa-blush-dark">
                  Vende calma, descanso y hogar.
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10">
                Creemos que cada momento de descanso merece sentirse especial. 
                Por eso, cada prenda está pensada para hacer tu hogar más suave, 
                más cálido, más tuyo.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Calma", "Ternura", "Apapacho"].map((tag) => (
                  <span 
                    key={tag}
                    className="bg-papachoa-sage/50 text-accent-foreground px-5 py-2 rounded-full text-sm font-medium"
                  >
                    {tag}
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
