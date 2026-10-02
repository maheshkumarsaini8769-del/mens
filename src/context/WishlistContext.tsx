'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

interface WishlistContextType {
  wishlist: Product[];
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  toggleWishlist: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  totalWishlist: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('atelier_wishlist');
      if (saved) {
        setWishlist(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveWishlist = (items: Product[]) => {
    setWishlist(items);
    try {
      localStorage.setItem('atelier_wishlist', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      const updated = [...wishlist, product];
      saveWishlist(updated);
    }
  };

  const removeFromWishlist = (productId: string) => {
    const updated = wishlist.filter((item) => item.id !== productId);
    saveWishlist(updated);
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isOpen,
        openWishlist: () => setIsOpen(true),
        closeWishlist: () => setIsOpen(false),
        toggleWishlist: () => setIsOpen((prev) => !prev),
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        totalWishlist: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
