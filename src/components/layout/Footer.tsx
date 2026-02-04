import { Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo-papachoa.webp";

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
  ],
};

const paymentMethods = ["Visa", "Mastercard", "AMEX", "OXXO", "SPEI"];

const Footer = () => {
  return (
    <footer className="bg-papachoa-cream relative">
      {/* Wave top */}
      <div className="absolute top-0 left-0 right-0 -translate-y-full">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 60L60 55C120 50 240 40 360 38.3C480 37 600 43 720 46.7C840 50 960 50 1080 48.3C1200 47 1320 43 1380 41.7L1440 40V60H0Z" 
            className="fill-papachoa-cream"
          />
        </svg>
      </div>

      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-1">
            <img
              src={logo}
              alt="Papachoa México"
              className="h-10 w-auto mb-6"
            />
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              Pijamas y cobijos ultra suaves pensados por mamás, para mamás. 🧸
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/papachoamx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-papachoa-blush rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://facebook.com/papachoamx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-papachoa-sky rounded-full flex items-center justify-center text-foreground/70 hover:text-foreground hover:scale-110 transition-all"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5">Tienda</h4>
            <ul className="space-y-3">
              {footerLinks.tienda.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-lg text-foreground mb-5">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground order-2 md:order-1">
              © {new Date().getFullYear()} Papachoa México
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-2 order-1 md:order-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="text-xs text-muted-foreground bg-card px-3 py-1.5 rounded-full"
                >
                  {method}
                </span>
              ))}
            </div>

            <p className="text-sm font-medium text-foreground order-3">MXN $</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
