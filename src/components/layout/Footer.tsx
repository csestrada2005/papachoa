import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo-papachoa.webp";
import { brand } from "@/data/brand";
import { openExternal } from "@/lib/openExternal";
import { prefetchRoute } from "@/hooks/usePrefetch";

const footerLinks = {
  tienda: [
    { label: "Catálogo", href: "/catalogo" },
    { label: "Colecciones", href: "/catalogo" },
    { label: "Novedades", href: "/catalogo" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  legal: [
    { label: "Términos y condiciones", href: "/terminos" },
    { label: "Política de devolución", href: "/devoluciones" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Preguntas frecuentes", href: "/faq" },
  ],
};

const paymentMethods = [
  { name: "Visa", emoji: "💳" },
  { name: "Mastercard", emoji: "💳" },
  { name: "AMEX", emoji: "💳" },
  { name: "OXXO", emoji: "🏪" },
  { name: "SPEI", emoji: "🏦" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, hsl(40 55% 94%) 0%, hsl(15 50% 90%) 40%, hsl(195 50% 90%) 70%, hsl(145 35% 88%) 100%)" }}>
      
      {/* Scalloped wave top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[calc(100%-1px)]">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path 
            d="M0,30 C80,10 160,50 240,30 C320,10 400,50 480,30 C560,10 640,50 720,30 C800,10 880,50 960,30 C1040,10 1120,50 1200,30 C1280,10 1360,50 1440,30 V50 H0 Z" 
            fill="hsl(40 55% 94%)"
          />
        </svg>
      </div>

      {/* Playful background doodles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-12 -right-8 w-36 h-36 bg-papachoa-blush/25 blob-shape animate-float" />
        <div className="absolute bottom-20 -left-10 w-28 h-28 bg-papachoa-sky/20 blob-shape-2" />
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-papachoa-sage/20 rounded-full blur-xl" />
        <span className="absolute top-16 left-12 text-2xl opacity-20 animate-wiggle hidden md:block">⭐</span>
        <span className="absolute bottom-32 right-16 text-xl opacity-15 animate-float hidden md:block">✨</span>
        <span className="absolute top-1/3 right-8 text-xl opacity-15 hidden md:block">💛</span>
        {/* Squiggle decoration */}
        <svg className="absolute bottom-40 left-1/4 w-24 h-6 opacity-10 hidden md:block" viewBox="0 0 100 12">
          <path d="M0 6 Q12 0 25 6 Q37 12 50 6 Q62 0 75 6 Q87 12 100 6" fill="none" stroke="hsl(15 55% 75%)" strokeWidth="3" />
        </svg>
      </div>

      <div className="container py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={logo}
              alt="Papachoa México"
              className="h-10 w-auto mb-6"
              loading="lazy"
              decoding="async"
              width={120}
              height={40}
            />
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              Pijamas y cobijos ultra suaves pensados por mamás, para mamás. 🧸💛
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => openExternal(brand.socials.instagramUrl, e)}
                aria-label="Síguenos en Instagram"
                className="w-11 h-11 bg-papachoa-blush rounded-2xl flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-110 hover:shadow-md hover:-rotate-3 transition-all cursor-pointer border-2 border-papachoa-blush-mid/30 shadow-sm"
              >
                <Instagram className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => openExternal(brand.socials.facebookUrl, e)}
                aria-label="Síguenos en Facebook"
                className="w-11 h-11 bg-papachoa-sky rounded-2xl flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-110 hover:shadow-md hover:rotate-3 transition-all cursor-pointer border-2 border-papachoa-sky-mid/30 shadow-sm"
              >
                <Facebook className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5 flex items-center gap-2">
              🛍️ Tienda
            </h4>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5 flex items-center gap-2">
              💛 Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5 flex items-center gap-2">
              📋 Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t-2 border-papachoa-blush/30 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground order-2 md:order-1">
              © {new Date().getFullYear()} Papachoa México ✨
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-2 order-1 md:order-2">
              {paymentMethods.map((method) => (
                <span
                  key={method.name}
                  className="text-xs text-foreground/70 bg-card/80 px-3 py-1.5 rounded-full border border-papachoa-blush/20 shadow-sm font-medium"
                >
                  {method.emoji} {method.name}
                </span>
              ))}
            </div>

            <p className="text-sm font-bold text-foreground order-3 bg-papachoa-sage/40 px-4 py-1.5 rounded-full">
              🇲🇽 MXN $
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
