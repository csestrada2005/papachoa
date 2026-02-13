import { useEffect, useRef, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const INITIAL_VISIBLE = 4;

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [revealedAll, setRevealedAll] = useState(false);
  const revealRef = useRef<HTMLDivElement>(null);

  const initialImages = images.slice(0, INITIAL_VISIBLE);
  const extraImages = images.slice(INITIAL_VISIBLE);
  const hasExtra = extraImages.length > 0;

  // Preload first 2 images eagerly
  useEffect(() => {
    images.slice(0, 2).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  // Intersection observer for extra images reveal
  useEffect(() => {
    if (!hasExtra || revealedAll) return;
    const el = revealRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealedAll(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasExtra, revealedAll]);

  const handleImageLoad = useCallback((idx: number) => {
    setLoadedImages((prev) => new Set(prev).add(idx));
  }, []);

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Initial images — always visible */}
      {initialImages.map((img, idx) => (
        <GalleryImage
          key={idx}
          src={img}
          alt={`${name} - imagen ${idx + 1}`}
          index={idx}
          loaded={loadedImages.has(idx)}
          onLoad={() => handleImageLoad(idx)}
          animateIn
        />
      ))}

      {/* Reveal trigger sentinel */}
      {hasExtra && !revealedAll && (
        <div ref={revealRef} className="relative h-24 -mt-20 pointer-events-none">
          {/* Gradient fade hint */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent rounded-b-xl" />
        </div>
      )}

      {/* Extra images — revealed on scroll */}
      {hasExtra && revealedAll &&
        extraImages.map((img, idx) => {
          const globalIdx = INITIAL_VISIBLE + idx;
          return (
            <GalleryImage
              key={globalIdx}
              src={img}
              alt={`${name} - imagen ${globalIdx + 1}`}
              index={globalIdx}
              loaded={loadedImages.has(globalIdx)}
              onLoad={() => handleImageLoad(globalIdx)}
              animateIn
              delayMs={idx * 120}
            />
          );
        })}
    </div>
  );
};

/* ── Individual gallery image with viewport fade-in ── */

interface GalleryImageProps {
  src: string;
  alt: string;
  index: number;
  loaded: boolean;
  onLoad: () => void;
  animateIn?: boolean;
  delayMs?: number;
}

const GalleryImage = ({ src, alt, index, loaded, onLoad, animateIn, delayMs = 0 }: GalleryImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!animateIn) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "50px 0px", threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animateIn]);

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] overflow-hidden rounded-xl bg-papachoa-cream border border-border/30"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.5s ease-out ${delayMs}ms, transform 0.5s ease-out ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {!loaded && <Skeleton className="absolute inset-0 rounded-xl" />}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        width={600}
        height={750}
        onLoad={onLoad}
        loading={index < 2 ? "eager" : "lazy"}
        fetchPriority={index === 0 ? "high" : undefined}
        decoding="async"
        draggable={false}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease-out" }}
      />
    </div>
  );
};

export default ProductGallery;
