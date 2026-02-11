import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo-papachoa.webp";
import { brand } from "@/data/brand";
import { openExternal } from "@/lib/openExternal";
import { prefetchRoute } from "@/hooks/usePrefetch";

const footerLinks = {
  tienda: [
    { label: "Cat\u00e1logo", href: "/catalogo" },
    { label: "Colecciones", href: "/catalogo" },
    { label: "Novedades", href: "/catalogo" },
  ],
  empresa: [
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  legal: [
    { label: "T\u00e9rminos y condiciones", href: "/terminos" },
    { label: "Pol\u00edtica de devoluci\u00f3n", href: "/devoluciones" },
    { label: "Privacidad", href: "/privacidad" },
    { label: "Preguntas frecuentes", href: "/faq" },
  ],
};

const paymentMethods = ["Visa", "Mastercard", "AMEX", "OXXO", "SPEI"];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden texture-linen texture-woven" style={{
      background: "linear-gradient(165deg, hsl(20 32% 18%) 0%, hsl(20 28% 15%) 50%, hsl(228 25% 16%) 100%)"
    }}>
      {/* Fabric fold top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[calc(100%-1px)]">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L60 55C120 50 240 40 360 38.3C480 37 600 43 720 46.7C840 50 960 50 1080 48.3C1200 47 1320 43 1380 41.7L1440 40V60H0Z" 
            fill="hsl(20, 32%, 18%)"
          />
        </svg>
      </div>

      {/* Embroidered sun motif — atmospheric */}
      <svg className="absolute top-16 right-12 w-[200px] h-[200px] opacity-[0.03] hidden md:block" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="50" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.6" strokeDasharray="3 5" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(38 60% 62%)" strokeWidth="0.4" strokeDasharray="4 7" />
      </svg>

      <div className="container py-16 md:py-20 relative z-10">
        {/* Cross-stitch divider */}
        <div className="mb-14" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 4px, hsl(38 60% 52% / 0.15) 4px, hsl(38 60% 52% / 0.15) 5px, transparent 5px, transparent 9px), repeating-linear-gradient(90deg, transparent 2px, transparent 6px, hsl(38 60% 52% / 0.1) 6px, hsl(38 60% 52% / 0.1) 7px, transparent 7px, transparent 11px)`,
          height: "6px",
          backgroundSize: "12px 3px",
          backgroundPosition: "0 0, 3px 3px"
        }} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={logo}
              alt="Papachoa M\u00e9xico"
              className="h-10 w-auto mb-6 brightness-0 invert opacity-80"
              loading="lazy"
              decoding="async"
              width={120}
              height={40}
            />
            <p className="text-sm mb-6 max-w-xs leading-relaxed" style={{ color: "hsl(38 20% 60%)" }}>
              Pijamas y cobijos ultra suaves pensados por mam\u00e1s, para mam\u00e1s.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e) => openExternal(brand.socials.instagramUrl, e)}
                aria-label="S\u00edguenos en Instagram"
                className="w-10 h-10 flex items-center justify-center transition-all cursor-pointer hover:opacity-100 opacity-50"
                style={{ border: "1.5px dashed hsl(38 60% 52% / 0.2)", borderRadius: "2px", color: "hsl(38 30% 80%)" }}
              >
                <Instagram className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={(e) => openExternal(brand.socials.facebookUrl, e)}
                aria-label="S\u00edguenos en Facebook"
                className="w-10 h-10 flex items-center justify-center transition-all cursor-pointer hover:opacity-100 opacity-50"
                style={{ border: "1.5px dashed hsl(38 60% 52% / 0.2)", borderRadius: "2px", color: "hsl(38 30% 80%)" }}
              >
                <Facebook className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-display text-lg mb-5" style={{ color: "hsl(38 30% 85%)" }}>Tienda</h4>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm transition-colors hover:opacity-100 opacity-55"
                    style={{ color: "hsl(38 20% 72%)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display text-lg mb-5" style={{ color: "hsl(38 30% 85%)" }}>Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm transition-colors hover:opacity-100 opacity-55"
                    style={{ color: "hsl(38 20% 72%)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg mb-5" style={{ color: "hsl(38 30% 85%)" }}>Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    onMouseEnter={() => prefetchRoute(link.href)}
                    onTouchStart={() => prefetchRoute(link.href)}
                    className="text-sm transition-colors hover:opacity-100 opacity-55"
                    style={{ color: "hsl(38 20% 72%)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mb-8" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 4px, hsl(38 60% 52% / 0.1) 4px, hsl(38 60% 52% / 0.1) 5px, transparent 5px, transparent 9px)`,
          height: "2px",
        }} />
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm order-2 md:order-1" style={{ color: "hsl(38 15% 45%)" }}>
            &copy; {new Date().getFullYear()} Papachoa M&eacute;xico
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 order-1 md:order-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="text-xs px-3 py-1.5"
                style={{
                  color: "hsl(38 20% 60%)",
                  border: "1px solid hsl(38 20% 25%)",
                  borderRadius: "2px",
                }}
              >
                {method}
              </span>
            ))}
          </div>

          <p className="text-sm font-medium order-3 tracking-wide" style={{ color: "hsl(38 30% 70%)" }}>MXN $</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
