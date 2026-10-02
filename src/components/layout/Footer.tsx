'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Scissors, Sparkles, MapPin, Phone, Clock } from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../../data/products';

export default function Footer({ onOpenBooking }: { onOpenBooking?: () => void }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-20 pb-12 border-t-4 border-[#B88E3E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Invitation */}
        <div className="border-b border-[#332E29] pb-14 mb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-[#B88E3E] text-xs uppercase tracking-[0.25em] font-semibold">
              <Scissors className="w-4 h-4" />
              <span>The Shirtmaker & Trouser Tailor</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light tracking-wide leading-tight">
              Flawless collar balance. <br />
              <span className="italic text-[#E9D9AA]">Permanent trouser drape.</span>
            </h2>
            <p className="text-[#A8A29E] text-xs sm:text-sm max-w-xl font-light leading-relaxed">
              Every shirt and pair of trousers is tailored to eliminate collar gapping and leg break stacking. Visit our showrooms for custom neck and inseam calibration.
            </p>
          </div>

          <div className="lg:col-span-5 bg-[#26221E] p-6 sm:p-7 rounded-sm border border-[#3E3832] flex flex-col gap-3">
            <h3 className="font-serif-luxury text-base tracking-wider text-white">Atelier Fabric Dispatch</h3>
            <p className="text-xs text-[#A8A29E] font-light">
              Receive seasonal swatch bundles from Albini, Thomas Mason, and Brisbane Moss mills directly to your desk.
            </p>
            {subscribed ? (
              <div className="p-3 bg-[#B88E3E]/20 border border-[#B88E3E] text-[#E9D9AA] text-xs tracking-wider text-center">
                ✦ Swatch parcel queued for dispatch.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter executive email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#181513] border border-[#443E38] text-white placeholder-stone-500 text-xs px-3.5 py-3 rounded-none focus:outline-none focus:border-[#B88E3E] flex-1"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[#B88E3E] hover:bg-[#8C6A24] text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
                >
                  <span>Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Global Showrooms */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#B88E3E]" />
              <h3 className="text-xs uppercase tracking-[0.22em] text-white font-semibold">India Flagship Fitting Studios</h3>
            </div>
            <button
              onClick={onOpenBooking}
              className="text-xs text-[#B88E3E] hover:text-white underline underline-offset-4 tracking-wider transition-colors"
            >
              Book Studio Measurement in Mumbai, Delhi, Blr or Hyd →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SHOWROOM_LOCATIONS.map((loc) => (
              <div
                key={loc.city}
                className="p-4 bg-[#231F1C] border border-[#38322B] rounded-sm hover:border-[#B88E3E] transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-serif-luxury text-base text-white">{loc.city}</h4>
                  <span className="text-[10px] text-[#B88E3E] uppercase">{loc.district}</span>
                </div>
                <p className="text-[11px] text-[#A8A29E] leading-relaxed mb-2">{loc.address}</p>
                <div className="text-[11px] text-stone-400 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#B88E3E]" />
                  <span>{loc.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust */}
        <div className="border-t border-[#332E29] pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A8A29E]">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B88E3E]" />
              <span>Complimentary Lifetime Hem & Button Re-stitching across India Ateliers</span>
            </div>
            <div className="flex items-center gap-2 text-[#E9D9AA]">
              <span>✦ PAN-India Insured Delivery & GST Invoicing</span>
            </div>
          </div>
          <p>© {new Date().getFullYear()} CREASE & COLLAR INDIA ATELIER. FINE SHIRTS & TROUSERS.</p>
        </div>
      </div>
    </footer>
  );
}
