// Brand marquee — horizontal scrolling words

const items = ["Calma", "Apapacho", "Suavidad", "Familia", "Descanso", "Ternura", "Hogar"];

const BrandMarquee = () => (
  <section
    className="py-4 overflow-hidden"
    style={{
      background: "#FDF6F0",
      willChange: "transform",
      opacity: 1,
      transform: "none",
    }}
  >
    <div
      className="animate-marquee whitespace-nowrap flex"
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {[...Array(3)].map((_, setIndex) => (
        <div key={setIndex} className="flex items-center">
          {items.map((item, index) => (
            <div key={`${setIndex}-${index}`} className="flex items-center">
              <span className="font-body text-sm md:text-base tracking-widest uppercase px-6 md:px-10" style={{ color: "#3D3D3D" }}>
                {item}
              </span>
              <span className="text-primary text-xs mx-2" aria-hidden="true">◆</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default BrandMarquee;