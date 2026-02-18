import pajaroAzulClaro from "@/assets/brand/pajaro-azul-claro.png";

const stories = [
  {
    title: "Recién nacido",
    description: "Cada hilo es un primer abrazo. Suavidad que envuelve desde el día uno.",
    color: "hsl(var(--papachoa-coral))",
  },
  {
    title: "Familia",
    description: "Momentos que se tejen juntos. Pijamas que unen a quienes más amas.",
    color: "hsl(var(--papachoa-yellow))",
  },
  {
    title: "Descanso",
    description: "El ritual de cada noche merece textiles pensados con intención.",
    color: "hsl(var(--papachoa-blue))",
  },
];

const StoriesThread = () => (
  <section className="py-24 md:py-36 relative overflow-hidden" style={{ background: "hsl(216 44% 20%)" }}>
    {/* Floating bird */}
    <img
      src={pajaroAzulClaro}
      alt=""
      aria-hidden="true"
      className="absolute top-12 right-8 w-20 md:w-28 opacity-[0.08] animate-drift pointer-events-none"
      loading="lazy"
    />

    <div className="container relative z-10">
      <div className="text-center mb-16 md:mb-20">
        <p className="font-display text-2xl md:text-3xl mb-4" style={{ color: "hsl(47 90% 65%)" }}>
          De hilo en hilo
        </p>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/95 leading-tight">
          Historias en cada hilo
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-10 md:gap-16 max-w-5xl mx-auto">
        {stories.map((story, i) => (
          <div key={story.title} className="text-center md:text-left">
            <span
              className="font-display text-7xl md:text-8xl block mb-3 leading-none"
              style={{ color: `${story.color}`, opacity: 0.2 }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-2xl font-bold text-white mb-3">{story.title}</h3>
            <p className="font-light leading-relaxed text-sm text-white/60">
              {story.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StoriesThread;