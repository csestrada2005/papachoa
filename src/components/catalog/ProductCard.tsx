import { memo, useMemo, useState, useCallback, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
});

const SWIPE_THRESHOLD = 40;

/* ── Preload cache (shared across all cards) ── */
const preloadedUrls = new Set<string>();

function preloadImage(src: string): Promise<void> {
  if (preloadedUrls.has(src)) return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => {
      preloadedUrls.add(src);
      resolve();
    };
    img.src = src;
  });
}

function preloadNeighbors(images: string[], currentIndex: number) {
  const len = images.length;
  if (len <= 1) return;
  const next = (currentIndex + 1) % len;
  const prev = (currentIndex - 1 + len) % len;
  preloadImage(images[next]);
  preloadImage(images[prev]);
}

const ProductCard = memo(({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const formattedPrice = useMemo(() => priceFormatter.format(product.price), [product.price]);
  const realImages = useMemo(
    () => product.images.filter((img) => img !== "/placeholder.svg"),
    [product.images],
  );
  const hasMultiple = realImages.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isAnimating, setIsAnimating] = useState(false);
  /* Track which image is visually displayed (deferred until loaded) */
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [imageReady, setImageReady] = useState(true);

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Mobile: track if card was just activated by this tap */
  const justActivated = useRef(false);

  /* Preload neighbors when card becomes active or index changes */
  useEffect(() => {
    if (isActive && hasMultiple) {
      preloadNeighbors(realImages, activeIndex);
    }
  }, [isActive, activeIndex, hasMultiple, realImages]);

  /* When activeIndex changes, wait for image to be ready before swapping */
  useEffect(() => {
    if (activeIndex === displayedIndex) return;
    const src = realImages[activeIndex];
    if (preloadedUrls.has(src)) {
      setDisplayedIndex(activeIndex);
      setImageReady(true);
    } else {
      setImageReady(false);
      preloadImage(src).then(() => {
        setDisplayedIndex(activeIndex);
        setImageReady(true);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  const changeIndex = useCallback(
    (newIndex: number, dir: 'forward' | 'backward') => {
      if (isAnimating) return;
      setIsAnimating(true);
      setDirection(dir);
      setActiveIndex(newIndex);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = setTimeout(() => setIsAnimating(false), 250);
    },
    [isAnimating],
  );

  const goPrev = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      changeIndex((activeIndex - 1 + realImages.length) % realImages.length, 'backward');
    },
    [activeIndex, realImages.length, changeIndex],
  );

  const goNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      changeIndex((activeIndex + 1) % realImages.length, 'forward');
    },
    [activeIndex, realImages.length, changeIndex],
  );

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    didSwipe.current = false;
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!pointerStart.current || !hasMultiple || isAnimating) return;
      const dx = e.clientX - pointerStart.current.x;
      const dy = e.clientY - pointerStart.current.y;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        didSwipe.current = true;
        if (dx < 0) {
          changeIndex((activeIndex + 1) % realImages.length, 'forward');
        } else {
          changeIndex((activeIndex - 1 + realImages.length) % realImages.length, 'backward');
        }
      }
      pointerStart.current = null;
    },
    [hasMultiple, activeIndex, realImages.length, isAnimating, changeIndex],
  );

  /* ── Mobile tap-to-activate logic ── */
  const activate = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      justActivated.current = true;
      /* Reset after a tick so the same tap doesn't navigate */
      requestAnimationFrame(() => {
        justActivated.current = false;
      });
    }
  }, [isActive]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      /* If swiped, block navigation */
      if (didSwipe.current) {
        e.preventDefault();
        didSwipe.current = false;
        return;
      }
      /* Mobile: first tap activates, doesn't navigate */
      if (justActivated.current) {
        e.preventDefault();
        return;
      }
      /* If not active yet on touch, activate instead of navigating */
      if (!isActive && 'ontouchstart' in window) {
        e.preventDefault();
        activate();
        return;
      }
    },
    [isActive, activate],
  );

  /* Deactivate when tapping outside — use a global listener */
  useEffect(() => {
    if (!isActive) return;
    const handler = (e: PointerEvent) => {
      const card = cardRef.current;
      if (card && !card.contains(e.target as Node)) {
        setIsActive(false);
      }
    };
    document.addEventListener("pointerdown", handler, true);
    return () => document.removeEventListener("pointerdown", handler, true);
  }, [isActive]);

  const cardRef = useRef<HTMLAnchorElement>(null);

  const currentImage = hasMultiple ? realImages[displayedIndex] : product.image;

  const getAnimationClass = () => {
    if (!isAnimating || !imageReady) return '';
    return direction === 'forward' ? 'enter-forward' : 'enter-backward';
  };

  return (
    <Link
      ref={cardRef}
      to={`/producto/${product.slug}`}
      className="group block"
      onClick={handleClick}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {/* Image container */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-xl bg-papachoa-cream mb-3 border border-border/30 touch-pan-y"
        onPointerDown={hasMultiple ? onPointerDown : undefined}
        onPointerUp={hasMultiple ? onPointerUp : undefined}
      >
        <img
          key={`${product.id}-${displayedIndex}`}
          src={currentImage}
          alt={product.name}
          className={`carousel-image w-full h-full object-cover ${getAnimationClass()}`}
          loading="lazy"
          decoding="async"
          width={300}
          height={375}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />

        {/* Arrows — only when active & multiple images */}
        {hasMultiple && (
          <>
            <button
              onClick={goPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center
                bg-background/70 border border-border/40 shadow-sm backdrop-blur-sm
                transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
                ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Imagen anterior"
              tabIndex={isActive ? 0 : -1}
              disabled={isAnimating}
            >
              <ChevronLeft className="w-4 h-4 text-foreground/70" />
            </button>
            <button
              onClick={goNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full flex items-center justify-center
                bg-background/70 border border-border/40 shadow-sm backdrop-blur-sm
                transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40
                ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              aria-label="Imagen siguiente"
              tabIndex={isActive ? 0 : -1}
              disabled={isAnimating}
            >
              <ChevronRight className="w-4 h-4 text-foreground/70" />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {hasMultiple && isActive && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {realImages.map((_, idx) => (
              <span
                key={idx}
                className={`block rounded-full transition-all duration-200 ${
                  idx === activeIndex
                    ? "w-4 h-1.5 bg-foreground/50"
                    : "w-1.5 h-1.5 bg-foreground/20"
                }`}
              />
            ))}
          </div>
        )}
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
