import { useMemo, useRef, useEffect, useState } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { products, collections } from "@/data/products";

const Producto = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);
  const isMobile = useIsMobile();

  const collectionLabel = useMemo(() => {
    if (!product) return "";
    return collections.find((c) => c.id === product.collection)?.label ?? "";
  }, [product]);

  // ── Scroll-driven title shrink (desktop only) ──
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleProgress, setTitleProgress] = useState(0);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const y = window.scrollY;
      // Animate over the first 200px of scroll
      const progress = Math.min(y / 200, 1);
      setTitleProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">
              Producto no encontrado
            </h1>
            <p className="text-muted-foreground mb-8 font-light">
              Lo sentimos, no pudimos encontrar este producto.
            </p>
            <Link to="/catalogo" className="btn-artisan">
              Volver al catálogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Title animation values (desktop only)
  const titleScale = isMobile ? 1 : 1 - titleProgress * 0.08; // 1 → 0.92
  const titleTranslateY = isMobile ? 0 : -titleProgress * 6; // 0 → -6px
  const titleOpacity = isMobile ? 1 : 1 - titleProgress * 0.15; // 1 → 0.85

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 md:pt-28 pb-24 md:pb-16">
        {/* Breadcrumbs — editorial */}
        <div className="container">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 md:mb-8 flex-wrap font-light">
            <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span className="text-border">/</span>
            <Link to="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
            <span className="text-border">/</span>
            <span className="text-foreground/70">{product.name}</span>
          </nav>
        </div>

        {/* Main product section — sticky right column on desktop */}
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            {/* LEFT — Scrollable gallery */}
            <ProductGallery images={product.images} name={product.name} />

            {/* RIGHT — Sticky info */}
            <div
              className={`flex flex-col gap-5 lg:gap-8 ${
                !isMobile ? "lg:sticky lg:top-28 lg:self-start" : ""
              }`}
            >
              {/* Animated title wrapper (desktop) */}
              <div
                ref={titleRef}
                style={{
                  transform: `scale(${titleScale}) translateY(${titleTranslateY}px)`,
                  opacity: titleOpacity,
                  transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
                  transformOrigin: "left top",
                  willChange: "transform, opacity",
                }}
              >
                <ProductInfo product={product} collectionLabel={collectionLabel} />
              </div>

              <div className="hidden lg:block">
                <TextureSection />
              </div>
            </div>
          </div>
        </div>

        {/* Texture — mobile */}
        <div className="container mt-12 md:mt-16 lg:hidden">
          <TextureSection />
        </div>

        {/* Accordion */}
        <div className="container mt-12 md:mt-16">
          <ProductAccordion product={product} />
        </div>

        {/* Bundle */}
        <div className="container mt-12 md:mt-16">
          <BundleSuggestion currentProduct={product} />
        </div>

        {/* Reviews */}
        <div className="container mt-12 md:mt-16">
          <ProductReviews />
        </div>

        {/* Related */}
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
