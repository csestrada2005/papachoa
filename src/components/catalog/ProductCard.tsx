import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const formattedPrice = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link
      to={`/producto/${product.id}`}
      className="group block"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-papachoa-cream mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          width={300}
          height={375}
        />
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300 rounded-3xl" />
      </div>

      {/* Product info */}
      <div className="px-1">
        <h3 className="font-display text-sm md:text-base text-foreground leading-tight mb-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="font-body text-sm text-muted-foreground">
          {formattedPrice}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
