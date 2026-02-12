import { useParallax } from "@/hooks/useParallax";
import { useDrawOnScroll } from "@/hooks/useDrawOnScroll";
import { useScrollDisarrange } from "@/hooks/useScrollDisarrange";

const StoriesThread = () => {
  const parallaxRef = useParallax(0.18);
  const stitchRef = useDrawOnScroll(0.3);
  const disarrangeRef = useScrollDisarrange({ maxRotate: 4, maxTranslate: 22, maxScale: 0.03 });

  const stories = [
    {
      title: "Recién nacido",
      description: "Cada hilo es un primer abrazo. Suavidad que envuelve desde el día uno.",
      accent: "hsl(14 52% 46%)",
    },
    {
      title: "Familia",
      description: "Momentos que se tejen juntos. Pijamas que unen a quienes más amas.",
      accent: "hsl(38 60% 52%)",
    },
    {
      title: "Descanso",
      description: "El ritual de cada noche merece textiles pensados con intención.",
      accent: "hsl(162 22% 42%)",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden section-indigo texture-linen texture-woven">
      <div ref={parallaxRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04] animate-drift-slow" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.6" strokeDasharray="3 5" />
          <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.5" strokeDasharray="4 6" />
          <circle cx="100" cy="100" r="90" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.4" strokeDasharray="2 8" />
          {[...Array(16)].map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180;
            const x1 = 100 + 52 * Math.cos(angle);
            const y1 = 100 + 52 * Math.sin(angle);
            const x2 = 100 + 68 * Math.cos(angle);
            const y2 = 100 + 68 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(38 60% 62%)" strokeWidth="0.5" strokeDasharray="2 3" />;
          })}
        </svg>
      </div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <p className="font-body text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: "hsl(38 60% 62%)" }}>
            De hilo en hilo
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.02]">
            Historias en
            <br />
            <em style={{ color: "hsl(38 60% 62%)" }}>cada hilo</em>
          </h2>
        </div>

        <div ref={stitchRef} className="embroidery-line max-w-lg mx-auto mb-16" />

        <div className="grid md:grid-cols-3 gap-10 md:gap-16 max-w-5xl mx-auto" ref={disarrangeRef}>
          {stories.map((story, i) => (
            <div key={story.title} className="text-center md:text-left relative" data-disarrange>
              <div className="hidden md:block absolute -left-8 top-0 bottom-0 w-[1px]"
                style={{
                  backgroundImage: `repeating-linear-gradient(180deg, ${story.accent}33 0px, ${story.accent}33 4px, transparent 4px, transparent 8px)`
                }}
              />
              
              <span className="font-display text-6xl md:text-7xl block mb-3 leading-none" style={{ color: `${story.accent}20` }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl mb-3">
                {story.title}
              </h3>
              <p className="font-light leading-relaxed text-sm" style={{ color: "hsl(38 20% 72%)" }}>
                {story.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesThread;
