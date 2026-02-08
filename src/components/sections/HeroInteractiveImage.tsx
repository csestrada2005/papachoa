import HeroHotspots from "./HeroHotspots";

interface HeroInteractiveImageProps {
  src: string;
  alt: string;
}

/**
 * HeroInteractiveImage - The ONLY container where hotspots can render.
 * 
 * This component is the exclusive wrapper for shop-the-look functionality.
 * Hotspots are architecturally bound to this component and cannot exist elsewhere.
 * 
 * Usage: Pass ONLY the dad + daughter sitting image to this component.
 * All other images must use standard <img> tags without this wrapper.
 */
const HeroInteractiveImage = ({ src, alt }: HeroInteractiveImageProps) => {
  return (
    <div className="blob-shape overflow-hidden relative">
      {/* The interactive image */}
      <img
        src={src}
        alt={alt}
        className="w-full aspect-square object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      
      {/* Hotspots - ONLY rendered here, nowhere else */}
      <HeroHotspots />
    </div>
  );
};

export default HeroInteractiveImage;
