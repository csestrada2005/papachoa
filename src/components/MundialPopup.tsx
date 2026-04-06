import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

/* Simple soccer ball SVG */
const SoccerBall = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} style={style} aria-hidden="true">
    <circle cx="20" cy="20" r="18" stroke="hsl(var(--foreground) / 0.25)" strokeWidth="1.5" fill="hsl(var(--background) / 0.6)" />
    <path d="M20 2 L20 8 M20 32 L20 38 M2 20 L8 20 M32 20 L38 20" stroke="hsl(var(--foreground) / 0.15)" strokeWidth="1" />
    <polygon points="20,8 25,14 23,21 17,21 15,14" fill="hsl(var(--foreground) / 0.2)" />
    <polygon points="32,16 28,14 25,8 29,5 34,10" fill="hsl(var(--foreground) / 0.15)" />
    <polygon points="8,16 12,14 15,8 11,5 6,10" fill="hsl(var(--foreground) / 0.15)" />
    <polygon points="25,26 28,22 34,22 36,28 30,30" fill="hsl(var(--foreground) / 0.15)" />
    <polygon points="15,26 12,22 6,22 4,28 10,30" fill="hsl(var(--foreground) / 0.15)" />
  </svg>
);

const BALLS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  left: 5 + i * 10,
  size: 18 + (i % 3) * 8,
  delay: i * 0.7,
  duration: 6 + (i % 4) * 2,
}));

const MundialPopup = () => {
  const [visible, setVisible] = useState(false);
  const { data: products = [] } = useShopifyProducts();

  const mundialProduct = products.find((p) => p.collection === "mundial");
  const heroImage = mundialProduct?.image;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(253,246,240,0.7)", backdropFilter: "blur(6px)" }}
        onClick={() => setVisible(false)}
      />

      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-border/20"
        style={{
          background: "hsl(var(--card))",
          boxShadow: "0 20px 60px -10px rgba(0,0,0,0.15)",
          animation: "mundial-pop 0.4s cubic-bezier(0.22,1,0.36,1) forwards",
        }}
      >
        {/* Falling soccer balls */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
          {BALLS.map((b) => (
            <SoccerBall
              key={b.id}
              className="absolute"
              style={{
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                opacity: 0,
                animation: `fall-ball ${b.duration}s linear infinite`,
                animationDelay: `${b.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-border/30 bg-background/80 backdrop-blur-sm"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-foreground/60" />
        </button>

        {/* Hero image — takes most of the popup */}
        {heroImage && (
          <div className="w-full aspect-[3/4] max-h-[60vh] overflow-hidden relative z-0">
            <img
              src={heroImage}
              alt="Colección Mundial Papachoa"
              className="w-full h-full object-cover"
              loading="eager"
            />
            {/* Gradient fade into bottom area */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{ background: "linear-gradient(to top, hsl(var(--card)), transparent)" }}
            />
          </div>
        )}

        {/* Title + CTA */}
        <div className="relative z-10 px-6 pb-6 -mt-8">
          <h3 className="font-display text-2xl text-foreground text-center mb-4">
            Nueva Colección Mundial
          </h3>
          <Link
            to="/catalogo?categoria=mundial"
            onClick={() => setVisible(false)}
            className="block w-full text-center py-3 rounded-lg text-sm font-medium text-primary-foreground transition-all"
            style={{ background: "hsl(var(--primary))" }}
          >
            Ver colección
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes mundial-pop {
          from { opacity: 0; transform: scale(0.92) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fall-ball {
          0% { transform: translateY(-40px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.18; }
          90% { opacity: 0.12; }
          100% { transform: translateY(calc(100vh)) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default MundialPopup;
