import { useState, useCallback } from "react";
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

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <>
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Marquee banner - more compact */}
      <div className="bg-papachoa-blush-mid overflow-hidden py-1.5">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-6 px-3">
              <span className="text-xs font-medium text-papachoa-warm-brown">✨ Enviamos a toda la República</span>
              <span className="text-papachoa-warm-brown/40">•</span>
              <span className="text-xs font-medium text-papachoa-warm-brown">🧸 Ultra suaves</span>
              <span className="text-papachoa-warm-brown/40">•</span>
              <span className="text-xs font-medium text-papachoa-warm-brown">🇲🇽 Hecho en México</span>
              <span className="text-papachoa-warm-brown/40">•</span>
              <span className="text-xs font-medium text-papachoa-warm-brown">💝 Regalo perfecto</span>
              <span className="text-papachoa-warm-brown/40">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main header - more compact */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border/30">
        <div className="container grid grid-cols-[1fr_auto_1fr] items-center py-2.5 min-h-[56px] md:min-h-[60px]">
          {/* Left column */}
          <div className="flex items-center justify-start">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <GlassBlobButton tint="blush" className="lg:hidden" aria-label="Menú">
                  <Menu className="h-[22px] w-[22px] text-foreground/95" />
                </GlassBlobButton>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] bg-background border-r-0">
                <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                <div className="mt-8">
                  <img src={logo} alt="Papachoa" className="h-10 mb-10" />
                  <nav className="flex flex-col gap-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="text-xl font-display text-foreground hover:bg-papachoa-blush/50 px-4 py-3 rounded-2xl transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-body font-semibold text-foreground/80 hover:text-foreground hover:bg-papachoa-blush/40 active:scale-95 px-5 py-2 rounded-full transition-all duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center column – Logo */}
          <Link to="/" onClick={handleLogoClick} className="justify-self-center flex items-center">
            <img 
              src={logo} 
              alt="Papachoa México" 
              className="h-9 md:h-10 w-auto"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Right column – Icons */}
          <div className="flex items-center justify-end gap-1.5">
            <GlassBlobButton tint="sky" onClick={() => setIsSearchOpen(true)} aria-label="Buscar">
              <Search className="h-[22px] w-[22px] md:h-5 md:w-5 text-foreground/95" />
            </GlassBlobButton>
            <GlassBlobButton
              tint="sage"
              onClick={() => setIsCartOpen(true)}
              aria-label="Carrito"
              badge={itemCount > 0 ? (
                <span className="bg-papachoa-warm-brown text-card text-[10px] font-bold min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center px-1">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : undefined}
            >
              <ShoppingBag className="h-[22px] w-[22px] md:h-5 md:w-5 text-foreground/95" />
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
