'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface CartDrawerProps {
  onOpenBooking?: () => void;
}

export default function CartDrawer({ onOpenBooking }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, totalItems, totalUSD, totalINR } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col border-l border-showroom-border z-10"
          >
            {/* Header */}
            <div className="p-6 border-b border-showroom-border flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <h3 className="font-cinzel text-lg tracking-wider text-showroom-charcoal">Curated Selection</h3>
                <p className="text-xs text-showroom-muted mt-0.5 tracking-wide">
                  {totalItems} {totalItems === 1 ? 'Garment' : 'Garments'} ready for fitting / acquisition
                </p>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-showroom-charcoal hover:text-showroom-gold transition-colors rounded-full hover:bg-stone-100"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-showroom-cream flex items-center justify-center text-showroom-gold mb-4">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif-luxury text-xl text-showroom-charcoal mb-2">Your Bag is Empty</h4>
                  <p className="text-xs text-showroom-muted max-w-xs mb-6 leading-relaxed">
                    Explore our showroom collections or schedule an atelier bespoke consultation to start drafting your piece.
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-2.5 bg-showroom-charcoal text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-showroom-gold transition-colors"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 pb-6 border-b border-stone-100 last:border-b-0 group"
                  >
                    <div className="relative w-20 h-28 flex-shrink-0 bg-showroom-cream overflow-hidden border border-showroom-border">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif-luxury text-sm font-semibold text-showroom-charcoal leading-snug line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id, item.size)}
                            className="text-stone-400 hover:text-red-700 transition-colors ml-2 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-showroom-muted mt-1">{item.product.fabricOrigin}</p>
                        <p className="text-[11px] text-showroom-gold font-medium mt-0.5">Size: {item.size}</p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity selector */}
                        <div className="flex items-center border border-stone-200 rounded-sm">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size)}
                            className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-100 text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 text-xs font-semibold text-showroom-charcoal">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size)}
                            className="px-2.5 py-0.5 text-stone-600 hover:bg-stone-100 text-xs"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif-luxury text-sm font-semibold text-showroom-charcoal">
                          {formatPrice(item.product.priceUSD * item.quantity, item.product.priceINR ? item.product.priceINR * item.quantity : undefined)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-showroom-border bg-[#FAF8F5] space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-showroom-muted tracking-wide uppercase text-xs">Estimated Total:</span>
                  <span className="font-serif-luxury text-xl font-bold text-showroom-charcoal">
                    {formatPrice(totalUSD, totalINR)}
                  </span>
                </div>

                <div className="p-3 bg-white border border-showroom-border rounded-sm text-[11px] text-showroom-muted flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-showroom-gold flex-shrink-0" />
                  <span>Complimentary insured express delivery across India • Free reverse pickup for hem adjustments.</span>
                </div>

                <div className="text-[10px] text-stone-500 text-center tracking-wider">
                  UPI (GPay, PhonePe, Paytm), NetBanking & Cards Accepted
                </div>

                <button
                  onClick={() => {
                    closeCart();
                    onOpenBooking?.();
                  }}
                  className="w-full py-3.5 bg-showroom-charcoal hover:bg-showroom-gold text-white font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 rounded-sm shadow-md"
                >
                  <span>Proceed to Showroom Fitting / Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
