import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalog/ProductCard";
import CollectionFilter from "@/components/catalog/CollectionFilter";
import { products, collections, type Collection } from "@/data/products";

const validSlugs = new Set(collections.map((c) => c.id));

const Catalogo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);

  const paramCategoria = searchParams.get("categoria") as Collection | null;
  const initial: Collection =
    paramCategoria && validSlugs.has(paramCategoria) ? paramCategoria : "todos";

  const [selectedCollection, setSelectedCollection] = useState<Collection>(initial);

  // Sync from URL → state (e.g. browser back/forward)
  useEffect(() => {
    const cat = searchParams.get("categoria") as Collection | null;
    const next = cat && validSlugs.has(cat) ? cat : "todos";
    setSelectedCollection((prev) => (prev === next ? prev : next));
  }, [searchParams]);

  // When user picks a tab, update URL without reload
  const handleSelect = useCallback(
    (collection: Collection) => {
      if (collection === selectedCollection) return;
      setSelectedCollection(collection);
      if (collection === "todos") {
        setSearchParams({}, { replace: true });
      } else {
        setSearchParams({ categoria: collection }, { replace: true });
      }
    },
    [selectedCollection, setSearchParams],
  );

  // Scroll to filters when arriving with a specific category
  useEffect(() => {
    if (paramCategoria && validSlugs.has(paramCategoria) && paramCategoria !== "todos") {
      filterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // only on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCollection === "todos") return products;
    return products.filter((p) => p.collection === selectedCollection);
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
          <div ref={filterRef} className="mb-8 md:mb-12 scroll-mt-24">
            <CollectionFilter
              selected={selectedCollection}
              onSelect={handleSelect}
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
