import { useState } from "react";
import { Menu, Search, User, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logo from "@/assets/logo-papachoa.webp";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Marquee banner */}
      <div className="bg-papachoa-blush-mid overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap flex">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span className="text-sm font-medium text-papachoa-warm-brown">✨ Enviamos a toda la República</span>
              <span className="text-papachoa-warm-brown/50">•</span>
              <span className="text-sm font-medium text-papachoa-warm-brown">🧸 Ultra suaves</span>
              <span className="text-papachoa-warm-brown/50">•</span>
              <span className="text-sm font-medium text-papachoa-warm-brown">🇲🇽 Hecho en México</span>
              <span className="text-papachoa-warm-brown/50">•</span>
              <span className="text-sm font-medium text-papachoa-warm-brown">💝 El regalo perfecto</span>
              <span className="text-papachoa-warm-brown/50">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main header */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border/30">
        <div className="container flex items-center justify-between py-4">
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
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-xl font-display text-foreground hover:bg-papachoa-blush/50 px-4 py-3 rounded-2xl transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <a href="/" className="flex-1 lg:flex-none flex justify-center lg:justify-start">
            <img 
              src={logo} 
              alt="Papachoa México" 
              className="h-10 md:h-12 w-auto"
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-body font-semibold text-foreground/80 hover:text-foreground hover:bg-papachoa-blush/40 px-5 py-2.5 rounded-full transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition-all">
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </button>
            <button className="p-2.5 text-foreground/70 hover:text-foreground hover:bg-muted rounded-full transition-all hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Cuenta</span>
            </button>
            <button className="p-2.5 text-foreground/70 hover:text-foreground hover:bg-papachoa-sage rounded-full transition-all relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
