import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import type { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
  collectionLabel: string;
}

const ProductInfo = ({ product, collectionLabel }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      toast("Selecciona una talla antes de agregar al carrito.", { duration: 3000 });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast(`${product.name} agregado al carrito 🧸`, { duration: 3000 });
  };

  return (
    <div className="flex flex-col gap-5 lg:py-4">
      {/* Collection badge */}
      <span className="inline-block self-start bg-papachoa-blush px-3 py-1 rounded-full text-xs font-semibold text-foreground/70">
        {collectionLabel}
      </span>

      {/* Title */}
      <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
        {product.name}
      </h1>

      {/* Price */}
      <p className="font-display text-xl md:text-2xl text-foreground/80">
        {formattedPrice} <span className="text-sm font-body text-muted-foreground">MXN</span>
      </p>

      {/* Short description */}
      <p className="text-muted-foreground leading-relaxed">
        {product.shortDescription}
      </p>

      {/* Size selector */}
      {product.sizes.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">Talla</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all active:scale-95 ${
                  selectedSize === size
                    ? "bg-papachoa-warm-brown text-card border-papachoa-warm-brown"
                    : "bg-card text-foreground border-border hover:border-papachoa-warm-brown/40"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity stepper */}
      <div>
        <p className="text-sm font-semibold text-foreground mb-2">Cantidad</p>
        <div className="inline-flex items-center gap-0 border border-border rounded-full overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2.5 hover:bg-muted transition-colors active:scale-90"
            aria-label="Reducir cantidad"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-2.5 hover:bg-muted transition-colors active:scale-90"
            aria-label="Aumentar cantidad"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 mt-1">
        <Button
          onClick={handleAddToCart}
          className="w-full bg-papachoa-warm-brown hover:bg-papachoa-warm-brown/90 text-card font-semibold py-6 rounded-full text-base hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Agregar al carrito
        </Button>
      </div>

      {/* Trust microcopy */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-2">
        <span>🇲🇽 Hecho en México</span>
        <span>•</span>
        <span>🧸 Ultra suave</span>
        <span>•</span>
        <span>📦 Envíos a toda la República</span>
      </div>
    </div>
  );
};

export default ProductInfo;
