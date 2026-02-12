import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";
import { useScrollDisarrange } from "@/hooks/useScrollDisarrange";
import lifestyleImage from "@/assets/lifestyle-1.png";

const Emotion = () => {
  const parallaxRef = useParallax(0.1);
  const stitchRef = useDrawOnScroll(0.4);
  const disarrangeRef = useScrollDisarrange({ maxRotate: 3, maxTranslate: 15 });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden texture-linen texture-woven">
      {/* Floating fabric shadow shapes — parallax */}
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform">
        <div className="absolute -top-16 -right-16 w-64 h-64 opacity-[0.06] animate-drift"
          style={{
            background: "radial-gradient(ellipse 60% 80%, hsl(38 60% 52% / 0.3), transparent 70%)",
            borderRadius: "45% 55% 50% 50% / 55% 45% 55% 45%"
          }} />
        <div className="absolute bottom-10 -left-10 w-48 h-48 opacity-[0.05] animate-drift-slow"
          style={{
            background: "radial-gradient(circle, hsl(162 22% 42% / 0.25), transparent 70%)",
            borderRadius: "50% 50% 35% 65% / 40% 60% 40% 60%"
          }} />
      </div>

      <div className="container relative z-10" ref={disarrangeRef}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Image with fabric-cut frame + paper shadows */}
          <div className="lg:col-span-5 relative" data-disarrange>
            <div className="relative max-w-sm mx-auto lg:max-w-none paper-shadow">
              <div className="frame-fabric-2 overflow-hidden">
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
              <svg className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <rect x="2" y="2" width="96" height="96" rx="2" fill="none" stroke="hsl(14 52% 46% / 0.18)" strokeWidth="0.5" strokeDasharray="2 3.5" />
              </svg>
            </div>
          </div>

          {/* Editorial text */}
          <div className="lg:col-span-7 lg:pl-8" data-disarrange>
            <div className="max-w-xl">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-6" data-disarrange>
                Nuestra filosofía
              </p>
              
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8" data-disarrange>
                Papachoa no vende pijamas.
                <br />
                <em className="text-primary">
                  Vende calma, descanso y hogar.
                </em>
              </h2>
              
              <p className="text-lg text-muted-foreground font-light leading-relaxed mb-10" data-disarrange>
                Creemos que cada momento de descanso merece sentirse especial. 
                Por eso, cada prenda está pensada para hacer tu hogar más suave, 
                más cálido, más tuyo.
              </p>

              <div ref={stitchRef} className="divider-cross-stitch w-24 mb-8" />

              <div className="flex flex-wrap gap-3">
                {["Calma", "Ternura", "Apapacho"].map((tag) => (
                  <span 
                    key={tag}
                    data-disarrange
                    className="border border-primary/20 text-foreground/70 px-5 py-2.5 text-sm font-medium tracking-wide relative"
                    style={{ borderRadius: "2px" }}
                  >
                    <svg className="absolute -top-[3px] -left-[3px] w-[6px] h-[6px]" viewBox="0 0 6 6">
                      <line x1="0" y1="3" x2="6" y2="3" stroke="hsl(14 52% 46% / 0.3)" strokeWidth="1" />
                      <line x1="3" y1="0" x2="3" y2="6" stroke="hsl(14 52% 46% / 0.3)" strokeWidth="1" />
                    </svg>
                    <svg className="absolute -top-[3px] -right-[3px] w-[6px] h-[6px]" viewBox="0 0 6 6">
                      <line x1="0" y1="3" x2="6" y2="3" stroke="hsl(14 52% 46% / 0.3)" strokeWidth="1" />
                      <line x1="3" y1="0" x2="3" y2="6" stroke="hsl(14 52% 46% / 0.3)" strokeWidth="1" />
                    </svg>
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
