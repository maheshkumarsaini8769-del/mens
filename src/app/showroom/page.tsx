'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Clock, Phone, Calendar, Compass } from 'lucide-react';
import { SHOWROOM_LOCATIONS } from '../../data/products';
import ShowroomBookingModal from '../../components/booking/ShowroomBookingModal';

export default function ShowroomPage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeLocation, setActiveLocation] = useState(SHOWROOM_LOCATIONS[0]);

  return (
    <div className="py-12 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-[#B88E3E] text-xs uppercase tracking-[0.28em] font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>India Flagship Salons</span>
          </div>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl text-[#1C1917] font-light">
            Our Shirt & Trouser Ateliers
          </h1>
          <p className="text-sm sm:text-base text-[#78716C] leading-relaxed font-light">
            Private fitting salons in Mumbai, New Delhi, Bengaluru, and Hyderabad. Each salon houses European mill swatch books, collar sizing rings (14" to 18.5"), and on-site master hemming benches.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-5 space-y-4">
            {SHOWROOM_LOCATIONS.map((loc) => (
              <button
                key={loc.city}
                onClick={() => setActiveLocation(loc)}
                className={`w-full p-6 text-left border rounded-sm transition-all duration-300 ${
                  activeLocation.city === loc.city
                    ? 'border-[#B88E3E] bg-white shadow-lg ring-1 ring-[#B88E3E]'
                    : 'border-[#E7E2D8] bg-white/70 hover:bg-white text-[#78716C]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-serif-luxury text-xl font-semibold text-[#1C1917]">
                    {loc.city}
                  </h3>
                  <span className="text-xs uppercase tracking-wider text-[#B88E3E] font-bold">
                    {loc.district}
                  </span>
                </div>
                <p className="text-xs text-[#78716C] leading-relaxed mb-3">{loc.address}</p>
                <div className="text-xs text-[#1C1917] font-medium flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#B88E3E]" />
                  <span>{loc.phone}</span>
                </div>
              </button>
            ))}

            <div className="pt-4">
              <button
                onClick={() => setBookingOpen(true)}
                className="w-full py-4 bg-[#1C1917] hover:bg-[#B88E3E] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-sm transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Fitting Session in {activeLocation.city}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-[#E7E2D8] shadow-2xl bg-stone-100">
              <Image
                src={activeLocation.image}
                alt={activeLocation.city}
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E9D9AA] font-bold">
                  {activeLocation.city} Studio
                </span>
                <h4 className="font-serif-luxury text-2xl font-light">{activeLocation.address}</h4>
                <p className="text-xs text-stone-300 font-light flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#B88E3E]" />
                  <span>{activeLocation.hours}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShowroomBookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
