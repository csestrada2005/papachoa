import { Link } from "react-router-dom";
import SectionReveal from "@/components/ui/SectionReveal";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const ProductosDestacados = () => {
  const { data: products } = useShopifyProducts();

  const lowStock = (products || [])
    .filter((p) => (p.totalInventory ?? 0) > 0 && p.image !== "/placeholder.svg")
    .sort((a, b) => (a.totalInventory ?? Infinity) - (b.totalInventory ?? Infinity))
    .slice(0, 3);

  if (lowStock.length === 0) return null;

  return (
    <SectionReveal>
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-primary mb-2">
            Más vendidos
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            ropa infantil hecha con amor
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lowStock.map((p) => (
              <Link
                key={p.id}
                to={`/producto/${p.slug}`}
                className="group rounded-2xl overflow-hidden bg-white border border-border/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-lg block"
              >
                <div className="aspect-square relative overflow-hidden bg-muted/20">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 text-xs font-bold text-primary-foreground px-3 py-1 rounded-full bg-primary">
                    Más vendido
                  </span>
                  <span className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full bg-amber-400 text-amber-900">
                    Quedan {p.totalInventory}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground">{p.name}</h3>
                  <p className="text-muted-foreground mt-1">
                    ${p.price.toLocaleString("es-MX")} MXN
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/catalogo"
              className="cta-premium-terracotta group inline-flex items-center gap-2"
            >
              Ver catálogo
              <span className="text-lg inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
};

export default ProductosDestacados;
