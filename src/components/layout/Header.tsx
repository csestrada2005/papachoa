import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import SearchModal from "@/components/SearchModal";
import MiniCart from "@/components/MiniCart";
import GlassBlobButton from "@/components/ui/GlassBlobButton";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo-papachoa.webp";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const handleLogoClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      e.preventDefault();
      navigate("/");
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
    }
  }, [location.pathname, navigate]);

  const isTransparent = transparent && !scrolled;

  return (
    <>
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Top banner — integrated, no box separation */}
      <div
        className="overflow-hidden py-1.5 transition-colors duration-500"
        style={{
          background: isTransparent
            ? "hsl(20 32% 20% / 0.6)"
            : "hsl(20 32% 20%)",
          backdropFilter: isTransparent ? "blur(8px)" : undefined,
        }}
      >
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span className="text-xs font-medium text-papachoa-cream/70 tracking-wide">Enviamos a toda la República</span>
              <svg className="w-2 h-2 text-papachoa-cream/20" viewBox="0 0 8 8"><line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" strokeWidth="1.2" /><line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1.2" /></svg>
              <span className="text-xs font-medium text-papachoa-cream/70 tracking-wide">Textiles ultra suaves</span>
              <svg className="w-2 h-2 text-papachoa-cream/20" viewBox="0 0 8 8"><line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" strokeWidth="1.2" /><line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1.2" /></svg>
              <span className="text-xs font-medium text-papachoa-cream/70 tracking-wide">Hecho en México</span>
              <svg className="w-2 h-2 text-papachoa-cream/20" viewBox="0 0 8 8"><line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" strokeWidth="1.2" /><line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1.2" /></svg>
              <span className="text-xs font-medium text-papachoa-cream/70 tracking-wide">El regalo perfecto</span>
              <svg className="w-2 h-2 text-papachoa-cream/20" viewBox="0 0 8 8"><line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" strokeWidth="1.2" /><line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1.2" /></svg>
            </div>
          ))}
        </div>
      </div>

      {/* Main header — transparent on hero, solid on scroll */}
      <div
        className="transition-all duration-500"
        style={{
          background: isTransparent
            ? "transparent"
            : "hsl(var(--background) / 0.95)",
          backdropFilter: isTransparent ? undefined : "blur(12px)",
          borderBottom: isTransparent
            ? "1px solid transparent"
            : "1px solid hsl(var(--border) / 0.3)",
        }}
      >
        <div className="container grid grid-cols-[1fr_auto_1fr] items-center py-2.5 min-h-[56px] md:min-h-[60px]">
          {/* Left column */}
          <div className="flex items-center justify-start">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <GlassBlobButton tint="blush" className="lg:hidden" aria-label="Menú">
                  <Menu className="h-[20px] w-[20px] text-foreground" strokeWidth={2} />
                </GlassBlobButton>
              </SheetTrigger>
              {/* TEXTILE MENU */}
              <SheetContent side="left" className="w-[300px] border-r-0 relative overflow-hidden texture-linen" style={{ background: "hsl(38 32% 94%)" }}>
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="absolute inset-0 pointer-events-none texture-woven" />
                <svg className="absolute bottom-10 right-4 w-32 h-32 opacity-[0.04]" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(14 52% 46%)" strokeWidth="1" strokeDasharray="3 5" />
                  <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(38 60% 52%)" strokeWidth="0.8" strokeDasharray="4 7" />
                </svg>
                <div className="mt-8 relative z-10">
                  <img src={logo} alt="Papachoa" className="h-10 mb-10" />
                  <div className="divider-cross-stitch w-full mb-8" />
                  <nav className="flex flex-col gap-0">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="font-display text-2xl text-foreground hover:text-primary px-4 py-4 transition-colors relative group"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                        <span className="absolute bottom-2 left-4 right-4 h-[1px] bg-primary/0 group-hover:bg-primary/20 transition-colors" style={{
                          backgroundImage: "repeating-linear-gradient(90deg, hsl(14 52% 46% / 0.25) 0px, hsl(14 52% 46% / 0.25) 4px, transparent 4px, transparent 7px)",
                          backgroundSize: "100% 1px",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "bottom"
                        }} />
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`nav-textile-link text-sm font-body font-medium px-4 py-2 transition-colors ${
                    isTransparent
                      ? "text-white/80 hover:text-white"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link to="/" onClick={handleLogoClick} className="justify-self-center flex items-center">
            <img 
              src={logo} 
              alt="Papachoa México" 
              className={`h-9 md:h-10 w-auto transition-all duration-500 ${
                isTransparent ? "brightness-[2] drop-shadow-md" : ""
              }`}
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          <div className="flex items-center justify-end gap-1.5">
            <GlassBlobButton tint="sky" onClick={() => setIsSearchOpen(true)} aria-label="Buscar">
              <Search className="h-[20px] w-[20px] md:h-[18px] md:w-[18px] text-foreground" strokeWidth={2} />
            </GlassBlobButton>
            <GlassBlobButton
              tint="sage"
              onClick={() => setIsCartOpen(true)}
              aria-label="Carrito"
              badge={itemCount > 0 ? (
                <span className="bg-primary text-primary-foreground text-[10px] font-bold min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center px-1">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : undefined}
            >
              <ShoppingBag className="h-[20px] w-[20px] md:h-[18px] md:w-[18px] text-foreground" strokeWidth={2} />
            </GlassBlobButton>
          </div>
        </div>
      </div>
    </header>

    <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    <MiniCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
