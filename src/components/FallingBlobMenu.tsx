import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface FallingBlobMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Inicio", href: "/", color: "hsl(38 45% 80%)", rotation: -2.5, offsetX: "8%" },
  { label: "Catálogo", href: "/catalogo", color: "hsl(162 18% 74%)", rotation: 3, offsetX: "-5%" },
  { label: "Nosotros", href: "/nosotros", color: "hsl(348 22% 86%)", rotation: -1.5, offsetX: "12%" },
  { label: "Contacto", href: "/contacto", color: "hsl(14 38% 74%)", rotation: 2, offsetX: "-8%" },
];

const FallingBlobMenu = ({ isOpen, onClose }: FallingBlobMenuProps) => {
  const [phase, setPhase] = useState<"closed" | "entering" | "open" | "leaving">("closed");
  const location = useLocation();

  useEffect(() => {
    if (isOpen && phase === "closed") {
      setPhase("entering");
      const t = setTimeout(() => setPhase("open"), 1100);
      return () => clearTimeout(t);
    }
    if (!isOpen && (phase === "open" || phase === "entering")) {
      setPhase("leaving");
      const t = setTimeout(() => setPhase("closed"), 650);
      return () => clearTimeout(t);
    }
  }, [isOpen, phase]);

  // Close on escape
  useEffect(() => {
    if (phase === "closed") return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (phase !== "closed") {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [phase]);

  const handleNav = useCallback((href: string) => {
    if (location.pathname === href) {
      onClose();
    } else {
      onClose();
    }
  }, [location.pathname, onClose]);

  if (phase === "closed") return null;

  const isVisible = phase === "entering" || phase === "open";

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Menú de navegación">
      {/* Warm backdrop */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          background: isVisible
            ? "hsl(20 25% 14% / 0.72)"
            : "hsl(20 25% 14% / 0)",
          backdropFilter: isVisible ? "blur(6px)" : "blur(0px)",
        }}
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] font-display text-lg tracking-wide transition-opacity duration-500"
        style={{
          color: "hsl(38 30% 88%)",
          opacity: isVisible ? 0.8 : 0,
        }}
        aria-label="Cerrar menú"
      >
        cerrar
      </button>

      {/* Falling blob items */}
      <nav className="absolute inset-0 flex flex-col items-center justify-center gap-4 md:gap-6 pointer-events-none px-6">
        {menuItems.map((item, i) => {
          const delay = i * 100; // 100ms stagger
          const blobRadius = [
            "62% 38% 42% 58% / 55% 45% 55% 45%",
            "45% 55% 60% 40% / 50% 60% 40% 50%",
            "55% 45% 38% 62% / 58% 42% 58% 42%",
            "40% 60% 55% 45% / 45% 55% 45% 55%",
          ][i];

          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => handleNav(item.href)}
              className="blob-menu-item pointer-events-auto relative block"
              style={{
                borderRadius: blobRadius,
                background: item.color,
                transform: isVisible
                  ? `translateY(0) rotate(${item.rotation}deg) translateX(${item.offsetX})`
                  : phase === "leaving"
                    ? `translateY(-120vh) rotate(${item.rotation * 2}deg) translateX(${item.offsetX})`
                    : `translateY(-120vh) rotate(${item.rotation * 3}deg) translateX(${item.offsetX})`,
                opacity: isVisible ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionDuration: isVisible ? "1000ms" : "550ms",
                transitionTimingFunction: isVisible
                  ? "cubic-bezier(0.34, 1.02, 0.68, 1)"
                  : "cubic-bezier(0.55, 0, 1, 0.45)",
                transitionDelay: isVisible ? `${delay}ms` : `${(menuItems.length - 1 - i) * 70}ms`,
                boxShadow: "0 8px 40px -12px hsl(20 30% 15% / 0.25), 0 2px 10px -4px hsl(20 30% 15% / 0.1)",
                willChange: "transform, opacity",
              }}
            >
              {/* Grain texture overlay */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "inherit",
                  opacity: 0.035,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              <span
                className="relative z-10 block font-display font-medium tracking-wide"
                style={{ color: "hsl(20 35% 15%)" }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default FallingBlobMenu;
