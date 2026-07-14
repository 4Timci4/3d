"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartLine = {
  key: string;
  productId: string;
  quantity: number;
  color: string;
  size?: string;
  note?: string;
};

type AddItemInput = Omit<CartLine, "key" | "quantity"> & { quantity?: number };

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  addItem: (item: AddItemInput) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
};

const STORAGE_KEY = "3d-printer-store-cart";
const CartContext = createContext<CartContextValue | null>(null);

function createLineKey(item: Omit<CartLine, "key" | "quantity">) {
  return [item.productId, item.color, item.size ?? "", item.note ?? ""].join("::");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored) as CartLine[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [hydrated, items]);

  const addItem = useCallback((input: AddItemInput) => {
    const key = createLineKey(input);
    const quantity = input.quantity ?? 1;
    setItems((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...current, { ...input, key, quantity }];
    });
    setCartOpen(true);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      isCartOpen,
      isCheckoutOpen,
      addItem,
      removeItem: (key) => setItems((current) => current.filter((item) => item.key !== key)),
      updateQuantity: (key, quantity) =>
        setItems((current) =>
          quantity <= 0
            ? current.filter((item) => item.key !== key)
            : current.map((item) => (item.key === key ? { ...item, quantity } : item)),
        ),
      clearCart: () => setItems([]),
      openCart: () => setCartOpen(true),
      closeCart: () => setCartOpen(false),
      openCheckout: () => {
        setCartOpen(false);
        setCheckoutOpen(true);
      },
      closeCheckout: () => setCheckoutOpen(false),
    }),
    [addItem, isCartOpen, isCheckoutOpen, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
