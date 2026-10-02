'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function WishlistDrawer() {
  const { wishlist, isOpen, closeWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
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
            onClick={closeWishlist}
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
                <h3 className="font-cinzel text-lg tracking-wider text-showroom-charcoal">Saved Silhouettes</h3>
                <p className="text-xs text-showroom-muted mt-0.5 tracking-wide">
                  {wishlist.length} {wishlist.length === 1 ? 'Design' : 'Designs'} in your private archive
                </p>
              </div>
              <button
                onClick={closeWishlist}
                className="p-2 text-showroom-charcoal hover:text-showroom-gold transition-colors rounded-full hover:bg-stone-100"
                aria-label="Close Wishlist"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-showroom-cream flex items-center justify-center text-showroom-gold mb-4">
                    <Heart className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h4 className="font-serif-luxury text-xl text-showroom-charcoal mb-2">No Saved Pieces Yet</h4>
                  <p className="text-xs text-showroom-muted max-w-xs mb-6 leading-relaxed">
                    Click the heart icon on any runway silhouette or bespoke look to curate your private showroom collection.
                  </p>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 pb-6 border-b border-stone-100 last:border-b-0 group"
                  >
                    <div className="relative w-20 h-28 flex-shrink-0 bg-showroom-cream overflow-hidden border border-showroom-border">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif-luxury text-sm font-semibold text-showroom-charcoal leading-snug line-clamp-1">
                            {product.name}
                          </h4>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="text-stone-400 hover:text-red-700 transition-colors ml-2 p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[11px] text-showroom-muted mt-1">{product.fabricOrigin}</p>
                        <p className="font-serif-luxury text-sm font-semibold text-showroom-charcoal mt-1">
                          {formatPrice(product.priceUSD, product.priceINR)}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          addToCart(product);
                          removeFromWishlist(product.id);
                        }}
                        className="mt-3 py-1.5 px-3 bg-showroom-cream hover:bg-showroom-gold text-showroom-charcoal hover:text-white text-[11px] uppercase tracking-wider font-semibold rounded-sm transition-colors flex items-center justify-center gap-1.5 w-full"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
