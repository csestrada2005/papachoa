import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
});

const ProductCard = memo(({ product }: ProductCardProps) => {
  const formattedPrice = useMemo(() => priceFormatter.format(product.price), [product.price]);

  return (
    <Link to={`/producto/${product.slug}`} className="group block">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-papachoa-cream mb-3 border border-border/30">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width={300}
          height={375}
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
      </div>

      {/* Product info */}
      <div className="px-0.5">
        <h3 className="font-display text-base md:text-lg text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
