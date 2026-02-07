import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalog/ProductCard";
import CollectionFilter from "@/components/catalog/CollectionFilter";
import { products, type Collection } from "@/data/products";

const Catalogo = () => {
  const [selectedCollection, setSelectedCollection] = useState<Collection>("todos");

  const filteredProducts = useMemo(() => {
    if (selectedCollection === "todos") {
      return products;
    }
    return products.filter((product) => product.collection === selectedCollection);
  }, [selectedCollection]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero compacto */}
      <section className="pt-28 md:pt-32 pb-8 md:pb-12 bg-papachoa-cream">
        <div className="container text-center">
          <span className="inline-block bg-papachoa-blush px-4 py-1.5 rounded-full text-xs font-semibold text-foreground/80 mb-4">
            Explora
          </span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Nuestra <span className="italic">Colección</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Piezas únicas llenas de suavidad y amor para tu familia
          </p>
        </div>
      </section>

      {/* Filtros y productos */}
      <section className="py-8 md:py-12">
        <div className="container">
          {/* Filtros */}
          <div className="mb-8 md:mb-12">
            <CollectionFilter
              selected={selectedCollection}
              onSelect={setSelectedCollection}
            />
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No hay productos en esta colección aún.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Catalogo;
