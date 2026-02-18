import pajaroAmarillo from "@/assets/brand/pajaro-amarillo.png";

const items = ["Calma", "Apapacho", "Suavidad", "Familia", "Descanso", "Ternura", "Hogar"];

const BrandMarquee = () => (
  <section className="py-4 overflow-hidden" style={{ background: "hsl(var(--papachoa-warm-brown))" }}>
    <div className="animate-marquee whitespace-nowrap flex">
      {[...Array(3)].map((_, setIndex) => (
        <div key={setIndex} className="flex items-center">
          {items.map((item, index) => (
            <div key={`${setIndex}-${index}`} className="flex items-center">
              <span className="font-body text-sm md:text-base text-white/70 tracking-widest uppercase px-6 md:px-10">
                {item}
              </span>
              <img
                src={pajaroAmarillo}
                alt=""
                aria-hidden="true"
                className="w-4 h-4 opacity-40 mx-2"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  </section>
);

export default BrandMarquee;