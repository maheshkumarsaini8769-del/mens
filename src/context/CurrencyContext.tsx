'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Currency } from '../types';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceUSD: number, priceINR?: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  // India-exclusive website defaults to INR
  const [currency, setCurrency] = useState<Currency>('INR');

  useEffect(() => {
    const saved = localStorage.getItem('atelier_currency') as Currency;
    if (saved) {
      setCurrency(saved);
    } else {
      setCurrency('INR');
      localStorage.setItem('atelier_currency', 'INR');
    }
  }, []);

  const handleSetCurrency = (c: Currency) => {
    setCurrency(c);
    localStorage.setItem('atelier_currency', c);
  };

  const formatPrice = (priceUSD: number, priceINR?: number) => {
    if (priceINR) {
      return `₹${priceINR.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(priceUSD * 83.5);
    return `₹${converted.toLocaleString('en-IN')}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: handleSetCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
}
