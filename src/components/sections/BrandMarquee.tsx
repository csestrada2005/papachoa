const BrandMarquee = () => {
  const items = [
    { text: "Calma", emoji: "☁️" },
    { text: "Apapacho", emoji: "🤗" },
    { text: "Suavidad", emoji: "🧸" },
    { text: "Familia", emoji: "👨‍👩‍👧" },
    { text: "Descanso", emoji: "🌙" },
    { text: "Ternura", emoji: "💛" },
    { text: "Hogar", emoji: "🏠" },
  ];

  const colors = [
    "text-papachoa-blush-dark",
    "text-secondary-foreground",
    "text-accent-foreground",
    "text-papachoa-warm-brown",
    "text-papachoa-blush-dark",
    "text-secondary-foreground",
    "text-accent-foreground",
  ];

  return (
    <section className="py-5 overflow-hidden relative"
      style={{ background: "linear-gradient(90deg, hsl(15 50% 88%) 0%, hsl(195 50% 88%) 50%, hsl(145 35% 82%) 100%)" }}>
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center">
                <span className={`font-display text-2xl md:text-3xl ${colors[index]} px-4 md:px-8`}>
                  {item.emoji} {item.text}
                </span>
                <span className="text-foreground/20 text-xl">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
