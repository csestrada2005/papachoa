const BrandMarquee = () => {
  const items = [
    "Calma",
    "Apapacho",
    "Suavidad",
    "Familia",
    "Descanso",
    "Ternura",
    "Hogar",
  ];

  return (
    <section className="py-4 bg-papachoa-warm-brown overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center">
                <span className="font-display text-xl md:text-2xl text-papachoa-cream/70 italic px-6 md:px-10">
                  {item}
                </span>
                {/* Elegant bullet separator */}
                <span className="text-papachoa-cream/60 text-[0.9em] px-3 leading-none">•</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
