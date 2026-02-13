import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MobileHeroGalleryProps {
  images: string[];
  name: string;
}

const MobileHeroGallery = ({ images, name }: MobileHeroGalleryProps) => {
  const [current, setCurrent] = useState(0);
  const [loadedSet, setLoadedSet] = useState<Set<number>>(new Set());
  const [transitioning, setTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  // Prefetch next and previous images
  useEffect(() => {
    const toPreload = [current, (current + 1) % total, (current - 1 + total) % total];
    toPreload.forEach((i) => {
      const img = new Image();
      img.src = images[i];
    });
  }, [current, images, total]);

  const goTo = useCallback(
    (idx: number) => {
      if (transitioning || idx === current) return;
      setTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setTransitioning(false), 300);
    },
    [current, transitioning]
  );

  const prev = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      goTo((current - 1 + total) % total);
    },
    [current, total, goTo]
  );

  const next = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      goTo((current + 1) % total);
    },
    [current, total, goTo]
  );

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  }, []);

  const onTouchEnd = useCallback(() => {
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) goTo((current + 1) % total);
      else goTo((current - 1 + total) % total);
    }
    touchDeltaX.current = 0;
  }, [current, total, goTo]);

  const handleLoad = useCallback((idx: number) => {
    setLoadedSet((prev) => new Set(prev).add(idx));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-papachoa-cream select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Images stack — only current visible */}
      {images.map((src, idx) => (
        <div
          key={idx}
          className="absolute inset-0"
          style={{
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? "translateX(0)" : idx > current ? "translateX(8px)" : "translateX(-8px)",
            transition: "opacity 280ms ease-out, transform 280ms ease-out",
            zIndex: idx === current ? 2 : 1,
            pointerEvents: idx === current ? "auto" : "none",
          }}
        >
          {!loadedSet.has(idx) && (
            <Skeleton className="absolute inset-0 rounded-xl" />
          )}
          <img
            src={src}
            alt={`${name} - ${idx + 1}`}
            className="w-full h-full object-cover"
            loading={idx <= 1 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : undefined}
            decoding="async"
            draggable={false}
            onLoad={() => handleLoad(idx)}
            style={{
              opacity: loadedSet.has(idx) ? 1 : 0,
              transition: "opacity 200ms ease-out",
            }}
          />
        </div>
      ))}

      {/* Arrows — always visible */}
      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 shadow-sm flex items-center justify-center active:scale-95 transition-transform duration-150"
      >
        <ChevronLeft className="w-5 h-5 text-foreground/70" />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/70 backdrop-blur-sm border border-border/40 shadow-sm flex items-center justify-center active:scale-95 transition-transform duration-150"
      >
        <ChevronRight className="w-5 h-5 text-foreground/70" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              goTo(idx);
            }}
            aria-label={`Imagen ${idx + 1}`}
            className={`rounded-full transition-all duration-200 ${
              idx === current
                ? "w-2 h-2 bg-primary/80"
                : "w-1.5 h-1.5 bg-foreground/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileHeroGallery;
