'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SHIRTS_AND_PANTS } from '../../data/products';
import { Product } from '../../types';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';

interface ProductGridProps {
  onQuickView: (product: Product) => void;
}

export default function ProductGridWithZoom({ onQuickView }: ProductGridProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'shirts' | 'trousers'>('all');

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const filtered =
    activeTab === 'all'
      ? SHIRTS_AND_PANTS
      : activeTab === 'shirts'
      ? SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'shirt')
      : SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'trouser');

  return (
    <section id="collection-grid" className="py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6A24] font-medium block">
              Permanent Collection
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
              Shirts & Trousers Gallery
            </h2>
          </div>

          {/* Minimal Clean Tabs */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-sm border border-stone-200">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              All ({SHIRTS_AND_PANTS.length})
            </button>
            <button
              onClick={() => setActiveTab('shirts')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors ${
                activeTab === 'shirts'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Shirts ({SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'shirt').length})
            </button>
            <button
              onClick={() => setActiveTab('trousers')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-colors ${
                activeTab === 'trousers'
                  ? 'bg-[#1C1917] text-white shadow-xs'
                  : 'text-[#78716C] hover:text-[#1C1917]'
              }`}
            >
              Trousers ({SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'trouser').length})
            </button>
          </div>
        </div>

        {/* Clean Editorial Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filtered.map((product) => {
              const isFavorited = isInWishlist(product.id);

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="group flex flex-col justify-between"
                >
                  {/* Photo Frame */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-sm border border-stone-200/80 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Minimal Category Tag */}
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold text-[#1C1917] border border-stone-200/60">
                      {product.garmentType}
                    </div>

                    {/* Quick Hover Actions */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 p-4">
                      <button
                        onClick={() => onQuickView(product)}
                        className="p-3 bg-white text-[#1C1917] rounded-full hover:bg-[#B88E3E] hover:text-white transition-colors shadow-md"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-[#B88E3E] transition-colors shadow-md flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                    {/* Wishlist Heart */}
                    <button
                      onClick={() =>
                        isFavorited ? removeFromWishlist(product.id) : addToWishlist(product)
                      }
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#1C1917] hover:text-red-600 transition-colors shadow-xs"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-600 text-red-600' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Clean Product Meta */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-[#78716C]">
                      <span>{product.fabricOrigin.split(',')[0]}</span>
                      <span>{product.gsmWeight}</span>
                    </div>

                    <h3 className="font-serif-luxury text-base font-normal text-[#1C1917] line-clamp-1 group-hover:text-[#8C6A24] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#78716C] font-light line-clamp-1">
                      {product.garmentType === 'shirt' ? product.collarType?.split('(')[0] : product.waistband?.split('with')[0]}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                      <span className="font-serif-luxury text-base font-semibold text-[#1C1917]">
                        {formatPrice(product.priceUSD, product.priceINR)}
                      </span>
                      <button
                        onClick={() => onQuickView(product)}
                        className="text-xs text-[#8C6A24] font-medium hover:underline underline-offset-4"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
