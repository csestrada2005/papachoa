import { Link, useLocation, useNavigate } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo-papachoa.webp";
import { brand } from "@/data/brand";
import { openExternal } from "@/lib/openExternal";
import { prefetchRoute } from "@/hooks/usePrefetch";
import { useCallback } from "react";
import printPajaritos from "@/assets/brand/print-pajaritos.png";

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

const paymentMethods = ["Visa", "Mastercard", "AMEX", "OXXO", "SPEI"];

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleFooterLink = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (location.pathname === href) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        navigate(href);
        requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" }));
      }
    },
    [location.pathname, navigate],
  );

  return (
    <footer className="relative overflow-hidden" style={{ background: "hsl(220 15% 14%)" }}>
      {/* Pajaritos pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: `url(${printPajaritos})`, backgroundSize: "250px", backgroundRepeat: "repeat" }}
      />

      <div className="container py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <img src={logo} alt="Papachoa México" className="h-10 w-auto mb-6 brightness-0 invert opacity-80" loading="lazy" decoding="async" width={120} height={40} />
            <p className="text-sm mb-6 max-w-xs leading-relaxed text-white/50">
              Pijamas y cobijos ultra suaves pensados por mamás, para mamás.
            </p>
            <div className="flex gap-3">
              <button type="button" onClick={(e) => openExternal(brand.socials.instagramUrl, e)} aria-label="Síguenos en Instagram" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer">
                <Instagram className="h-4 w-4" />
              </button>
              <button type="button" onClick={(e) => openExternal(brand.socials.facebookUrl, e)} aria-label="Síguenos en Facebook" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer">
                <Facebook className="h-4 w-4" />
              </button>
            </div>
          </div>

          {[
            { title: "Tienda", links: footerLinks.tienda },
            { title: "Empresa", links: footerLinks.empresa },
            { title: "Legal", links: footerLinks.legal },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-sm font-bold mb-5 text-white/80 tracking-wide uppercase">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      onClick={(e) => handleFooterLink(e, link.href)}
                      onMouseEnter={() => prefetchRoute(link.href)}
                      onTouchStart={() => prefetchRoute(link.href)}
                      className="text-sm text-white/40 hover:text-white/70 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/30 order-2 md:order-1">
            &copy; {new Date().getFullYear()} Papachoa México
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 order-1 md:order-2">
            {paymentMethods.map((method) => (
              <span key={method} className="text-xs px-3 py-1.5 text-white/40 border border-white/10 rounded-full">
                {method}
              </span>
            ))}
          </div>
          <p className="text-sm font-bold text-white/50 order-3">MXN $</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;