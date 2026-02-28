import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, X, Menu } from "lucide-react";
import { products } from "@/data/products";
import MiniCart from "@/components/MiniCart";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo-papachoa.webp";

/* ─────────────────────────────────────────
   Papachoa Header — Japanese-minimal v6
   – transparent → white on scroll
   – inline search palette (no modal)
   – premium cart button with stamp badge
   ───────────────────────────────────────── */

const NAV_LINKS = [
  { label: "Filosofía",   href: "/#filosofia" },
  { label: "Colecciones", href: "/#colecciones" },
  { label: "Ver colección", href: "/catalogo", highlight: true },
  { label: "Contacto",    href: "/contacto" },
];

const MENU_LINKS = [
  { label: "Inicio", href: "/#hero" },
  { label: "Somos Papachoa", href: "/#about" },
  { label: "Colecciones", href: "/#colecciones" },
  { label: "Más Vendidos", href: "/#productos" },
  { label: "Nuestra Colección", href: "/#coleccion-completa" },
  { label: "Para Pintar", href: "/#para-pintar" },
  { label: "Próximamente", href: "/#proximamente" },
  { label: "Contacto", href: "/contacto" },
];

interface HeaderProps {
  transparent?: boolean;
}

/* ── Inline Search Palette ── */
const InlineSearch = ({ onClose }: { onClose: () => void }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.collection.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleResult = (id: string) => {
    navigate(`/producto/${id}`);
    onClose();
  };

  const fmt = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(price);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Palette — drops from header */}
      <div
        className="absolute top-full left-0 right-0 z-50 mx-4 md:mx-auto md:left-1/2 md:-translate-x-1/2 md:w-[520px]"
        style={{ animation: "search-drop 0.22s cubic-bezier(0.22,1,0.36,1) forwards" }}
        role="dialog"
        aria-label="Buscador"
      >
        <div className="mt-2 rounded-2xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.14)] border border-border/20 bg-card/95 backdrop-blur-xl">
          {/* Input row */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/15">
            <Search className="h-4 w-4 text-muted-foreground/60 shrink-0" strokeWidth={1.5} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos…"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/40 outline-none text-sm tracking-wide"
              aria-label="Buscar productos"
            />
            <button
              onClick={onClose}
              className="p-1 text-muted-foreground/50 hover:text-foreground transition-colors rounded-full"
              aria-label="Cerrar buscador"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[56vh] overflow-y-auto">
            {!query.trim() && (
              <p className="px-5 py-5 text-xs text-muted-foreground/50 tracking-widest uppercase text-center">
                Escribe para buscar
              </p>
            )}
            {query.trim() && results.length === 0 && (
              <p className="px-5 py-5 text-sm text-muted-foreground text-center">
                Sin resultados para «{query}»
              </p>
            )}
            {results.length > 0 && (
              <div className="py-2">
                {results.map((p, i) => (
                  <button
                    key={p.id}
                    onClick={() => handleResult(p.id)}
                    className="w-full flex items-center gap-3.5 px-4 py-2.5 hover:bg-muted/60 transition-colors text-left group"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <div className="w-11 h-11 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{fmt(p.price)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

/* ── Polka Dots SVG pattern for pill buttons ── */
const PillDots = () => (
  <svg className="pill-dots" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="80%" cy="20%" r="3" fill="hsl(43,90%,72%)" opacity="0.7"/>
    <circle cx="15%" cy="30%" r="2.5" fill="hsl(340,60%,75%)" opacity="0.6"/>
    <circle cx="70%" cy="75%" r="3.5" fill="hsl(196,55%,72%)" opacity="0.65"/>
    <circle cx="30%" cy="70%" r="2" fill="hsl(20,75%,70%)" opacity="0.55"/>
    <circle cx="88%" cy="58%" r="2" fill="hsl(196,55%,72%)" opacity="0.5"/>
    <circle cx="50%" cy="85%" r="2.5" fill="hsl(43,90%,72%)" opacity="0.6"/>
    <circle cx="8%"  cy="65%" r="3" fill="hsl(340,60%,78%)" opacity="0.5"/>
    <circle cx="55%" cy="15%" r="2" fill="hsl(20,75%,70%)" opacity="0.55"/>
    <circle cx="40%" cy="45%" r="1.5" fill="hsl(43,90%,72%)" opacity="0.4"/>
    <circle cx="92%" cy="38%" r="1.8" fill="hsl(340,60%,75%)" opacity="0.45"/>
  </svg>
);

/* ── Cart Badge ── */
const CartBadge = ({ count }: { count: number }) => (
  <span
    key={count}
    className="absolute -top-1.5 -right-1.5 min-w-[17px] h-[17px] rounded-full flex items-center justify-center px-0.5 leading-none text-[9px] font-bold bg-primary text-primary-foreground z-20"
    style={{ animation: "stamp-pop 0.32s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
    aria-hidden="true"
  >
    {count > 9 ? "9+" : count}
  </span>
);

/* ── Main Header ── */
const Header = ({ transparent = false }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const prevCount = useRef(itemCount);
  const [badgeKey, setBadgeKey] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  /* lock body scroll when menu is open */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* badge pop on new item */
  useEffect(() => {
    if (itemCount > prevCount.current) {
      setBadgeKey((k) => k + 1);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => {
      const threshold = transparent ? window.innerHeight * 2.5 : 48;
      setScrolled(window.scrollY > threshold);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const handleLogoClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      }
    },
    [location.pathname, navigate]
  );

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("/#")) return;
      e.preventDefault();
      const id = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 350);
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
          background: isTransparent ? "transparent" : "rgba(247,244,243,0.94)",
          backdropFilter: isTransparent ? "none" : "blur(16px)",
          borderBottom: isTransparent
            ? "1px solid transparent"
            : "1px solid hsl(var(--border) / 0.22)",
          animation: "header-fadein 0.22s ease-out forwards",
        }}
      >
        <div
          className="container flex items-center justify-between transition-all duration-300 relative"
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
                filter: "none",
              }}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* ── Nav (desktop) ── */}
          <nav className="hidden md:flex items-center" aria-label="Navegación principal">
            {NAV_LINKS.map((link, i) => (
              <span key={link.href} className="flex items-center">
                <Link
                  to={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`text-sm transition-all duration-200 relative group ${(link as any).highlight ? 'font-semibold' : 'font-medium'}`}
                  style={{ color: (link as any).highlight ? '#ac3c72' : "hsl(var(--foreground))", letterSpacing: "0.03em", paddingBottom: "2px" }}
                >
                  <span className="relative">
                    {link.label}
                    <span
                      className="absolute bottom-0 left-0 w-full h-px bg-foreground origin-right"
                      style={{ transform: "scaleX(0)", transition: "transform 0.3s ease" }}
                    />
                  </span>
                </Link>
                {i < NAV_LINKS.length - 1 && (
                  <span className="mx-2.5 text-muted-foreground/40 text-sm select-none" aria-hidden="true">,</span>
                )}
              </span>
            ))}
          </nav>

          {/* ── Right: Search + Cart ── */}
          <div className="flex items-center gap-2.5">

            {/* Search pill button */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Buscar productos"
              aria-expanded={searchOpen}
              className="pill-btn search-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1"
            >
              <PillDots />
              {/* Sunburst */}
              <span className="pill-sunburst search-sunburst" aria-hidden="true" />
              {/* Icon */}
              <span className="pill-icon-wrap">
                {searchOpen
                  ? <X className="w-[18px] h-[18px] text-[hsl(196,60%,52%)]" strokeWidth={2} />
                  : (
                    <svg viewBox="0 0 22 22" className="w-[20px] h-[20px]" fill="none" aria-hidden="true">
                      <circle cx="9.5" cy="9.5" r="6.5" stroke="hsl(196,60%,52%)" strokeWidth="2.2" />
                      {/* Smile inside lens */}
                      <path d="M7.2 10.5 Q9.5 12.5 11.8 10.5" stroke="hsl(43,90%,58%)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                      <line x1="14.2" y1="14.2" x2="18.5" y2="18.5" stroke="hsl(196,60%,52%)" strokeWidth="2.2" strokeLinecap="round"/>
                    </svg>
                  )
                }
              </span>
            </button>

            {/* Cart pill button */}
            <button
              key={`cart-${badgeKey}`}
              onClick={() => setIsCartOpen(true)}
              aria-label={`Tu carrito${itemCount > 0 ? ` — ${itemCount} ${itemCount === 1 ? "producto" : "productos"}` : " (vacío)"}`}
              className="pill-btn cart-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1"
              style={badgeKey > 0 ? { animation: "pill-bounce 0.42s cubic-bezier(0.34,1.56,0.64,1)" } : undefined}
            >
              <PillDots />
              {/* Sunburst */}
              <span className="pill-sunburst cart-sunburst" aria-hidden="true" />
              {/* Icon */}
              <span className="pill-icon-wrap">
                <svg viewBox="0 0 22 22" className="w-[20px] h-[20px]" fill="none" aria-hidden="true">
                  {/* Bag body */}
                  <path d="M4 8h14l-1.5 9.5a1.5 1.5 0 01-1.5 1.3H7a1.5 1.5 0 01-1.5-1.3L4 8z" stroke="hsl(340,55%,60%)" strokeWidth="2" fill="none"/>
                  {/* Bag handle */}
                  <path d="M8 8V6.5a3 3 0 016 0V8" stroke="hsl(340,55%,60%)" strokeWidth="2" strokeLinecap="round"/>
                  {/* Smile inside bag */}
                  <path d="M9 13.5 Q11 15.5 13 13.5" stroke="hsl(340,55%,60%)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  {/* Tag */}
                  <rect x="12.5" y="7" width="5" height="3.5" rx="0.8" fill="hsl(43,90%,65%)" opacity="0.9"/>
                  <line x1="14.5" y1="7" x2="14.5" y2="6" stroke="hsl(20,75%,65%)" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                {itemCount > 0 && <CartBadge key={badgeKey} count={itemCount} />}
              </span>
            </button>

            {/* Hamburger menu button */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              className="pill-btn menu-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1"
            >
              <PillDots />
              <span className="pill-sunburst search-sunburst" aria-hidden="true" />
              <span className="pill-icon-wrap">
                <Menu className="w-[18px] h-[18px] text-foreground/70" strokeWidth={2} />
              </span>
            </button>
          </div>

          {/* Search palette (drops below header) */}
          {searchOpen && (
            <InlineSearch onClose={() => setSearchOpen(false)} />
          )}
        </div>
      </header>

      {/* Spacer */}
      {!transparent && <div style={{ height: "74px" }} aria-hidden="true" />}

      {/* ── Fullscreen Menu Overlay ── */}
      <div
        className="fixed inset-0 z-[60]"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
        }}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(0,0,0,0.3)",
            opacity: menuOpen ? 1 : 0,
            transition: "opacity 300ms ease-out",
          }}
        />
        {/* Panel */}
        <div
          style={{
            position: "absolute", top: 0, right: 0, bottom: 0,
            width: "100%", maxWidth: "420px",
            background: "#FDF6F0",
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 350ms cubic-bezier(0.22,1,0.36,1)",
            display: "flex", flexDirection: "column",
            padding: "24px",
          }}
        >
          {/* Close button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
              className="p-2 rounded-full hover:bg-muted/60 transition-colors"
            >
              <X className="w-6 h-6 text-foreground/70" strokeWidth={1.5} />
            </button>
          </div>

          {/* Menu links */}
          <nav className="flex flex-col gap-1 flex-1" aria-label="Menú principal">
            {MENU_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  if (link.href.startsWith("/#")) {
                    const id = link.href.replace("/#", "");
                    if (location.pathname !== "/") {
                      navigate("/");
                      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 400);
                    } else {
                      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
                    }
                  } else {
                    navigate(link.href);
                  }
                }}
                className="text-lg font-medium tracking-wide py-3 px-2 rounded-xl hover:bg-muted/60 transition-all duration-200"
                style={{
                  color: "#3D3028",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(40px)",
                  transition: `opacity 300ms ease-out ${100 + i * 100}ms, transform 300ms ease-out ${100 + i * 100}ms, background-color 200ms ease`,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <style>{`
        @keyframes header-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes search-drop {
          from { opacity: 0; transform: translateY(-6px) scaleY(0.96); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        @keyframes stamp-pop {
          0%   { transform: scale(0) rotate(-12deg); opacity: 0; }
          65%  { transform: scale(1.2) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes pill-bounce {
          0%   { transform: scale(1); }
          30%  { transform: scale(0.9) translateY(2px); }
          65%  { transform: scale(1.06) translateY(-3px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes confetti-burst {
          0%   { transform: scale(0.6); opacity: 0; }
          50%  { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes sunburst-pop {
          0%   { opacity: 0; transform: scale(0.6) rotate(0deg); }
          60%  { opacity: 1; transform: scale(1.1) rotate(15deg); }
          100% { opacity: 0; transform: scale(1) rotate(25deg); }
        }

        /* ── Nav underline sweep ── */
        header nav a:hover > span > span {
          transform: scaleX(1) !important;
          transform-origin: left !important;
        }

        /* ── Pill button base ── */
        .pill-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 36px;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          border: none;
          /* 3D depth: top highlight + bottom shadow */
          background: linear-gradient(170deg, #fffdf9 0%, #f9f4ef 100%);
          box-shadow:
            0 1px 0 0 rgba(255,255,255,0.9) inset,
            0 -1px 0 0 rgba(0,0,0,0.04) inset,
            0 4px 0 0 rgba(0,0,0,0.10),
            0 6px 12px -2px rgba(0,0,0,0.08),
            0 1px 3px rgba(0,0,0,0.06);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          user-select: none;
        }
        .pill-btn:hover {
          transform: translateY(-1px);
          box-shadow:
            0 1px 0 0 rgba(255,255,255,0.9) inset,
            0 -1px 0 0 rgba(0,0,0,0.04) inset,
            0 6px 0 0 rgba(0,0,0,0.10),
            0 10px 18px -4px rgba(0,0,0,0.10),
            0 2px 4px rgba(0,0,0,0.06);
        }
        .pill-btn:active {
          transform: translateY(3px) scale(0.97);
          box-shadow:
            0 1px 0 0 rgba(255,255,255,0.9) inset,
            0 -1px 0 0 rgba(0,0,0,0.04) inset,
            0 1px 0 0 rgba(0,0,0,0.10),
            0 2px 6px -1px rgba(0,0,0,0.08);
        }

        /* Polka dots SVG (fills pill background) */
        .pill-dots {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Icon wrapper */
        .pill-icon-wrap {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1);
        }
        .pill-btn:hover .pill-icon-wrap {
          transform: scale(1.08);
        }
        .pill-btn:active .pill-icon-wrap {
          transform: scale(0.93);
        }

        /* Sunburst burst on hover */
        .pill-sunburst {
          position: absolute;
          inset: -4px;
          border-radius: 24px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s;
          z-index: 5;
        }
        .search-sunburst {
          background: radial-gradient(ellipse at 30% 50%, hsl(196,60%,85%,0.35) 0%, transparent 65%);
        }
        .cart-sunburst {
          background: radial-gradient(ellipse at 50% 40%, hsl(340,60%,85%,0.35) 0%, transparent 65%);
        }
        .pill-btn:hover .pill-sunburst {
          opacity: 1;
        }

        /* Extra sparkle rays on cart hover */
        .cart-pill::after {
          content: '';
          position: absolute;
          top: 4px;
          right: 8px;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: hsl(43,90%,65%);
          transform: scale(0);
          transition: transform 0.2s ease 0.05s, opacity 0.2s;
          opacity: 0;
          z-index: 6;
        }
        .cart-pill:hover::after {
          transform: scale(1);
          opacity: 0.8;
        }

        /* New item pop: animate the whole cart pill */
        .cart-pill.item-added {
          animation: pill-bounce 0.42s cubic-bezier(0.34,1.56,0.64,1);
        }
      `}</style>
    </>
  );
};

export default Header;
