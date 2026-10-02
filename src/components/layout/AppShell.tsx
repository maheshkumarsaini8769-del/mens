'use client';

import React, { useState } from 'react';
import { CurrencyProvider } from '../../context/CurrencyContext';
import { CartProvider } from '../../context/CartContext';
import { WishlistProvider } from '../../context/WishlistContext';
import SmoothScrollProvider from '../common/SmoothScrollProvider';
import ScrollProgressBar from '../common/ScrollProgressBar';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import ShowroomBookingModal from '../booking/ShowroomBookingModal';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <SmoothScrollProvider>
            <ScrollProgressBar />
            <Navbar onOpenBooking={() => setBookingOpen(true)} />
            <main className="min-h-screen bg-showroom-bg pt-20">
              {children}
            </main>
            <Footer onOpenBooking={() => setBookingOpen(true)} />
            <CartDrawer onOpenBooking={() => setBookingOpen(true)} />
            <WishlistDrawer />
            <ShowroomBookingModal
              isOpen={bookingOpen}
              onClose={() => setBookingOpen(false)}
            />
          </SmoothScrollProvider>
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}
