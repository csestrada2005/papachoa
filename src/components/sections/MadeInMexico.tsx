import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";
import { useScrollDisarrange } from "@/hooks/useScrollDisarrange";

const features = [
  { label: "Comercio justo", icon: "heart" },
  { label: "Hecho a mano", icon: "loom" },
  { label: "100% Mexicano", icon: "sun" },
];

const MadeInMexico = () => {
  const parallaxRef = useParallax(0.12);
  const stitchRef = useDrawOnScroll(0.4);
  const disarrangeRef = useScrollDisarrange({ maxRotate: 4, maxTranslate: 18, maxScale: 0.03 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden texture-linen texture-woven">
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute -top-10 -right-10 w-40 h-40 opacity-[0.05] animate-drift"
          style={{
            background: "radial-gradient(circle, hsl(162 22% 42% / 0.3), transparent 70%)",
            borderRadius: "50% 50% 35% 65% / 60% 40% 60% 40%"
          }} />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 opacity-[0.04] animate-drift-slow"
          style={{
            background: "radial-gradient(circle, hsl(14 52% 46% / 0.2), transparent 70%)",
            borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%"
          }} />

        <svg className="absolute bottom-8 right-8 w-48 h-64 opacity-[0.025] hidden md:block" viewBox="0 0 100 140">
          <path d="M50 5 C65 8 78 15 82 30 C86 45 80 55 85 70 C90 85 75 95 70 105 C65 115 55 120 50 130 C45 120 35 115 30 105 C25 95 10 85 15 70 C20 55 14 45 18 30 C22 15 35 8 50 5Z" 
            fill="none" stroke="hsl(20 32% 20%)" strokeWidth="1.5" strokeDasharray="3 4" />
        </svg>
      </div>

      <div className="container relative z-10" ref={disarrangeRef}>
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-10" data-disarrange>
            <div className="px-6 py-2.5 relative" style={{ border: "1.5px dashed hsl(14 52% 46% / 0.25)", borderRadius: "2px" }}>
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-primary font-medium">Hecho en México con amor</span>
            </div>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center leading-tight mb-8" data-disarrange>
            Cada prenda tiene
            <br />
            <em className="text-primary">nombre y apellido</em>
          </h2>

          <p className="text-center text-lg md:text-xl text-muted-foreground font-light max-w-xl mx-auto mb-6 leading-relaxed" data-disarrange>
            Trabajamos con talleres locales bajo principios de comercio justo. 
            Cada pijama lleva el cuidado de artesanas que ponen el corazón en cada puntada.
          </p>

          <div ref={stitchRef} className="divider-cross-stitch w-20 mx-auto mb-14" />

          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {features.map((item) => (
              <div key={item.label} className="text-center" data-disarrange>
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 flex items-center justify-center relative" style={{ borderRadius: "3px" }}>
                  <div className="absolute inset-0" style={{
                    border: "1.5px dashed hsl(var(--border) / 0.5)",
                    borderRadius: "3px"
                  }} />
                  <svg className="w-7 h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3">
                    {item.icon === "heart" && (
                      <path d="M12 21C12 21 4 15 4 9.5C4 7 6 4 8.5 4C10 4 11.5 5 12 6.5C12.5 5 14 4 15.5 4C18 4 20 7 20 9.5C20 15 12 21 12 21Z" stroke="hsl(14 52% 46%)" />
                    )}
                    {item.icon === "loom" && (
                      <>
                        <path d="M4 4V20" stroke="hsl(38 60% 52%)" />
                        <path d="M8 4V20" stroke="hsl(38 60% 52%)" />
                        <path d="M12 4V20" stroke="hsl(38 60% 52%)" />
                        <path d="M16 4V20" stroke="hsl(38 60% 52%)" />
                        <path d="M20 4V20" stroke="hsl(38 60% 52%)" />
                        <path d="M2 8H22" stroke="hsl(14 52% 46%)" />
                        <path d="M2 14H22" stroke="hsl(14 52% 46%)" />
                      </>
                    )}
                    {item.icon === "sun" && (
                      <>
                        <circle cx="12" cy="12" r="5" stroke="hsl(38 60% 52%)" />
                        <path d="M12 2V5" stroke="hsl(14 52% 46%)" />
                        <path d="M12 19V22" stroke="hsl(14 52% 46%)" />
                        <path d="M4.22 4.22L6.34 6.34" stroke="hsl(14 52% 46%)" />
                        <path d="M17.66 17.66L19.78 19.78" stroke="hsl(14 52% 46%)" />
                        <path d="M2 12H5" stroke="hsl(14 52% 46%)" />
                        <path d="M19 12H22" stroke="hsl(14 52% 46%)" />
                        <path d="M4.22 19.78L6.34 17.66" stroke="hsl(14 52% 46%)" />
                        <path d="M17.66 6.34L19.78 4.22" stroke="hsl(14 52% 46%)" />
                      </>
                    )}
                  </svg>
                </div>
                <p className="text-sm md:text-base font-medium text-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L48 55C96 50 192 40 288 38C384 36 480 40 576 43C672 46 768 48 864 46C960 44 1056 38 1152 36C1248 34 1344 36 1392 38L1440 40V60H0Z" 
            className="fill-papachoa-cream"
          />
        </svg>
      </div>
    </section>
  );
};

export default MadeInMexico;
