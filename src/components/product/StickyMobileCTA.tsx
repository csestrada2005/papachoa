import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import type { Product } from "@/data/products";

interface StickyMobileCTAProps {
  product: Product;
  allOptionsSelected: boolean;
}

const StickyMobileCTA = ({ product, allOptionsSelected }: StickyMobileCTAProps) => {
  const { addItem } = useCart();

  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(product.price);

  const needsOptions = (product.shopifyOptions && product.shopifyOptions.length > 0) ||
    product.sizes.length > 1 ||
    (product.sizesSecondary && product.sizesSecondary.length > 0);

  const showAddToCart = !needsOptions || allOptionsSelected;

  const handleClick = () => {
    if (!showAddToCart) {
      // Scroll to the options section
      const el = document.getElementById("product-options");
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
      return;
    }
    addItem(product);
    // item added silently
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/95 backdrop-blur-md border-t border-border/30 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-sm text-foreground leading-tight line-clamp-1">{product.name}</p>
          <p className="text-sm text-muted-foreground">{formattedPrice}</p>
        </div>
        <button
          onClick={handleClick}
          className="btn-artisan text-sm shrink-0"
        >
          <ShoppingBag className="h-4 w-4" />
          {showAddToCart ? "Agregar" : "Ver opciones"}
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
