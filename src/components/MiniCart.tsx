import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const { items, removeItem, updateQuantity, subtotal, checkoutUrl, isSyncing } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  /* Lock body scroll while open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const fmt = (price: number) =>
    new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0 }).format(price);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-label="Tu carrito">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-[3px]"
        onClick={onClose}
        style={{ animation: "cart-fade-in 0.25s ease-out forwards" }}
      />

      {/* Drawer panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 h-full w-full max-w-[380px] bg-card flex flex-col"
        style={{
          animation: "cart-slide-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards",
          borderLeft: "1px solid hsl(var(--border) / 0.18)",
          boxShadow: "-12px 0 40px -8px rgba(0,0,0,0.10)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid hsl(var(--border) / 0.18)" }}>
          <div className="flex items-center gap-2.5">
            <span className="text-xs tracking-[0.18em] uppercase text-muted-foreground font-medium">Tu carrito</span>
            {items.length > 0 && (
              <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-semibold">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar carrito"
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <X className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* ── Empty state ── */
            <div className="flex flex-col items-center justify-center h-full px-8 py-12 text-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                style={{ background: "hsl(var(--muted))" }}
              >
                <ShoppingBag className="h-7 w-7 text-muted-foreground/50" strokeWidth={1.3} />
              </div>
              <p className="text-sm text-foreground font-medium mb-1.5">Tu carrito está vacío.</p>
              <p className="text-xs text-muted-foreground mb-7 leading-relaxed">
                Descubre nuestras pijamas de algodón<br />suave, hechas en México.
              </p>
              <Link
                to="/catalogo"
                onClick={onClose}
                className="text-xs tracking-[0.14em] uppercase font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            /* ── Items ── */
            <div className="px-4 py-4 space-y-3">
              {items.map((item, idx) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 rounded-2xl p-3"
                  style={{
                    background: "hsl(var(--muted) / 0.45)",
                    animation: `cart-item-in 0.22s ease-out ${idx * 40}ms both`,
                  }}
                >
                  <div className="w-18 h-18 rounded-xl overflow-hidden shrink-0" style={{ width: "68px", height: "68px" }}>
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/producto/${item.product.id}`}
                      onClick={onClose}
                      className="text-sm text-foreground hover:text-primary transition-colors line-clamp-2 leading-snug"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">{fmt(item.product.price)}</p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        aria-label="Quitar uno"
                        className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/40"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-semibold text-foreground w-5 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        aria-label="Agregar uno"
                        className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/40"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-[11px] text-muted-foreground/60 hover:text-destructive transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-5 py-5 space-y-4"
            style={{ borderTop: "1px solid hsl(var(--border) / 0.18)" }}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">Subtotal</span>
              <span className="text-lg font-display text-foreground">{fmt(subtotal)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground/60 text-center -mt-1">
              Envío calculado al finalizar la compra
            </p>
            {checkoutUrl ? (
              <a
                href={checkoutUrl}
                className={`w-full py-3.5 rounded-full text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-200 hover:opacity-85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 block text-center ${isSyncing ? 'opacity-50 pointer-events-none' : ''}`}
                style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
              >
                {isSyncing ? 'Sincronizando...' : 'Finalizar compra'}
              </a>
            ) : (
              <button
                disabled={isSyncing}
                className={`w-full py-3.5 rounded-full text-xs tracking-[0.14em] uppercase font-semibold transition-all duration-200 hover:opacity-85 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ background: "hsl(var(--foreground))", color: "hsl(var(--background))" }}
              >
                {isSyncing ? 'Sincronizando...' : 'Finalizar compra'}
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full text-[11px] tracking-wider uppercase text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cart-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cart-slide-in {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes cart-item-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MiniCart;
