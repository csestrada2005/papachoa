import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/data/products";
import { createShopifyCart, addLineToShopifyCart, updateShopifyCartLine, removeLineFromShopifyCart } from "@/lib/shopify";

export interface CartItem {
  product: Product;
  quantity: number;
  lineId?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  checkoutUrl: string | null;
  isSyncing: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(localStorage.getItem('shopifyCartId'));
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(localStorage.getItem('shopifyCheckoutUrl'));
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (cartId) {
      localStorage.setItem('shopifyCartId', cartId);
    } else {
      localStorage.removeItem('shopifyCartId');
    }
    if (checkoutUrl) {
      localStorage.setItem('shopifyCheckoutUrl', checkoutUrl);
    } else {
      localStorage.removeItem('shopifyCheckoutUrl');
    }
  }, [cartId, checkoutUrl]);

  const addItem = async (product: Product) => {
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      await updateQuantity(product.id, existing.quantity + 1);
      return;
    }

    setIsSyncing(true);
    try {
      if (!cartId) {
        const result = await createShopifyCart(product.id, 1);
        if (result) {
          setCartId(result.cartId);
          setCheckoutUrl(result.checkoutUrl);
          setItems((prev) => [...prev, { product, quantity: 1, lineId: result.lineId }]);
        }
      } else {
        const result = await addLineToShopifyCart(cartId, product.id, 1);
        if (result.success) {
          setItems((prev) => [...prev, { product, quantity: 1, lineId: result.lineId }]);
        }
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const removeItem = async (productId: string) => {
    const existing = items.find((item) => item.product.id === productId);
    if (!existing || !existing.lineId || !cartId) {
      setItems((prev) => prev.filter((item) => item.product.id !== productId));
      return;
    }

    setIsSyncing(true);
    try {
      const success = await removeLineFromShopifyCart(cartId, existing.lineId);
      if (success) {
        setItems((prev) => prev.filter((item) => item.product.id !== productId));
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(productId);
      return;
    }

    const existing = items.find((item) => item.product.id === productId);
    if (!existing || !existing.lineId || !cartId) {
       setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
      return;
    }

    setIsSyncing(true);
    try {
      const success = await updateShopifyCartLine(cartId, existing.lineId, quantity);
      if (success) {
        setItems((prev) =>
          prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        );
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const clearCart = () => {
      setItems([]);
      setCartId(null);
      setCheckoutUrl(null);
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        checkoutUrl,
        isSyncing,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
