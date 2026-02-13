import { useState, useEffect, useRef, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const AUTOPLAY_INTERVAL = 3000;
const RESUME_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch / pointer tracking
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  // ── Autoplay ──
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % total);
    }, AUTOPLAY_INTERVAL);
  }, [total]);

  const pauseAutoplay = useCallback(() => {
    setIsPaused(true);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      setIsPaused(false);
    }, RESUME_DELAY);
  }, []);

  useEffect(() => {
    if (!isPaused) startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPaused, startAutoplay]);

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      setActiveIndex(idx);
      pauseAutoplay();
    },
    [pauseAutoplay]
  );

  // ── Swipe / drag handling ──
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!pointerStart.current) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;
    // Only trigger if horizontal movement dominates
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0 && activeIndex < total - 1) goTo(activeIndex + 1);
      else if (dx > 0 && activeIndex > 0) goTo(activeIndex - 1);
    }
    pointerStart.current = null;
  };

  // ── Wheel (trackpad) ──
  const wheelTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wheelAccum = useRef(0);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      // Detect horizontal scroll (trackpad gesture)
      if (Math.abs(e.deltaX) < 5) return;
      e.preventDefault();
      wheelAccum.current += e.deltaX;
      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        if (wheelAccum.current > SWIPE_THRESHOLD && activeIndex < total - 1) goTo(activeIndex + 1);
        else if (wheelAccum.current < -SWIPE_THRESHOLD && activeIndex > 0) goTo(activeIndex - 1);
        wheelAccum.current = 0;
      }, 80);
    },
    [activeIndex, total, goTo]
  );

  const handleImageLoad = (idx: number) => {
    setLoadedImages((prev) => new Set(prev).add(idx));
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — crossfade stack */}
      <div
        ref={containerRef}
        className="relative aspect-[4/5] overflow-hidden rounded-xl bg-papachoa-cream border border-border/30 select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onWheel={onWheel}
        style={{ cursor: "grab" }}
      >
        {/* Loading skeleton for first image */}
        {!loadedImages.has(0) && (
          <Skeleton className="absolute inset-0 rounded-xl" />
        )}

        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`${name} - imagen ${idx + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
            style={{ opacity: idx === activeIndex ? 1 : 0 }}
            width={600}
            height={750}
            onLoad={() => handleImageLoad(idx)}
            loading={idx === 0 ? "eager" : "lazy"}
            fetchPriority={idx === 0 ? "high" : undefined}
            decoding="async"
            draggable={false}
          />
        ))}

        {/* Progress dots — minimal */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              className={`rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "w-5 h-1.5 bg-foreground/60"
                  : "w-1.5 h-1.5 bg-foreground/20 hover:bg-foreground/30"
              }`}
              aria-label={`Ver imagen ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`relative aspect-square w-16 md:w-20 rounded-lg overflow-hidden bg-papachoa-cream flex-shrink-0 border-2 transition-all duration-200 ${
              idx === activeIndex
                ? "border-primary/50 shadow-sm"
                : "border-transparent hover:border-border"
            }`}
          >
            <img
              src={img}
              alt={`${name} - miniatura ${idx + 1}`}
              className="w-full h-full object-cover"
              width={80}
              height={80}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
