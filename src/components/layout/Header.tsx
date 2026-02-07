import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import SearchModal from "@/components/SearchModal";
import MiniCart from "@/components/MiniCart";
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
        <div className="container flex items-center justify-between py-2.5">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-full transition-colors">
              <Menu className="h-5 w-5 text-foreground" />
              <span className="sr-only">Menú</span>
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

          {/* Logo - priority loading */}
          <Link to="/" className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <img 
              src={logo} 
              alt="Papachoa México" 
              className="h-9 md:h-10 w-auto"
              loading="eager"
              fetchPriority="high"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
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

          {/* Icons */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-foreground/70 hover:text-foreground hover:bg-muted active:scale-95 rounded-full transition-all duration-150"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-foreground/70 hover:text-foreground hover:bg-papachoa-sage active:scale-95 rounded-full transition-all duration-150 relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-papachoa-warm-brown text-card text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
              <span className="sr-only">Carrito</span>
            </button>
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
