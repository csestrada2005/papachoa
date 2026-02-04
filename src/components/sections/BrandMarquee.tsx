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
    <section className="py-6 bg-papachoa-sky overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {items.map((item, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center">
                <span className="font-display text-2xl md:text-3xl text-secondary-foreground px-6 md:px-10">
                  {item}
                </span>
                <span className="text-secondary-foreground/40 text-2xl">❋</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
