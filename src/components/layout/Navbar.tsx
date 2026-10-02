'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { Currency } from '../../types';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

  const { openCart, totalItems } = useCart();
  const { openWishlist, totalWishlist } = useWishlist();
  const { currency, setCurrency } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'INR'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Featherlight Single-Tier Luxury Navigation */}
      <nav
        className={`px-6 sm:px-10 lg:px-14 py-2.5 sm:py-3 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_10px_rgba(0,0,0,0.03)] border-b border-stone-200/60'
            : 'bg-[#FAF8F5]/90 backdrop-blur-sm border-b border-stone-200/40'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* LEFT: Light, Minimalist Brand Logo */}
          <Link href="/" className="flex items-baseline gap-2 group flex-shrink-0">
            <span className="font-serif-luxury text-[15px] sm:text-[17px] font-normal tracking-[0.26em] text-stone-900 group-hover:text-[#8C6A24] transition-colors uppercase">
              Crease & Collar
            </span>
            <span className="text-[#8C6A24] text-[9px] font-light tracking-widest hidden sm:inline-block">
              ✦ SHIRTS & TROUSERS
            </span>
          </Link>

          {/* CENTER: Featherlight Navigation Links */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9 text-[11px] uppercase tracking-[0.24em] text-stone-600 font-light">
            <a
              href="#collection-grid"
              className="hover:text-stone-900 transition-colors py-1 relative group"
            >
              <span>Shirts</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8C6A24] transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#collection-grid"
              className="hover:text-stone-900 transition-colors py-1 relative group"
            >
              <span>Trousers</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8C6A24] transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#pair-matchmaker"
              className="hover:text-stone-900 transition-colors py-1 relative group"
            >
              <span>Pair Studio</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8C6A24] transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#collar-zoom"
              className="hover:text-stone-900 transition-colors py-1 relative group"
            >
              <span>Zoom Loupe</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8C6A24] transition-all duration-300 group-hover:w-full" />
            </a>

            <a
              href="#craftsmanship"
              className="hover:text-stone-900 transition-colors py-1 relative group"
            >
              <span>Atelier</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8C6A24] transition-all duration-300 group-hover:w-full" />
            </a>
          </div>

          {/* RIGHT: Minimalist, Airy Actions */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            {/* Fixed Indian Currency Hallmark */}
            <div className="flex items-center gap-1 text-[11px] tracking-wider text-stone-700 py-1 px-1.5 font-medium select-none">
              <span className="text-[#8C6A24] font-semibold">₹</span>
              <span className="text-stone-500 text-[10px]">INR</span>
            </div>

            {/* Wishlist */}
            <button
              onClick={openWishlist}
              className="relative p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-[17px] h-[17px] stroke-[1.25]" />
              {totalWishlist > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-[#8C6A24] text-white text-[7px] font-bold rounded-full flex items-center justify-center">
                  {totalWishlist}
                </span>
              )}
            </button>

            {/* Bag */}
            <button
              onClick={openCart}
              className="relative p-1.5 text-stone-700 hover:text-stone-950 transition-colors"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-[17px] h-[17px] stroke-[1.25]" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-3 h-3 bg-stone-900 text-white text-[7px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Ultra-chic Minimal Fitting CTA */}
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-normal px-3 py-1.5 border border-stone-300 hover:border-stone-900 text-stone-800 hover:text-stone-950 transition-all duration-200"
            >
              Fitting Trial
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-stone-800 hover:text-[#8C6A24]"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 stroke-[1.5]" /> : <Menu className="w-5 h-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white border-t border-stone-200 mt-2 py-3 px-3 space-y-2.5 text-xs"
            >
              <a
                href="#collection-grid"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 uppercase tracking-[0.2em] text-stone-800 border-b border-stone-100"
              >
                Shirts Collection
              </a>
              <a
                href="#collection-grid"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 uppercase tracking-[0.2em] text-stone-800 border-b border-stone-100"
              >
                Trousers Collection
              </a>
              <a
                href="#pair-matchmaker"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 uppercase tracking-[0.2em] text-stone-800 border-b border-stone-100"
              >
                Pair Studio Matchmaker
              </a>
              <a
                href="#collar-zoom"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 uppercase tracking-[0.2em] text-stone-800 border-b border-stone-100"
              >
                Macro Precision Loupe
              </a>
              <a
                href="#craftsmanship"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 uppercase tracking-[0.2em] text-stone-800 border-b border-stone-100"
              >
                Atelier Craftsmanship
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking?.();
                }}
                className="w-full py-2 bg-stone-900 text-white uppercase font-normal tracking-[0.2em] text-[10px] mt-2"
              >
                Book Showroom Fitting
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
