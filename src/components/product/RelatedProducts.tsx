import { useState } from "react";
import ProductCard from "@/components/catalog/ProductCard";
import { products as localProducts, type Product } from "@/data/products";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

interface RelatedProductsProps {
  currentProduct: Product;
}

const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const { data: shopifyProducts = [] } = useShopifyProducts();

  // Merge local + shopify, deduplicate by slug
  const allProducts = [...localProducts];
  for (const sp of shopifyProducts) {
    if (!allProducts.some((p) => p.slug === sp.slug)) {
      allProducts.push(sp);
    }
  }

  const realProducts = allProducts.filter((p) => p.image !== "/placeholder.svg");

  const related = realProducts
    .filter((p) => p.id !== currentProduct.id)
    .filter((p) => p.collection === currentProduct.collection)
    .slice(0, 4);

  const backfill = related.length < 4
    ? realProducts
        .filter((p) => p.id !== currentProduct.id && !related.includes(p))
        .slice(0, 4 - related.length)
    : [];

  const allRelated = [...related, ...backfill];

  if (allRelated.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl md:text-2xl text-foreground mb-6">
        Productos relacionados
      </h2>
      <div className="embroidery-line w-16 mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {allRelated.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isActive={activeCardId === product.id}
            onActivate={() => setActiveCardId(product.id)}
            onDeactivate={() => setActiveCardId((prev) => prev === product.id ? null : prev)}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
