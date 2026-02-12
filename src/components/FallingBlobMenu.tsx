import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface FallingBlobMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Inicio", href: "/", color: "hsl(38 45% 80%)", rotation: -3, offsetX: "6%" },
  { label: "Catálogo", href: "/catalogo", color: "hsl(162 18% 74%)", rotation: 4, offsetX: "-4%" },
  { label: "Nosotros", href: "/nosotros", color: "hsl(348 22% 86%)", rotation: -2, offsetX: "10%" },
  { label: "Contacto", href: "/contacto", color: "hsl(14 38% 74%)", rotation: 3, offsetX: "-6%" },
];

const blobRadii = [
  "62% 38% 42% 58% / 55% 45% 55% 45%",
  "45% 55% 60% 40% / 50% 60% 40% 50%",
  "55% 45% 38% 62% / 58% 42% 58% 42%",
  "40% 60% 55% 45% / 45% 55% 45% 55%",
];

const FallingBlobMenu = ({ isOpen, onClose }: FallingBlobMenuProps) => {
  const [mounted, setMounted] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const closingRef = useRef(false);
  const location = useLocation();

  // OPEN: mount → next frame trigger animateIn
  useEffect(() => {
    if (isOpen && !mounted && !closingRef.current) {
      setAnimateOut(false);
      setAnimateIn(false);
      setMounted(true);
      // Force a frame so initial styles (translateY -120px) are painted before transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateIn(true);
        });
      });
    }
  }, [isOpen, mounted]);

  // CLOSE: animate out → unmount after transition
  useEffect(() => {
    if (!isOpen && mounted && !closingRef.current) {
      closingRef.current = true;
      setAnimateIn(false);
      setAnimateOut(true);
      const t = setTimeout(() => {
        setMounted(false);
        setAnimateOut(false);
        closingRef.current = false;
      }, 500);
      return () => clearTimeout(t);
    }
  }, [isOpen, mounted]);

  // Lock body scroll
  useEffect(() => {
    if (mounted) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mounted]);

  // ESC key
  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mounted, onClose]);

  const handleNav = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!mounted) return null;

  const show = animateIn && !animateOut;

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label="Menú de navegación"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          background: show
            ? "hsl(20 25% 14% / 0.30)"
            : "hsl(20 25% 14% / 0)",
          backdropFilter: show ? "blur(6px)" : "blur(0px)",
        }}
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[110] font-display text-lg tracking-wide transition-opacity duration-400"
        style={{
          color: "hsl(38 30% 88%)",
          opacity: show ? 0.8 : 0,
        }}
        aria-label="Cerrar menú"
      >
        cerrar
      </button>

      {/* Nav items with safe vertical padding */}
      <nav
        className="blob-menu-nav absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6"
        style={{
          paddingTop: "clamp(24px, 8vh, 80px)",
          paddingBottom: "clamp(24px, 8vh, 80px)",
          gap: "clamp(12px, 2vh, 24px)",
        }}
      >
        {menuItems.map((item, i) => {
          const staggerDelay = i * 110;
          const exitDelay = (menuItems.length - 1 - i) * 60;

          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={handleNav}
              className="blob-menu-item pointer-events-auto relative block"
              style={{
                borderRadius: blobRadii[i],
                background: item.color,
                transform: show
                  ? `translateY(0px) rotate(${item.rotation}deg) translateX(${item.offsetX})`
                  : animateOut
                    ? `translateY(-20px) rotate(${item.rotation * 0.5}deg) translateX(${item.offsetX})`
                    : `translateY(-120px) rotate(${item.rotation * 2}deg) translateX(${item.offsetX})`,
                opacity: show ? 1 : 0,
                transitionProperty: "transform, opacity",
                transitionDuration: show ? "750ms" : "400ms",
                transitionTimingFunction: show
                  ? "cubic-bezier(0.22, 1, 0.36, 1)"
                  : "cubic-bezier(0.4, 0, 1, 1)",
                transitionDelay: show ? `${staggerDelay}ms` : `${exitDelay}ms`,
                boxShadow: "0 8px 40px -12px hsl(20 30% 15% / 0.2), 0 2px 10px -4px hsl(20 30% 15% / 0.08)",
                willChange: "transform, opacity",
              }}
            >
              {/* Grain */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: "inherit",
                  opacity: 0.03,
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
