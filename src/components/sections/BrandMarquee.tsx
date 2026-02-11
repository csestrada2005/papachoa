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
                {/* Cross-stitch dot separator */}
                <svg className="w-3 h-3 text-papachoa-cream/25 flex-shrink-0" viewBox="0 0 12 12">
                  <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
