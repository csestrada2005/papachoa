import { useState } from "react";
import { Minus, Plus, ShoppingBag, ChevronDown } from "lucide-react";
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
  const [selectedSizeSecondary, setSelectedSizeSecondary] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [descOpen, setDescOpen] = useState(false);
  const { addItem } = useCart();

  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(product.price);

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      toast("Selecciona una talla de Mamá antes de agregar al carrito.", { duration: 3000 });
      return;
    }
    if (product.sizesSecondary && product.sizesSecondary.length > 0 && !selectedSizeSecondary) {
      toast("Selecciona una talla de Bebé antes de agregar al carrito.", { duration: 3000 });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast(`${product.name} agregado al carrito`, { duration: 3000 });
  };

  return (
    <div className="flex flex-col gap-5 lg:py-4">
      {/* Collection badge */}
      <span className="inline-block self-start border border-primary/30 px-3 py-1 rounded-md text-xs font-medium tracking-wide text-primary uppercase">
        {collectionLabel}
      </span>

      {/* Title */}
      <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight">
        {product.name}
      </h1>

      {/* Price */}
      <p className="font-display text-xl md:text-2xl text-foreground">
        {formattedPrice} <span className="text-sm font-body text-muted-foreground">MXN</span>
      </p>

      {/* Description dropdown */}
      {product.longDescription && (
        <div className="border border-border/30 rounded-lg overflow-hidden">
          <button
            onClick={() => setDescOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="font-display text-lg md:text-xl text-foreground">Descripción</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${descOpen ? 'rotate-180' : ''}`} />
          </button>
          {descOpen && (
            <div className="px-4 pb-4">
              <div
                className="text-foreground leading-relaxed font-light text-sm prose prose-sm max-w-none
                  [&>p]:mb-3 [&>p:last-child]:mb-0 [&>br]:block [&>br]:mb-2"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            </div>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="embroidery-line w-16" />

      {/* Size selector — Mamá */}
      {product.sizes.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-2 tracking-wide">
            {product.sizesSecondary ? "Talla Mamá" : "Talla"}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all active:scale-95 ${
                  selectedSize === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Size selector — Bebé */}
      {product.sizesSecondary && product.sizesSecondary.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-2 tracking-wide">Talla Bebé</p>
          <div className="flex flex-wrap gap-2">
            {product.sizesSecondary.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSizeSecondary(size)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all active:scale-95 ${
                  selectedSizeSecondary === size
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground border-border hover:border-primary/40"
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
        <p className="text-sm font-medium text-foreground mb-2 tracking-wide">Cantidad</p>
        <div className="inline-flex items-center gap-0 border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-2.5 hover:bg-muted transition-colors active:scale-90"
            aria-label="Reducir cantidad"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
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
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 rounded-lg text-base hover:shadow-md active:scale-[0.98] transition-all"
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          Agregar al carrito
        </Button>
      </div>

      {/* Trust microcopy — no emojis */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground pt-2 tracking-wide">
        <span>Hecho en México</span>
        <span className="text-border">&middot;</span>
        <span>Ultra suave</span>
        <span className="text-border">&middot;</span>
        <span>Envíos a toda la República</span>
      </div>
    </div>
  );
};

export default ProductInfo;
