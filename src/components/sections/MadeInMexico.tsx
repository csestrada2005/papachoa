import { Heart, Sparkles, MapPin } from "lucide-react";

const MadeInMexico = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-papachoa-sage blob-shape opacity-40" />
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-papachoa-blush blob-shape-2 opacity-30" />

      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-10">
            <div className="bg-papachoa-sage px-6 py-3 rounded-full flex items-center gap-3">
              <span className="text-2xl">🇲🇽</span>
              <span className="font-semibold text-accent-foreground">Hecho en México con amor</span>
            </div>
          </div>

          {/* Main text */}
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center leading-tight mb-8">
            Cada prenda tiene
            <br />
            <span className="italic text-papachoa-blush-dark">nombre y apellido</span>
          </h2>

          <p className="text-center text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-16 leading-relaxed">
            Trabajamos con talleres locales bajo principios de comercio justo. 
            Cada pijama lleva el cuidado de artesanas que ponen el corazón en cada puntada.
          </p>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[
              { icon: Heart, label: "Comercio justo", color: "bg-papachoa-blush" },
              { icon: Sparkles, label: "Hecho a mano", color: "bg-papachoa-sky" },
              { icon: MapPin, label: "100% Mexicano", color: "bg-papachoa-sage" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className={`${item.color} w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="h-7 w-7 md:h-8 md:w-8 text-foreground/80" />
                </div>
                <p className="text-sm md:text-base font-medium text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 80L48 74.7C96 69 192 59 288 58.7C384 59 480 69 576 69.3C672 69 768 59 864 53.3C960 48 1056 48 1152 53.3C1248 59 1344 69 1392 74.7L1440 80V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z" 
            className="fill-papachoa-blush/40"
          />
        </svg>
      </div>
    </section>
  );
};

export default MadeInMexico;
