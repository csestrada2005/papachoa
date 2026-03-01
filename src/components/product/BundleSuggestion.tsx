import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import { products as localProducts, type Product } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

interface BundleSuggestionProps {
  currentProduct: Product;
}

const BundleSuggestion = ({ currentProduct }: BundleSuggestionProps) => {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const { data: shopifyProducts = [] } = useShopifyProducts();

  // Merge local + shopify, deduplicate by slug
  const allProducts = [...localProducts];
  for (const sp of shopifyProducts) {
    if (!allProducts.some((p) => p.slug === sp.slug)) {
      allProducts.push(sp);
    }
  }

  const suggestions = allProducts
    .filter((p) => p.id !== currentProduct.id && p.image !== "/placeholder.svg")
    .sort((a, b) => {
      if (a.collection === currentProduct.collection && b.collection !== currentProduct.collection) return -1;
      if (b.collection === currentProduct.collection && a.collection !== currentProduct.collection) return 1;
      return 0;
    })
    .slice(0, 2);

  if (suggestions.length === 0) return null;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(price);

  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-xl md:text-2xl text-foreground mb-1">
        Completa el <em>apapacho</em>
      </h2>
      <p className="text-sm text-muted-foreground mb-5 font-light">
        Combina perfecto con&hellip;
      </p>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {suggestions.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/producto/${item.slug}`)}
            className="flex-shrink-0 w-48 bg-card rounded-xl border border-border/30 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="aspect-square bg-papachoa-cream">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3">
              <h4 className="font-display text-sm text-foreground leading-tight mb-1 line-clamp-2">
                {item.name}
              </h4>
              <p className="text-xs text-muted-foreground mb-2">{formatPrice(item.price)}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addItem(item);
                  toast(`${item.name} agregado al carrito`, { duration: 3000 });
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs font-medium bg-primary/10 hover:bg-primary/20 text-primary rounded-lg py-2 active:scale-95 transition-all border border-primary/20"
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BundleSuggestion;
