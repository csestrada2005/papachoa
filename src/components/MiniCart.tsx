import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const MiniCart = ({ isOpen, onClose }: MiniCartProps) => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 0,
    }).format(price);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display text-lg text-foreground">Tu carrito</h2>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-20 h-20 bg-papachoa-blush/50 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-papachoa-blush-dark" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Descubre nuestras prendas llenas de suavidad
              </p>
              <Link
                to="/catalogo"
                onClick={onClose}
                className="bg-papachoa-warm-brown text-card font-semibold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-transform text-sm"
              >
                Ver catálogo
              </Link>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-background rounded-2xl p-3"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-papachoa-cream shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/producto/${item.product.id}`}
                      onClick={onClose}
                      className="font-display text-sm text-foreground hover:text-primary transition-colors line-clamp-2"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {formattedPrice(item.product.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-7 h-7 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-papachoa-blush transition-colors"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-sm font-medium text-foreground w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-7 h-7 bg-muted rounded-full flex items-center justify-center text-foreground hover:bg-papachoa-blush transition-colors"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto text-xs text-muted-foreground hover:text-destructive transition-colors"
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

        {/* Footer - only show when items exist */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-xl text-foreground">
                {formattedPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Envío calculado al finalizar la compra
            </p>
            <button className="w-full bg-papachoa-warm-brown text-card font-semibold py-4 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform text-sm">
              Finalizar compra
            </button>
            <button
              onClick={onClose}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
