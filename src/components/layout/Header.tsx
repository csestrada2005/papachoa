import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag } from "lucide-react";
import SearchModal from "@/components/SearchModal";
import MiniCart from "@/components/MiniCart";
import FallingBlobMenu from "@/components/FallingBlobMenu";
import GlassBlobButton from "@/components/ui/GlassBlobButton";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/logo-papachoa.webp";


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
              <span className="text-papachoa-cream/60 text-[0.9em] px-3 leading-none">•</span>
              <span className="text-xs font-medium text-papachoa-cream/70 tracking-wide">Textiles ultra suaves</span>
              <span className="text-papachoa-cream/60 text-[0.9em] px-3 leading-none">•</span>
              <span className="text-xs font-medium text-papachoa-cream/70 tracking-wide">Hecho en México</span>
              <span className="text-papachoa-cream/60 text-[0.9em] px-3 leading-none">•</span>
              <span className="text-xs font-medium text-papachoa-cream/70 tracking-wide">El regalo perfecto</span>
              <span className="text-papachoa-cream/60 text-[0.9em] px-3 leading-none">•</span>
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
            <GlassBlobButton tint="blush" onClick={() => setIsOpen(true)} aria-label="Menú">
              <Menu className="h-[20px] w-[20px] text-foreground" strokeWidth={2} />
            </GlassBlobButton>
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
    <FallingBlobMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Header;
