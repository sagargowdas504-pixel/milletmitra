import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  sizes: string[];
  prices?: Record<string, number>;
  badge?: string;
  category?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getItemPrice: (item: CartItem) => number;
  discount: number;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const getProductPrice = (product: Product, size: string): number => {
  if (product.prices && product.prices[size]) {
    return product.prices[size];
  }
  return product.price;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("millet_cart");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse cart from local storage", e);
      }
    }
    return [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem("millet_cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, size: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscount(0);
  };

  const getItemPrice = (item: CartItem) => getProductPrice(item.product, item.size);

  const applyPromoCode = (code: string) => {
    const upperCode = code.toUpperCase().trim();
    if (upperCode === "MILLET10") {
      setDiscount(0.1); // 10% discount
      return true;
    }
    if (upperCode === "HEALTHY20") {
      setDiscount(0.2); // 20% discount
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setDiscount(0);
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0);
  const totalPrice = Math.round(subtotal * (1 - discount));

  return (
    <CartContext.Provider
      value={{ 
        items, addToCart, removeFromCart, updateQuantity, clearCart, 
        totalItems, totalPrice, isCartOpen, setIsCartOpen, getItemPrice,
        discount, applyPromoCode, removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
