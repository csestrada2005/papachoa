import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Configurable hotspot data - update when final products/photos are ready
const hotspots = [
  {
    id: "girl-top",
    label: "Camisa niña",
    price: "790 MXN",
    link: "/catalogo",
    // Position as percentage of image dimensions
    position: { top: 38, left: 35 },
  },
  {
    id: "girl-pants",
    label: "Pantalón niña",
    price: "890 MXN",
    link: "/catalogo",
    position: { top: 62, left: 32 },
  },
  {
    id: "dad-top",
    label: "Camisa papá",
    price: "890 MXN",
    link: "/catalogo",
    position: { top: 32, left: 58 },
  },
  {
    id: "dad-pants",
    label: "Pantalón papá",
    price: "990 MXN",
    link: "/catalogo",
    position: { top: 68, left: 62 },
  },
];

interface HotspotDotProps {
  hotspot: typeof hotspots[0];
  isActive: boolean;
  onToggle: (id: string | null) => void;
}

const HotspotDot = ({ hotspot, isActive, onToggle }: HotspotDotProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="absolute z-20"
      style={{
        top: `${hotspot.position.top}%`,
        left: `${hotspot.position.left}%`,
      }}
    >
      {/* Hotspot button */}
      <button
        onClick={() => onToggle(isActive ? null : hotspot.id)}
        onMouseEnter={() => onToggle(hotspot.id)}
        className={`
          relative w-5 h-5 rounded-full 
          bg-card/80 backdrop-blur-sm border border-border/50
          shadow-sm hover:shadow-md
          transition-all duration-200 ease-out
          focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-1
          ${isActive ? "scale-110 bg-card" : "hover:scale-105"}
        `}
        aria-label={`Ver ${hotspot.label}`}
        aria-expanded={isActive}
      >
        {/* Inner dot */}
        <span className="absolute inset-1.5 rounded-full bg-papachoa-warm-brown/60" />
        
        {/* Subtle pulse animation when not active */}
        {!isActive && (
          <span className="absolute inset-0 rounded-full bg-card/40 animate-ping opacity-30" />
        )}
      </button>

      {/* Popover preview */}
      {isActive && (
        <div
          ref={popoverRef}
          className="
            absolute left-1/2 -translate-x-1/2 bottom-full mb-3
            bg-card rounded-2xl
            border border-border shadow-xl
            overflow-hidden
            animate-in fade-in-0 zoom-in-95 duration-150
            z-[1000] pointer-events-auto
          "
          role="tooltip"
        >
          {/* Arrow */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-card border-r border-b border-border rotate-45" />
          
          {/* Product image placeholder */}
          <div className="w-48 h-48 bg-muted flex items-center justify-center border-b border-border/30">
            <div className="text-center">
              <span className="text-xs font-medium text-muted-foreground">Imagen del<br/>producto</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-5 py-4 space-y-3">
            <div>
              <p className="text-sm font-bold text-foreground leading-tight">
                {hotspot.label}
              </p>
              <p className="text-sm text-papachoa-warm-brown font-semibold mt-1">
                ${hotspot.price}
              </p>
            </div>
            
            <Link
              to={hotspot.link}
              className="
                block w-full text-center text-xs font-semibold
                text-card bg-papachoa-warm-brown hover:bg-papachoa-warm-brown/90
                rounded-lg py-2.5
                transition-colors duration-150
              "
              onClick={(e) => e.stopPropagation()}
            >
              Ver producto
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

interface HeroHotspotsProps {
  className?: string;
}

const HeroHotspots = ({ className = "" }: HeroHotspotsProps) => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveHotspot(null);
      }
    };

    if (activeHotspot) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeHotspot]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveHotspot(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 ${className}`}
      onMouseLeave={() => setActiveHotspot(null)}
    >
      {/* Desktop hotspots - hidden on small mobile */}
      <div className="hidden sm:block">
        {hotspots.map((hotspot) => (
          <HotspotDot
            key={hotspot.id}
            hotspot={hotspot}
            isActive={activeHotspot === hotspot.id}
            onToggle={setActiveHotspot}
          />
        ))}
      </div>
    </div>
  );
};

// Mobile fallback component
export const ShopTheLookList = () => {
  return (
    <div className="sm:hidden mt-4 px-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 text-center">
        Compra el look
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {hotspots.map((hotspot) => (
          <Link
            key={hotspot.id}
            to={hotspot.link}
            className="
              inline-flex items-center gap-1.5
              bg-card/80 backdrop-blur-sm
              border border-border/40 rounded-full
              px-3 py-1.5 text-xs font-medium text-foreground
              hover:bg-card transition-colors
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-papachoa-warm-brown/60" />
            {hotspot.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroHotspots;
