import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionReveal from "@/components/ui/SectionReveal";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { isIOS } from "@/lib/platform";

const CollectionCard = ({
  product,
  index,
}: {
  product: { slug: string; name: string; image: string };
  index: number;
}) => {
  const ACCENT_COLORS = [
    "hsl(var(--papachoa-coral) / 0.08)",
    "hsl(var(--papachoa-magenta) / 0.07)",
    "hsl(var(--papachoa-yellow) / 0.08)",
    "hsl(var(--papachoa-blue) / 0.08)",
  ];
  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <div className="flex-shrink-0" style={{ width: "clamp(130px, 15vw, 190px)" }}>
      <Link
        to={`/producto/${product.slug}`}
        className="group block"
        aria-label={`Ver ${product.name}`}
      >
        <div
          style={{
            background: accent,
            borderRadius: 0,
            padding: "clamp(6px, 1vw, 10px)",
          }}
        >
          <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              width={190}
              height={253}
            />
          </div>
        </div>
        <div className="pt-3 px-1">
          <h3
            className="font-bold text-foreground tracking-wide"
            style={{ fontSize: "clamp(0.72rem, 1vw, 0.85rem)", letterSpacing: "0.06em" }}
          >
            {product.name}
          </h3>
        </div>
      </Link>
    </div>
  );
};

const ColeccionesEditorial = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { data: shopifyProducts } = useShopifyProducts();
  const iosDevice = useRef(isIOS());

  const displayProducts = (shopifyProducts || []).filter(
    (p) => p.image && p.image !== "/placeholder.svg"
  );

  const itemCount = displayProducts.length || 1;
  const cssDuration = itemCount * 3; // for CSS animation on iOS

  // scrollLeft-based auto-scroll for non-iOS (works on desktop & Android)
  useEffect(() => {
    if (iosDevice.current) return; // iOS uses CSS animation instead
    const track = trackRef.current;
    if (!track) return;
    let raf: number;
    const speed = 0.5;

    const step = () => {
      if (!track) return;
      track.scrollLeft += speed;
      if (track.scrollLeft >= track.scrollWidth - track.clientWidth) {
        track.scrollLeft = 0;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [displayProducts.length]);

  return (
    <section
      id="colecciones"
      className="overflow-hidden"
      style={{
        background: "#fff",
        paddingTop: "clamp(4rem, 8vw, 7rem)",
        paddingBottom: "clamp(4rem, 8vw, 7rem)",
      }}
    >
      {/* CSS animation keyframes for iOS */}
      {iosDevice.current && (
        <style>{`
          @keyframes catalog-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @media (prefers-reduced-motion: reduce) {
            .catalog-track-ios { animation: none !important; }
          }
        `}</style>
      )}

      <div className="container">
        <div className="mb-10">
          <SectionReveal>
            <p className="font-display text-primary mb-3" style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)" }}>
              Explora
            </p>
          </SectionReveal>
          <SectionReveal delay={80}>
            <h2
              className="font-bold text-foreground leading-none"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "clamp(0.03em, 0.5vw, 0.08em)" }}
            >
              Catálogo
            </h2>
          </SectionReveal>
        </div>
      </div>

      {iosDevice.current ? (
        /* iOS: CSS translateX animation (no scrollLeft needed) */
        <div
          className="overflow-hidden"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
            paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
          }}
        >
          <div
            className="catalog-track-ios flex gap-4 md:gap-5 select-none pointer-events-none"
            style={{
              width: "max-content",
              animation: `catalog-scroll ${cssDuration}s linear infinite`,
            }}
          >
            {[...displayProducts, ...displayProducts].map((product, i) => (
              <div key={`${product.id}-${i}`}>
                <CollectionCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop & Android: scrollLeft-based auto-scroll */
        <div
          ref={trackRef}
          className="flex gap-4 md:gap-5 overflow-x-scroll scrollbar-hide pb-6 select-none pointer-events-none"
          style={{
            paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
            paddingRight: "max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {[...displayProducts, ...displayProducts].map((product, i) => (
            <div key={`${product.id}-${i}`}>
              <CollectionCard product={product} index={i} />
            </div>
          ))}
        </div>
      )}

      <div className="container mt-6 text-center">
        <SectionReveal delay={120}>
          <Link
            to="/catalogo"
            className="cta-premium-terracotta group inline-flex items-center gap-2"
          >
            Ver catálogo
            <span className="text-lg inline-block transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
          </Link>
        </SectionReveal>
      </div>
    </section>
  );
};

export default ColeccionesEditorial;
