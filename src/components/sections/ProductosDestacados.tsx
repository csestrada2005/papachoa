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
        <h2 className="text-3xl font-bold text-center mb-2" style={{ color: "#ac3c72" }}>
          más vendidos
        </h2>
        <p className="text-center text-muted-foreground mb-12">ropa infantil hecha con amor</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((p, i) => (
            <div
              key={i}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              {/* Placeholder image */}
              <div className="aspect-square bg-gray-100 relative">
                <span
                  className="absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full"
                  style={{ backgroundColor: "#ac3c72" }}
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
                  className="shopify-add-to-cart mt-4 w-full rounded-full py-3 font-semibold text-white transition-colors hover:brightness-110"
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

export default ProductosDestacados;
