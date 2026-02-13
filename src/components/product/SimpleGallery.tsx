import { useCallback, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SimpleGalleryProps {
  images: string[];
  name: string;
}

const SimpleGallery = ({ images, name }: SimpleGalleryProps) => {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const handleImageLoad = useCallback((idx: number) => {
    setLoadedImages((prev) => new Set(prev).add(idx));
  }, []);

  if (images.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="relative aspect-[4/5] overflow-hidden rounded-xl bg-papachoa-cream border border-border/30"
        >
          {!loadedImages.has(idx) && (
            <Skeleton className="absolute inset-0 rounded-xl" />
          )}
          <img
            src={img}
            alt={`${name} - imagen ${idx + 5}`}
            className="w-full h-full object-cover"
            width={600}
            height={750}
            onLoad={() => handleImageLoad(idx)}
            loading="lazy"
            decoding="async"
            draggable={false}
            style={{ opacity: loadedImages.has(idx) ? 1 : 0, transition: "opacity 0.3s ease-out" }}
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleGallery;
