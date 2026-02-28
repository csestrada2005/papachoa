import SectionReveal from "@/components/ui/SectionReveal";

const ITEMS = [
  { name: "Cobija Suave", price: 599 },
  { name: "Pantuflas Matching", price: 349 },
  { name: "Antifaz de Dormir", price: 199 },
];

const ComplementaLook = () => (
  <SectionReveal>
    <section className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: "#ac3c72" }}>
          completa el look
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              <div className="aspect-square bg-gray-100" />
              <div className="p-4">
                <h3 className="font-bold text-foreground">{item.name}</h3>
                <p className="text-muted-foreground mt-1">${item.price} MXN</p>
                <button
                  className="mt-4 w-full rounded-full py-3 font-semibold text-white transition-colors hover:brightness-110"
                  style={{ backgroundColor: "#ac3c72" }}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </SectionReveal>
);

export default ComplementaLook;
