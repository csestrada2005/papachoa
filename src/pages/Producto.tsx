import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductAccordion from "@/components/product/ProductAccordion";
import TextureSection from "@/components/product/TextureSection";
import BundleSuggestion from "@/components/product/BundleSuggestion";
import ProductReviews from "@/components/product/ProductReviews";
import RelatedProducts from "@/components/product/RelatedProducts";
import StickyMobileCTA from "@/components/product/StickyMobileCTA";
import { products, collections } from "@/data/products";

const Producto = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  const collectionLabel = useMemo(() => {
    if (!product) return "";
    return collections.find((c) => c.id === product.collection)?.label ?? "";
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">
              Producto no encontrado
            </h1>
            <p className="text-muted-foreground mb-8">
              Lo sentimos, no pudimos encontrar este producto.
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 bg-papachoa-warm-brown text-card px-6 py-3 rounded-full font-semibold hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-28 pb-24 md:pb-16">
        {/* Breadcrumbs */}
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-8 flex-wrap">
            <Link to="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <span>/</span>
            <Link to="/catalogo" className="hover:text-foreground transition-colors">Catálogo</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        {/* Main product section */}
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ProductGallery images={product.images} name={product.name} />
            <ProductInfo product={product} collectionLabel={collectionLabel} />
          </div>
        </div>

        {/* Texture section */}
        <div className="container mt-12 md:mt-16">
          <TextureSection />
        </div>

        {/* Product accordion */}
        <div className="container mt-12 md:mt-16">
          <ProductAccordion product={product} />
        </div>

        {/* Bundle suggestion */}
        <div className="container mt-12 md:mt-16">
          <BundleSuggestion currentProduct={product} />
        </div>

        {/* Reviews */}
        <div className="container mt-12 md:mt-16">
          <ProductReviews />
        </div>

        {/* Related products */}
        <div className="container mt-12 md:mt-16">
          <RelatedProducts currentProduct={product} />
        </div>
      </main>

      <StickyMobileCTA product={product} />
      <Footer />
    </div>
  );
};

export default Producto;
