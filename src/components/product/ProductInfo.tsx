import { useState, useMemo } from "react";
import { Minus, Plus, ShoppingBag, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import type { Product } from "@/data/products";

interface ProductInfoProps {
  product: Product;
  collectionLabel: string;
}

/**
 * Given selected options and variant inventory, find the matching variant.
 * Shopify variant titles are "Option1 / Option2 / ..." joined by " / ".
 */
function findMatchingVariant(
  selections: Record<string, string>,
  variants: Product["variantInventory"],
  optionNames: string[]
) {
  if (!variants || optionNames.length === 0) return undefined;
  // All options must be selected
  if (optionNames.some((name) => !selections[name])) return undefined;

  const selectedValues = optionNames.map((name) => selections[name].toLowerCase().trim());

  return variants.find((v) => {
    const parts = v.title.split(" / ").map((p) => p.toLowerCase().trim());
    // Match if every selected value corresponds to a part
    return selectedValues.every((val, i) => parts[i] === val);
  });
}

/**
 * Check if a specific option value has ANY in-stock variant when combined
 * with the current selections for other options.
 */
function isOptionValueAvailable(
  optionName: string,
  optionValue: string,
  optionIndex: number,
  allOptions: Array<{ name: string; values: string[] }>,
  selections: Record<string, string>,
  variants: Product["variantInventory"]
): boolean {
  if (!variants || variants.length === 0) return true;

  return variants.some((v) => {
    const parts = v.title.split(" / ").map((p) => p.toLowerCase().trim());
    // Check this option matches the value we're testing
    if (parts[optionIndex]?.toLowerCase().trim() !== optionValue.toLowerCase().trim()) return false;
    // Check other selected options also match
    for (let i = 0; i < allOptions.length; i++) {
      if (i === optionIndex) continue;
      const sel = selections[allOptions[i].name];
      if (sel && parts[i]?.toLowerCase().trim() !== sel.toLowerCase().trim()) return false;
    }
    return (v.quantityAvailable ?? 0) > 0;
  });
}

const ProductInfo = ({ product, collectionLabel }: ProductInfoProps) => {
  // Use shopifyOptions if available, otherwise fall back to sizes/sizesSecondary
  const hasShopifyOptions = product.shopifyOptions && product.shopifyOptions.length > 0;
  const options = hasShopifyOptions ? product.shopifyOptions! : [];

  const [selections, setSelections] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [descOpen, setDescOpen] = useState(false);
  const { addItem } = useCart();

  // Fallback for local products without shopifyOptions
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedSizeSecondary, setSelectedSizeSecondary] = useState<string | null>(null);

  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(product.price);

  const allOptionsSelected = useMemo(() => {
    if (hasShopifyOptions) {
      return options.every((opt) => !!selections[opt.name]);
    }
    // Local product fallback
    const sizeOk = product.sizes.length <= 1 || !!selectedSize;
    const secOk = !product.sizesSecondary || product.sizesSecondary.length === 0 || !!selectedSizeSecondary;
    return sizeOk && secOk;
  }, [hasShopifyOptions, options, selections, product, selectedSize, selectedSizeSecondary]);

  const selectedVariant = useMemo(() => {
    if (!hasShopifyOptions) return undefined;
    return findMatchingVariant(
      selections,
      product.variantInventory,
      options.map((o) => o.name)
    );
  }, [hasShopifyOptions, selections, product.variantInventory, options]);

  const isSelectedOutOfStock = useMemo(() => {
    if (!hasShopifyOptions || !allOptionsSelected) return false;
    if (!selectedVariant) return true; // no matching variant found
    return (selectedVariant.quantityAvailable ?? 0) <= 0;
  }, [hasShopifyOptions, allOptionsSelected, selectedVariant]);

  const handleSelectOption = (optionName: string, value: string) => {
    setSelections((prev) => ({ ...prev, [optionName]: value }));
  };

  const handleAddToCart = () => {
    if (!allOptionsSelected) {
      if (hasShopifyOptions) {
        const missing = options.find((opt) => !selections[opt.name]);
        toast(`Selecciona ${missing?.name || "una opción"} antes de agregar al carrito.`, { duration: 3000 });
      } else {
        if (product.sizes.length > 1 && !selectedSize) {
          toast("Selecciona una talla antes de agregar al carrito.", { duration: 3000 });
        } else if (product.sizesSecondary?.length && !selectedSizeSecondary) {
          toast("Selecciona una talla de Bebé antes de agregar al carrito.", { duration: 3000 });
        }
      }
      return;
    }
    if (isSelectedOutOfStock) {
      toast("Esta combinación está agotada.", { duration: 3000 });
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast(`${product.name} agregado al carrito`, { duration: 3000 });
  };

  // Friendly option name mapping
  const friendlyName = (name: string) => {
    const n = name.toLowerCase();
    if (n === "size" || n === "talla" || n === "tallas") return "Talla";
    if (n === "color" || n === "colour") return "Color";
    return name;
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

      {/* Shopify dynamic options */}
      {hasShopifyOptions && options.map((opt, optIdx) => (
        <div key={opt.name}>
          <p className="text-sm font-medium text-foreground mb-2 tracking-wide">
            {friendlyName(opt.name)}
            {selections[opt.name] && (
              <span className="text-muted-foreground font-light ml-2">— {selections[opt.name]}</span>
            )}
          </p>
          <div className="flex flex-wrap gap-2">
            {opt.values.map((value) => {
              const available = isOptionValueAvailable(
                opt.name, value, optIdx, options, selections, product.variantInventory
              );
              const isSelected = selections[opt.name] === value;

              return (
                <button
                  key={value}
                  onClick={() => available && handleSelectOption(opt.name, value)}
                  disabled={!available}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    !available
                      ? "bg-muted/40 text-muted-foreground/50 border-border/30 cursor-not-allowed line-through"
                      : isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary/40 active:scale-95"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Fallback: local product size selectors */}
      {!hasShopifyOptions && product.sizes.length > 0 && (
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

      {!hasShopifyOptions && product.sizesSecondary && product.sizesSecondary.length > 0 && (
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

      {/* Out of stock message */}
      {allOptionsSelected && isSelectedOutOfStock && (
        <div className="bg-muted/50 border border-border/40 rounded-lg px-4 py-3">
          <p className="text-sm text-muted-foreground font-medium">
            😔 Esta combinación está agotada
          </p>
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
          disabled={isSelectedOutOfStock}
          className={`w-full font-medium py-6 rounded-lg text-base transition-all ${
            isSelectedOutOfStock
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : !allOptionsSelected
                ? "bg-primary/70 hover:bg-primary text-primary-foreground hover:shadow-md active:scale-[0.98]"
                : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-md active:scale-[0.98]"
          }`}
        >
          <ShoppingBag className="h-5 w-5 mr-2" />
          {isSelectedOutOfStock
            ? "Agotado"
            : !allOptionsSelected
              ? "Selecciona tus opciones"
              : "Agregar al carrito"}
        </Button>
      </div>

      {/* Trust microcopy */}
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
