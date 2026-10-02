'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, size?: string, fit?: string) => void;
  removeFromCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalUSD: number;
  totalINR: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('atelier_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveItems = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem('atelier_cart', JSON.stringify(newItems));
    } catch {
      // ignore
    }
  };

  const addToCart = (product: Product, size = '40R (Custom)', fit = 'Regular Tailored') => {
    const existingIndex = items.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );

    let updated: CartItem[];
    if (existingIndex > -1) {
      updated = items.map((item, idx) =>
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...items, { product, quantity: 1, size, fit }];
    }

    saveItems(updated);
    setIsOpen(true);
  };

  const removeFromCart = (productId: string, size?: string) => {
    const updated = items.filter(
      (item) => !(item.product.id === productId && (!size || item.size === size))
    );
    saveItems(updated);
  };

  const updateQuantity = (productId: string, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    const updated = items.map((item) =>
      item.product.id === productId && (!size || item.size === size)
        ? { ...item, quantity }
        : item
    );
    saveItems(updated);
  };

  const clearCart = () => {
    saveItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalUSD = items.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const totalINR = items.reduce(
    (sum, item) =>
      sum + (item.product.priceINR || Math.round(item.product.priceUSD * 83.5)) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        toggleCart: () => setIsOpen((prev) => !prev),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalUSD,
        totalINR,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
