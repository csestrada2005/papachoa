import ProductCard from "@/components/catalog/ProductCard";
import { products, type Product } from "@/data/products";

interface RelatedProductsProps {
  currentProduct: Product;
}

const RelatedProducts = ({ currentProduct }: RelatedProductsProps) => {
  const realProducts = products.filter((p) => p.image !== "/placeholder.svg");
  
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
