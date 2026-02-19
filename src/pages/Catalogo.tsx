import { useState, useMemo, useEffect, useRef, useCallback, useId } from "react";
import { useSeo } from "@/hooks/useSeo";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/catalog/ProductCard";
import CollectionFilter from "@/components/catalog/CollectionFilter";
import { products, collections, type Collection } from "@/data/products";

const validSlugs = new Set(collections.map((c) => c.id));

const Catalogo = () => {
  useSeo({ title: "Catálogo de Pijamas | Papachoa México", description: "Explora nuestras colecciones de pijamas familiares ultra suaves hechos en México. Mamá & bebé, papá & hija, sets matching y más.", path: "/catalogo" });
  const [searchParams, setSearchParams] = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);

  const paramCategoria = searchParams.get("categoria") as Collection | null;
  const initial: Collection =
    paramCategoria && validSlugs.has(paramCategoria) ? paramCategoria : "todos";

  const [selectedCollection, setSelectedCollection] = useState<Collection>(initial);

  useEffect(() => {
    const cat = searchParams.get("categoria") as Collection | null;
    const next = cat && validSlugs.has(cat) ? cat : "todos";
    setSelectedCollection((prev) => (prev === next ? prev : next));
  }, [searchParams]);

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

  useEffect(() => {
    if (paramCategoria && validSlugs.has(paramCategoria) && paramCategoria !== "todos") {
      filterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Active card state (lifted from ProductCard for mobile persistence) ── */
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeCardId) return;
    const handler = (e: PointerEvent) => {
      const grid = gridRef.current;
      if (grid && !grid.contains(e.target as Node)) {
        setActiveCardId(null);
      }
    };
    document.addEventListener("pointerdown", handler, true);
    return () => document.removeEventListener("pointerdown", handler, true);
  }, [activeCardId]);

  const filteredProducts = useMemo(() => {
    const realProducts = products.filter((p) => p.image !== "/placeholder.svg");
    if (selectedCollection === "todos" || selectedCollection === "matching") return realProducts;
    return realProducts.filter((p) => p.collection === selectedCollection);
  }, [selectedCollection]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero — editorial style */}
      <section className="pt-28 md:pt-32 pb-10 md:pb-14 bg-papachoa-cream relative overflow-hidden texture-linen">
        {/* Subtle background shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, hsl(14 52% 46% / 0.12), transparent 70%)" }} />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, hsl(162 22% 42% / 0.1), transparent 70%)" }} />
        </div>

        <div className="container text-center relative z-10">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-primary mb-4">
            Explora
          </p>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3">
            Nuestra <em>Colección</em>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto font-light">
            Piezas únicas llenas de suavidad y amor para tu familia
          </p>
          <div className="embroidery-line w-16 mx-auto mt-6" />
        </div>
      </section>

      {/* Filters & products */}
      <section className="py-8 md:py-12">
        <div className="container">
          <div ref={filterRef} className="mb-8 md:mb-12 scroll-mt-24">
            <CollectionFilter
              selected={selectedCollection}
              onSelect={handleSelect}
            />
          </div>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isActive={activeCardId === product.id}
                onActivate={() => setActiveCardId(product.id)}
                onDeactivate={() => setActiveCardId((prev) => prev === product.id ? null : prev)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground font-light">
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
