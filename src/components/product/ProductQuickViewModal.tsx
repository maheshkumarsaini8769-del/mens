'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, ZoomIn, Ruler, Sparkles, Check } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export default function ProductQuickViewModal({ product, onClose, onOpenBooking }: QuickViewProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    product?.garmentType === 'shirt' ? '15.5" (39cm) Neck' : '32" Waist / 32" Inseam'
  );

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const shirtSizes = ['15" (38cm)', '15.5" (39cm)', '16" (41cm)', '16.5" (42cm)', 'Bespoke Neck & Sleeve'];
  const trouserSizes = ['30" Waist', '32" Waist', '34" Waist', '36" Waist', 'Bespoke Waist & Inseam'];
  const sizes = product.garmentType === 'shirt' ? shirtSizes : trouserSizes;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white border border-[#E7E2D8] rounded-sm shadow-2xl overflow-hidden z-10 my-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-stone-500 hover:text-[#1C1917] bg-white/80 backdrop-blur-sm rounded-full transition-colors border border-[#E7E2D8]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: Image with Zoom */}
            <div className="md:col-span-6 p-6 bg-[#FAF8F5] border-r border-[#E7E2D8] flex flex-col justify-center">
              <div className="relative aspect-[3/4] w-full bg-stone-100 rounded-sm overflow-hidden border border-[#E7E2D8] group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover object-top transition-transform duration-500 cursor-zoom-in ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#E7E2D8] text-xs text-[#1C1917] font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#B88E3E]" />
                  <span>{isZoomed ? '1x Normal' : '2x Zoom View'}</span>
                </button>
              </div>
            </div>

            {/* Right: Garment Specs */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B88E3E] font-bold">
                    {product.categoryLabel}
                  </span>
                  <button
                    onClick={() =>
                      isFavorited ? removeFromWishlist(product.id) : addToWishlist(product)
                    }
                    className="text-stone-400 hover:text-[#B88E3E] transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                <h3 className="font-serif-luxury text-2xl text-[#1C1917]">
                  {product.name}
                </h3>

                <p className="font-serif-luxury text-2xl font-bold text-[#1C1917]">
                  {formatPrice(product.priceUSD, product.priceINR)}
                </p>

                <p className="text-xs text-[#78716C] leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E7E2D8] rounded-sm space-y-2">
                <div className="text-[10px] uppercase tracking-wider text-[#B88E3E] font-bold">
                  {product.garmentType === 'shirt' ? 'Shirt Architecture' : 'Trouser Architecture'}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#1C1917]">
                  <div>
                    <span className="text-stone-400 block text-[10px]">Cloth Mill:</span>
                    <span className="font-medium">{product.fabricOrigin}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px]">Weave & Weight:</span>
                    <span className="font-medium">{product.gsmWeight}</span>
                  </div>
                  {product.garmentType === 'shirt' ? (
                    <>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Collar:</span>
                        <span className="font-medium">{product.collarType?.split('(')[0]}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Buttons:</span>
                        <span className="font-medium">{product.buttonType?.split('with')[0]}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Waistband:</span>
                        <span className="font-medium">{product.waistband?.split('with')[0]}</span>
                      </div>
                      <div>
                        <span className="text-stone-400 block text-[10px]">Pleats & Hem:</span>
                        <span className="font-medium">{product.pleats}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Sizing */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
                    Select Sizing
                  </span>
                  <span className="text-[10px] text-[#B88E3E] flex items-center gap-1 font-medium">
                    <Ruler className="w-3 h-3" /> Custom hemming / collar available
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2 px-1 text-[10px] font-medium border rounded-sm transition-colors text-center ${
                        selectedSize === s
                          ? 'border-[#1C1917] bg-[#1C1917] text-white'
                          : 'border-[#E7E2D8] hover:bg-stone-50 text-[#1C1917]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    addToCart(product, selectedSize);
                    onClose();
                  }}
                  className="w-full py-3.5 bg-[#B88E3E] hover:bg-[#8C6A24] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking?.();
                  }}
                  className="w-full py-2.5 bg-white hover:bg-stone-50 text-[#1C1917] border border-stone-300 font-semibold text-xs uppercase tracking-[0.2em] transition-colors rounded-sm text-center"
                >
                  Book Showroom Trial For This Piece
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
