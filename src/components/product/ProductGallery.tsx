import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image — editorial frame */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-papachoa-cream border border-border/30">
        {!imageLoaded && (
          <Skeleton className="absolute inset-0 rounded-xl" />
        )}
        <img
          key={selectedIndex}
          src={images[selectedIndex]}
          alt={`${name} - imagen ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
          width={600}
          height={750}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedIndex(idx);
              setImageLoaded(false);
            }}
            className={`relative aspect-square w-16 md:w-20 rounded-lg overflow-hidden bg-papachoa-cream border-2 transition-all ${
              idx === selectedIndex
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
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
