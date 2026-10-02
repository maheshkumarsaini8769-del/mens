'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

interface CraftsmanshipProps {
  onOpenBooking?: () => void;
}

const STEPS = [
  {
    step: '01',
    title: 'Anatomical Neck & Inseam Balance',
    tagline: 'Quarter-inch collar increments and rise profiling',
    description: 'We measure neck circumference, shoulder slope, and chest drop to calibrate the split-yoke. Trousers are balanced to achieve the exact break desired over footwear.',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85',
    detail: 'Quarter-Inch Neck Sizes • Balanced Split Yoke • Custom Outseam',
  },
  {
    step: '02',
    title: 'Single-Needle 24-SPI Seams',
    tagline: 'Micro-stitches that lie completely flat against the skin',
    description: 'Our shirtmakers sew with single-needle machines at 24 stitches per inch. Side seams are reinforced with pentagonal hand-stitched fabric gussets for enduring durability.',
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=85',
    detail: '24 Stitches Per Inch • Hand-Turned Collar • Reinforced Gussets',
  },
  {
    step: '03',
    title: 'Gurkha Waistband Architecture',
    tagline: 'Beltless comfort with hand-cast solid brass hardware',
    description: 'The waistband is cut on an ergonomic curve with an internal rubberized grip curtain that keeps your shirt tucked. Inward forward pleats create ease while seated.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=85',
    detail: 'Internal Shirt Grip Curtain • Solid Brass Buckles • Forward Pleats',
  },
  {
    step: '04',
    title: 'Mother-of-Pearl & Blind Hems',
    tagline: 'Wrapped thread shanks and tailored turn-up cuffs',
    description: 'Australian mother-of-pearl buttons are attached with a three-point crow-foot stitch (zampa di gallina) and wrapped with thread shanks for effortless buttoning.',
    image: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1200&q=85',
    detail: 'Crow-Foot Zampa Stitch • Wrapped Shanks • 5cm Blind Hem Cuffs',
  },
];

export default function ShirtTailoringProcess({ onOpenBooking }: CraftsmanshipProps) {
  const [activeStep, setActiveStep] = useState(0);
  const current = STEPS[activeStep];

  return (
    <section id="craftsmanship" className="py-24 bg-[#FAF8F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6A24] font-medium block">
            Savoir-Faire
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
            The Craft of Pure Essentials
          </h2>
          <p className="text-sm text-[#78716C] font-light leading-relaxed">
            Without jackets to hide beneath, a shirt and trouser must be mathematically flawless in seam balance, collar stance, and drape.
          </p>
        </div>

        {/* Clean Step Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-5 text-left border rounded-sm transition-all ${
                activeStep === idx
                  ? 'border-[#1C1917] bg-white shadow-sm ring-1 ring-[#1C1917]'
                  : 'border-stone-200 bg-white/60 hover:bg-white text-[#78716C]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif-luxury text-lg font-normal text-[#8C6A24]">
                  {s.step}
                </span>
                {activeStep === idx && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1C1917]" />
                )}
              </div>
              <h4 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#1C1917] line-clamp-1">
                {s.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Clean Active Stage Details */}
        <div className="bg-white border border-stone-200/80 rounded-sm p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#8C6A24]">
                  Phase {activeStep + 1} of 4
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1C1917]">
                  {current.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#8C6A24] font-medium italic">
                "{current.tagline}"
              </p>

              <p className="text-sm text-[#78716C] font-light leading-relaxed">
                {current.description}
              </p>

              <div className="p-3 bg-[#FAF8F5] border border-stone-200 rounded-sm text-xs font-medium text-[#1C1917] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8C6A24]" />
                <span>{current.detail}</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 bg-[#1C1917] hover:bg-[#B88E3E] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-sm flex items-center gap-2"
                >
                  <span>Book Measurement Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden border border-stone-200 bg-stone-100 group">
                <Image
                  src={current.image}
                  alt={current.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
