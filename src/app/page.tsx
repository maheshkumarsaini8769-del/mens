'use client';

import React, { useState } from 'react';
import ShirtTrouserHeroZoom from '../components/home/ShirtTrouserHeroZoom';
import InteractivePairMatchmaker from '../components/home/InteractivePairMatchmaker';
import CollarCuffZoomInspector from '../components/home/CollarCuffZoomInspector';
import ProductGridWithZoom from '../components/home/ProductGridWithZoom';
import ShirtTailoringProcess from '../components/home/ShirtTailoringProcess';
import ProductQuickViewModal from '../components/product/ProductQuickViewModal';
import ShowroomBookingModal from '../components/booking/ShowroomBookingModal';
import { Product } from '../types';

export default function HomePage() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* 1. Scroll-Zoom Hero (Strictly Shirts & Trousers) */}
      <ShirtTrouserHeroZoom onOpenBooking={() => setBookingModalOpen(true)} />

      {/* 2. Interactive Shirt + Trouser Pair Matchmaker (Scroll-Driven Combinations) */}
      <InteractivePairMatchmaker />

      {/* 3. Collar & Waistband Micro-Zoom Loupe Inspector */}
      <CollarCuffZoomInspector />

      {/* 4. Complete Filterable Collection with Zoom Cards */}
      <ProductGridWithZoom onQuickView={(p) => setQuickViewProduct(p)} />

      {/* 5. Four-Stage Shirt & Trouser Savoir-Faire */}
      <ShirtTailoringProcess onOpenBooking={() => setBookingModalOpen(true)} />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onOpenBooking={() => {
            setQuickViewProduct(null);
            setBookingModalOpen(true);
          }}
        />
      )}

      {/* Showroom Trial Booking Modal */}
      <ShowroomBookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
}
