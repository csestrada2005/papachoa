import SectionReveal from "@/components/ui/SectionReveal";

const PRODUCTS = [
  { name: "Pijama Rosa Familia", price: 899, badge: "Más vendido", limited: true },
  { name: "Pijama Dinosaurio", price: 749, badge: "Más vendido", limited: false },
  { name: "Pijama Blanca Clásica", price: 699, badge: "Más vendido", limited: true },
];

const ProductosDestacados = () => (
  <SectionReveal>
    <section className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold text-center text-primary mb-2">
          más vendidos
        </h2>
        <p className="text-center text-muted-foreground mb-12">ropa infantil hecha con amor</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              {/* Placeholder image with shimmer */}
              <div className="aspect-square relative overflow-hidden" style={{ backgroundColor: "#e5e7eb" }}>
                <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)", animation: "shimmer 1.8s infinite" }} />
                <span
                  className="absolute top-3 left-3 text-xs font-bold text-primary-foreground px-3 py-1 rounded-full bg-primary"
                >
                  {p.badge}
                </span>
                {p.limited && (
                  <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-amber-900">
                    Edición limitada
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground">{p.name}</h3>
                {/* precio dinámico desde Shopify */}
                <p className="text-muted-foreground mt-1">${p.price} MXN</p>
                <button
                  id={`add-to-cart-${i}`}
                  className="shopify-add-to-cart mt-4 w-full rounded-full py-3 font-semibold text-primary-foreground bg-primary transition-colors hover:brightness-110"
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

// Shimmer keyframe injected once
const shimmerStyle = document.getElementById("shimmer-keyframe") || (() => {
  const s = document.createElement("style");
  s.id = "shimmer-keyframe";
  s.textContent = `@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}`;
  document.head.appendChild(s);
  return s;
})();

export default ProductosDestacados;
