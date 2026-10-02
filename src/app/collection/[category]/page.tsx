'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { SHIRTS_AND_PANTS } from '../../../data/products';
import { Product } from '../../../types';
import { Sparkles, Heart, ShoppingBag, Eye, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useCurrency } from '../../../context/CurrencyContext';
import ProductQuickViewModal from '../../../components/product/ProductQuickViewModal';
import ShowroomBookingModal from '../../../components/booking/ShowroomBookingModal';

export default function CollectionPage() {
  const params = useParams();
  const categoryParam = params.category as string;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { formatPrice } = useCurrency();

  const products =
    categoryParam === 'all'
      ? SHIRTS_AND_PANTS
      : categoryParam === 'shirts'
      ? SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'shirt')
      : categoryParam === 'trousers'
      ? SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'trouser')
      : SHIRTS_AND_PANTS.filter((p) => p.category === categoryParam);

  const categoryName =
    categoryParam === 'formal-shirts'
      ? 'Formal Dress Shirts'
      : categoryParam === 'linen-shirts'
      ? 'Pure Linen Resort Shirts'
      : categoryParam === 'casual-shirts'
      ? 'Oxford & Utility Shirts'
      : categoryParam === 'gurkha-trousers'
      ? 'Gurkha Pleated Trousers'
      : categoryParam === 'dress-trousers'
      ? 'Pleated Dress Trousers'
      : categoryParam === 'sartorial-chinos'
      ? 'Sartorial Chinos'
      : categoryParam === 'shirts'
      ? 'All Handcrafted Shirts'
      : categoryParam === 'trousers'
      ? 'All Tailored Trousers'
      : 'Shirt & Trouser Archive';

  return (
    <div className="py-12 bg-[#FAF8F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#78716C] hover:text-[#1C1917] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Atelier Showroom</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[#B88E3E] text-xs uppercase tracking-[0.28em] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Collection</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-[#1C1917] font-light">
            {categoryName}
          </h1>
          <p className="text-sm text-[#78716C] leading-relaxed font-light">
            Exclusively shirts and tailored trousers, hand-cut to order from archival cotton, linen, and four-season wools.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const isFavorited = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="bg-white border border-[#E7E2D8] rounded-sm p-3.5 group transition-all duration-300 hover:shadow-xl hover:border-[#B88E3E] flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 rounded-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-112"
                  />

                  <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                    <span className="bg-[#1C1917] text-white text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5">
                      {product.garmentType.toUpperCase()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2.5 p-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="p-3 bg-white text-[#1C1917] rounded-full hover:bg-[#B88E3E] hover:text-white transition-colors shadow-lg"
                      title="Inspect"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-3.5 py-2.5 bg-[#1C1917] text-white text-xs uppercase tracking-wider font-semibold rounded-sm hover:bg-[#B88E3E] transition-colors shadow-lg flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Select</span>
                    </button>
                  </div>

                  <button
                    onClick={() =>
                      isFavorited ? removeFromWishlist(product.id) : addToWishlist(product)
                    }
                    className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#1C1917] hover:text-[#B88E3E] transition-colors shadow-sm"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`}
                    />
                  </button>
                </div>

                {/* Meta */}
                <div className="pt-3 pb-1 px-1 space-y-1">
                  <div className="flex justify-between text-[10px] text-[#B88E3E] uppercase tracking-wider font-semibold">
                    <span>{product.categoryLabel}</span>
                    <span>{product.gsmWeight}</span>
                  </div>
                  <h3 className="font-serif-luxury text-sm font-semibold text-[#1C1917] line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-[11px] text-[#78716C] line-clamp-1">
                    {product.garmentType === 'shirt' ? product.collarType : product.pleats}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-stone-200">
                    <span className="font-serif-luxury text-sm font-bold text-[#1C1917]">
                      {formatPrice(product.priceUSD, product.priceINR)}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="text-xs text-[#B88E3E] font-semibold underline underline-offset-2"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenBooking={() => {
            setSelectedProduct(null);
            setBookingOpen(true);
          }}
        />
      )}

      <ShowroomBookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
