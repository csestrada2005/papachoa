import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import SearchModal from "@/components/SearchModal";
import MiniCart from "@/components/MiniCart";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo-papachoa.webp";

/* ─────────────────────────────────────────
   Elena-style Header for Papachoa
   – transparent → white on scroll
   – logo left · anchor nav center · lang + cart right
   – padding compresses 300 ms on scroll
   ───────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Filosofía",   href: "/#filosofia" },
  { label: "Colecciones", href: "/#colecciones" },
  { label: "Catálogo",    href: "/catalogo" },
  { label: "Contacto",    href: "/contacto" },
];

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  const [scrolled,      setScrolled]      = useState(false);
  const [isSearchOpen,  setIsSearchOpen]  = useState(false);
  const [isCartOpen,    setIsCartOpen]    = useState(false);
  const { itemCount } = useCart();
  const location  = useLocation();
  const navigate  = useNavigate();

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => {
      // On transparent (homepage) pages, stay invisible until hero section is fully passed (~200vh)
      const threshold = transparent ? window.innerHeight * 2 : 48;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  /* logo click → smooth scroll home */
  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        e.preventDefault();
        navigate("/");
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      }
    },
    [location.pathname, navigate]
  );

  /* anchor nav: smooth scroll + offset for sticky header */
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("/#")) return;
      e.preventDefault();
      const id = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 350);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  const isTransparent = transparent && !scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isTransparent
            ? "transparent"
            : "rgba(255,255,255,0.94)",
          backdropFilter: isTransparent ? "none" : "blur(14px)",
          borderBottom: isTransparent
            ? "1px solid transparent"
            : "1px solid hsl(var(--border) / 0.25)",
          /* fade in on mount */
          animation: "header-fadein 0.22s ease-out forwards",
        }}
      >
        <div
          className="container flex items-center justify-between transition-all duration-300"
          style={{ paddingTop: scrolled ? "12px" : "20px", paddingBottom: scrolled ? "12px" : "20px" }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="flex-shrink-0 flex items-center"
            aria-label="Papachoa México — inicio"
          >
            <img
              src={logo}
              alt="Papachoa México"
              className="w-auto transition-all duration-300"
              style={{
                height: scrolled ? "28px" : "34px",
                filter: isTransparent ? "brightness(0)" : "none",
              }}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* ── Nav links (desktop) ── */}
          <nav
            className="hidden md:flex items-center"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  to={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm font-medium transition-all duration-200 relative group"
                  style={{
                    color: isTransparent
                      ? "hsl(var(--foreground))"
                      : "hsl(var(--foreground))",
                    letterSpacing: "0.03em",
                    paddingBottom: "2px",
                  }}
                >
                  <span className="relative">
                    {link.label}
                    {/* underline sweep — Elena style */}
                    <span
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-right"
                      style={{
                        transform: "scaleX(0)",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </span>
                </Link>
                {/* comma separator — Elena style */}
                {i < NAV_LINKS.length - 1 && (
                  <span
                    className="mx-2.5 text-muted-foreground/40 text-sm select-none"
                    aria-hidden="true"
                  >
                    ,
                  </span>
                )}
              </span>
            ))}
          </nav>

          {/* ── Right side: lang + icons ── */}
          <div className="flex items-center gap-4">
            {/* Language selector — Elena style */}
            <div
              className="hidden md:flex items-center gap-1 text-xs tracking-wider"
              aria-label="Idioma"
            >
              <span
                className="font-semibold text-foreground cursor-default"
                style={{ letterSpacing: "0.1em" }}
              >
                ES
              </span>
              <span className="text-muted-foreground/30">▾</span>
              <span
                className="text-muted-foreground/35 cursor-not-allowed"
                title="Próximamente en inglés"
                style={{ letterSpacing: "0.1em" }}
              >
                EN
              </span>
            </div>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Buscar"
              className="flex items-center justify-center w-8 h-8 text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <Search className="w-[17px] h-[17px]" strokeWidth={1.8} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Carrito${itemCount > 0 ? ` (${itemCount})` : ""}`}
              className="relative flex items-center justify-center w-8 h-8 text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              <ShoppingBag className="w-[17px] h-[17px]" strokeWidth={1.8} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-1 bg-primary text-primary-foreground text-[9px] font-bold min-w-[15px] h-[15px] rounded-full flex items-center justify-center px-0.5 leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Spacer: only show when NOT transparent (transparent header overlays the hero) */}
      {!transparent && <div style={{ height: "74px" }} aria-hidden="true" />}

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <style>{`
        @keyframes header-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        /* Underline sweep on hover — must target the inner span */
        header nav a:hover > span > span {
          transform: scaleX(1) !important;
          transform-origin: left !important;
        }
      `}</style>
    </>
  );
};

export default Header;
