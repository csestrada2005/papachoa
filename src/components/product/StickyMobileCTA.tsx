import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import type { Product } from "@/data/products";

interface StickyMobileCTAProps {
  product: Product;
}

const StickyMobileCTA = ({ product }: StickyMobileCTAProps) => {
  const { addItem } = useCart();

  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(product.price);

  const needsOptions = (product.shopifyOptions && product.shopifyOptions.length > 0) ||
    product.sizes.length > 1 ||
    (product.sizesSecondary && product.sizesSecondary.length > 0);

  const handleAdd = () => {
    if (needsOptions) {
      // Scroll to product info section where options are
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast("Selecciona tus opciones antes de agregar al carrito", { duration: 3000 });
      return;
    }
    addItem(product);
    toast(`${product.name} agregado al carrito`, { duration: 3000 });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-card/95 backdrop-blur-md border-t border-border/30 px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-sm text-foreground leading-tight line-clamp-1">{product.name}</p>
          <p className="text-sm text-muted-foreground">{formattedPrice}</p>
        </div>
        <button
          onClick={handleAdd}
          className="btn-artisan text-sm shrink-0"
        >
          <ShoppingBag className="h-4 w-4" />
          {needsOptions ? "Ver opciones" : "Agregar"}
        </button>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
