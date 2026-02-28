import SectionReveal from "@/components/ui/SectionReveal";

const REVIEWS = [
  { text: "La tela es increíblemente suave, mis hijos no se la quieren quitar.", name: "Ana G." },
  { text: "El diseño es precioso y la calidad se nota desde el primer toque.", name: "Laura M." },
  { text: "Por fin encontré pijamas que nos combinan a toda la familia. ¡Hermosas!", name: "Sofía R." },
];

const Stars = () => (
  <div className="flex gap-0.5 mb-3">
    {[...Array(5)].map((_, i) => (
      <span key={i} style={{ color: "#f5ce3e", fontSize: "1.1rem" }}>★</span>
    ))}
  </div>
);

const ResenasSection = () => (
  <SectionReveal>
    <section className="py-20" style={{ backgroundColor: "#fff7f9" }}>
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#ac3c72" }}>
          lo que dicen las mamás
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <Stars />
              <p className="text-foreground mb-4 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <span className="font-bold text-sm text-foreground">{r.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </SectionReveal>
);

export default ResenasSection;
