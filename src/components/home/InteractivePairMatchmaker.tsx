'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SHIRTS_AND_PANTS } from '../../data/products';
import { ShoppingBag, Check, Layers } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function InteractivePairMatchmaker() {
  const shirts = SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'shirt');
  const trousers = SHIRTS_AND_PANTS.filter((p) => p.garmentType === 'trouser');

  const [selectedShirtIdx, setSelectedShirtIdx] = useState(0);
  const [selectedTrouserIdx, setSelectedTrouserIdx] = useState(0);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const currentShirt = shirts[selectedShirtIdx];
  const currentTrouser = trousers[selectedTrouserIdx];

  const totalUSD = currentShirt.priceUSD + currentTrouser.priceUSD;
  const totalINR = currentShirt.priceINR + currentTrouser.priceINR;

  const handleAddPair = () => {
    addToCart(currentShirt);
    addToCart(currentTrouser);
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <section id="pair-matchmaker" className="py-24 bg-white border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6A24] font-medium block">
            Studio Matchmaker
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
            Build Your Ensemble
          </h2>
          <p className="text-sm text-[#78716C] font-light leading-relaxed">
            Select a shirt and trouser to preview color harmony, cloth weights, and proportions together.
          </p>
        </div>

        {/* Clean Matchmaker Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center bg-[#FAF8F5] p-6 sm:p-10 rounded-sm border border-stone-200/80">
          {/* Left: Combined Ensemble Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm bg-white p-4 rounded-sm border border-stone-200 shadow-sm space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {/* Shirt Preview */}
                <div className="space-y-2">
                  <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-stone-100 border border-stone-200">
                    <Image
                      src={currentShirt.image}
                      alt={currentShirt.name}
                      fill
                      className="object-cover object-top"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-white/95 px-2 py-0.5 text-[9px] uppercase font-semibold text-[#1C1917]">
                      Shirt
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xs font-semibold text-[#1C1917] line-clamp-1">
                      {currentShirt.name}
                    </h4>
                    <p className="text-[11px] text-[#8C6A24] font-medium">
                      {formatPrice(currentShirt.priceUSD, currentShirt.priceINR)}
                    </p>
                  </div>
                </div>

                {/* Trouser Preview */}
                <div className="space-y-2">
                  <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-stone-100 border border-stone-200">
                    <Image
                      src={currentTrouser.image}
                      alt={currentTrouser.name}
                      fill
                      className="object-cover object-top"
                    />
                    <span className="absolute bottom-1.5 left-1.5 bg-white/95 px-2 py-0.5 text-[9px] uppercase font-semibold text-[#1C1917]">
                      Trouser
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-xs font-semibold text-[#1C1917] line-clamp-1">
                      {currentTrouser.name}
                    </h4>
                    <p className="text-[11px] text-[#8C6A24] font-medium">
                      {formatPrice(currentTrouser.priceUSD, currentTrouser.priceINR)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-3 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#78716C]">Total Ensemble:</span>
                  <span className="font-serif-luxury text-lg font-bold text-[#1C1917]">
                    {formatPrice(totalUSD, totalINR)}
                  </span>
                </div>

                <button
                  onClick={handleAddPair}
                  className="w-full py-3.5 bg-[#1C1917] hover:bg-[#B88E3E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-sm flex items-center justify-center gap-2"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#E9D9AA]" />
                      <span>Added Both to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add Pair to Bag</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Clean Swatch Selectors */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Choose Shirt */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1917]">
                  1. Choose Shirt
                </span>
                <span className="text-xs text-[#78716C] font-light">{currentShirt.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {shirts.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedShirtIdx(idx)}
                    className={`p-2.5 text-left border rounded-sm transition-all ${
                      selectedShirtIdx === idx
                        ? 'border-[#1C1917] bg-white shadow-sm ring-1 ring-[#1C1917]'
                        : 'border-stone-200 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="relative aspect-square w-full rounded-sm overflow-hidden mb-2 bg-stone-100">
                      <Image src={s.image} alt={s.name} fill className="object-cover object-top" />
                    </div>
                    <div className="font-serif-luxury text-xs font-semibold text-[#1C1917] line-clamp-1">
                      {s.name.split(' ')[0]} {s.name.split(' ')[1]}
                    </div>
                    <div className="text-[11px] text-[#78716C]">{formatPrice(s.priceUSD, s.priceINR)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Trouser */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1917]">
                  2. Choose Trouser
                </span>
                <span className="text-xs text-[#78716C] font-light">{currentTrouser.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {trousers.map((t, idx) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTrouserIdx(idx)}
                    className={`p-2.5 text-left border rounded-sm transition-all ${
                      selectedTrouserIdx === idx
                        ? 'border-[#1C1917] bg-white shadow-sm ring-1 ring-[#1C1917]'
                        : 'border-stone-200 bg-white/60 hover:bg-white'
                    }`}
                  >
                    <div className="relative aspect-square w-full rounded-sm overflow-hidden mb-2 bg-stone-100">
                      <Image src={t.image} alt={t.name} fill className="object-cover object-top" />
                    </div>
                    <div className="font-serif-luxury text-xs font-semibold text-[#1C1917] line-clamp-1">
                      {t.name.split(' ')[1] || t.name}
                    </div>
                    <div className="text-[11px] text-[#78716C]">{formatPrice(t.priceUSD, t.priceINR)}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
