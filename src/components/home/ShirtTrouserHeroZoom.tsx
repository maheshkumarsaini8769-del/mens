'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Calendar, ZoomIn, Sparkles, Check, SlidersHorizontal, Eye } from 'lucide-react';

interface HeroProps {
  onOpenBooking?: () => void;
}

interface SignatureLook {
  id: string;
  tag: string;
  title: string;
  shirtName: string;
  trouserName: string;
  price: string;
  image: string;
  macroImage: string;
  mill: string;
  specs: {
    collar: string;
    seam: string;
    waist: string;
  };
  hotspots: {
    id: string;
    x: number;
    y: number;
    label: string;
    sublabel: string;
    target: { scale: number; originX: number; originY: number };
  }[];
}

const SIGNATURE_LOOKS: SignatureLook[] = [
  {
    id: 'look-1',
    tag: 'Look 01 / The Executive Standalone',
    title: 'Giza 87 Royal Twill & Gurkha Flannel',
    shirtName: 'Albini Giza 87 Egyptian Royal Twill Shirt',
    trouserName: 'Heavy Cavalry Twill Double-Pleated Gurkha Trouser',
    price: '₹43,000',
    image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&w=1200&q=85',
    macroImage: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1600&q=90',
    mill: 'Albini Mill (Bergamo) & Brisbane Moss (Lancashire)',
    specs: {
      collar: 'Semi-Spread with Brass Stays',
      seam: '24 Stitches Per Inch (Single-Needle)',
      waist: 'Dual Antique Brass Side Buckles',
    },
    hotspots: [
      {
        id: 'collar',
        x: 48,
        y: 19,
        label: 'Architectural Semi-Spread Collar',
        sublabel: 'Floating canvas interlining with 24 SPI single-needle seams that never curl.',
        target: { scale: 2.3, originX: 0.48, originY: 0.19 },
      },
      {
        id: 'placket',
        x: 50,
        y: 40,
        label: '4mm Australian Mother-of-Pearl',
        sublabel: 'Trocas shell buttons secured with hand-sewn crow-foot (zampa di gallina) stitching.',
        target: { scale: 2.5, originX: 0.5, originY: 0.4 },
      },
      {
        id: 'trouser-waist',
        x: 47,
        y: 70,
        label: 'Gurkha Double Inward Pleats',
        sublabel: 'High-rise wrap cummerbund waistband with hand-cast solid brass buckle adjusters.',
        target: { scale: 2.2, originX: 0.47, originY: 0.7 },
      },
    ],
  },
  {
    id: 'look-2',
    tag: 'Look 02 / The Sartorial Gentleman',
    title: 'Pinpoint Oxford & Neapolitan Wool',
    shirtName: 'Heritage Heavyweight 2-Ply Supima OCBD',
    trouserName: 'Super 130s Extended-Tab Pleated Trouser',
    price: '₹41,300',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1200&q=85',
    macroImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=90',
    mill: 'Thomas Mason Mill, UK & Vitale Barberis Canonico, Italy',
    specs: {
      collar: '3.5" Unlined S-Roll Button-Down',
      seam: 'Dual-Ply Pinpoint Basketweave',
      waist: 'Concealed French Hook-and-Eye',
    },
    hotspots: [
      {
        id: 'roll-collar',
        x: 50,
        y: 20,
        label: 'The Legendary Soft S-Roll Collar',
        sublabel: 'Unfused soft interlining for an authentic Neapolitan gentle drape.',
        target: { scale: 2.3, originX: 0.5, originY: 0.2 },
      },
      {
        id: 'oxford-weave',
        x: 50,
        y: 48,
        label: '2-Ply Combed Supima Cotton',
        sublabel: '165 GSM durable basketweave offering peerless breathability and resilience.',
        target: { scale: 2.5, originX: 0.5, originY: 0.48 },
      },
      {
        id: 'cuff-finish',
        x: 74,
        y: 76,
        label: 'Mitered Barrel Cuff with Gauntlet',
        sublabel: 'Beveled angle cuff with hand-attached gauntlet button for clean arm break.',
        target: { scale: 2.2, originX: 0.74, originY: 0.76 },
      },
    ],
  },
  {
    id: 'look-3',
    tag: 'Look 03 / The Riviera Leisure',
    title: 'Amalfi Pure Linen & Belgian Trousers',
    shirtName: 'Amalfi Garment-Washed Pure Italian Linen Shirt',
    trouserName: 'Belgian Flax Relaxed Drawstring Trouser',
    price: '₹37,000',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=85',
    macroImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1600&q=90',
    mill: 'Solbiati Mill, Italy (100% Normandy Flax)',
    specs: {
      collar: 'Seamless One-Piece Camp Collar',
      seam: 'Enzyme-Washed Porous Flax',
      waist: 'Elasticated Internal Drawstring',
    },
    hotspots: [
      {
        id: 'camp-collar',
        x: 50,
        y: 22,
        label: 'One-Piece Convertible Camp Collar',
        sublabel: 'Continuous cut pattern piece designed to lie flat and open naturally.',
        target: { scale: 2.2, originX: 0.5, originY: 0.22 },
      },
      {
        id: 'flax-texture',
        x: 48,
        y: 50,
        label: 'Normandy Flax Fiber Matrix',
        sublabel: 'Pre-washed with aloe vera enzymes for broken-in softness from day one.',
        target: { scale: 2.4, originX: 0.48, originY: 0.5 },
      },
      {
        id: 'linen-waist',
        x: 52,
        y: 75,
        label: 'Tailored Drawstring Waistband',
        sublabel: 'Concealed internal drawstring paired with belt loops and 5cm turn-up hem.',
        target: { scale: 2.2, originX: 0.52, originY: 0.75 },
      },
    ],
  },
];

export default function ShirtTrouserHeroZoom({ onOpenBooking }: HeroProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [zoomScale, setZoomScale] = useState<1 | 1.8 | 2.6>(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 0.5, y: 0.5 });
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.85]);

  const current = SIGNATURE_LOOKS[selectedIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  const handleHotspotClick = (h: (typeof current.hotspots)[0]) => {
    if (activeHotspotId === h.id && zoomScale !== 1) {
      setZoomScale(1);
      setActiveHotspotId(null);
      setZoomOrigin({ x: 0.5, y: 0.5 });
    } else {
      setActiveHotspotId(h.id);
      setZoomScale(h.target.scale as any);
      setZoomOrigin({ x: h.target.originX, y: h.target.originY });
    }
  };

  const handleSetZoom = (scale: 1 | 1.8 | 2.6) => {
    setZoomScale(scale);
    if (scale === 1) {
      setActiveHotspotId(null);
      setZoomOrigin({ x: 0.5, y: 0.5 });
    } else if (scale === 1.8) {
      setZoomOrigin({ x: 0.5, y: 0.28 });
    } else {
      setZoomOrigin({ x: 0.5, y: 0.42 });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex items-center justify-center bg-[#FAF8F5] overflow-hidden pt-4 pb-16 border-b border-stone-200/60"
    >
      {/* Subtle Luxury Architectural Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1C191708_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full relative z-10">
        
        {/* Top Editorial Hallmark Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-stone-200/70 pb-4 mb-10 text-[11px] uppercase tracking-[0.24em] text-stone-500 font-light">
          <div className="flex items-center gap-2 text-[#8C6A24] font-normal">
            <span>✦ ATELIER INDIA</span>
            <span className="text-stone-300">•</span>
            <span>MUMBAI • NEW DELHI • BENGALURU • HYDERABAD</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-500">
            <span>COMPLIMENTARY PAN-INDIA BESPOKE FITTING</span>
            <span>•</span>
            <span>24 SPI SINGLE-NEEDLE</span>
            <span>•</span>
            <span>EST. 2026</span>
          </div>
        </div>

        {/* Main Grand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Pure Luxury Headline & Interactive Look Selection */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Tagline & Headline */}
            <div className="space-y-4">
              <span className="inline-block text-[11px] uppercase tracking-[0.25em] font-medium text-[#8C6A24]">
                The Art of Standing Alone
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-[64px] font-light text-stone-900 tracking-tight leading-[1.08]">
                Master Shirts. <br />
                <span className="italic font-normal text-[#8C6A24]">Tailored Trousers.</span>
              </h1>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed max-w-lg pt-1">
                Engineered with 24-SPI Egyptian Giza cotton, hand-rolled architectural collars, and knife-creased pleated Gurkha trousers. Designed to command respect without a jacket.
              </p>
            </div>

            {/* Signature Ensemble Look Switcher */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] uppercase tracking-[0.22em] text-stone-500 font-medium">
                  Select Curated Silhouette:
                </span>
                <span className="text-stone-400 text-[11px] font-serif-luxury italic">
                  {current.mill}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {SIGNATURE_LOOKS.map((look, idx) => (
                  <button
                    key={look.id}
                    onClick={() => {
                      setSelectedIdx(idx);
                      setZoomScale(1);
                      setActiveHotspotId(null);
                      setZoomOrigin({ x: 0.5, y: 0.5 });
                    }}
                    className={`p-3 text-left transition-all duration-200 border rounded-none relative ${
                      selectedIdx === idx
                        ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900'
                        : 'border-stone-200 bg-white/50 hover:bg-white text-stone-600'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wider text-[#8C6A24] block mb-0.5 font-medium">
                      0{idx + 1} / Look
                    </span>
                    <h4 className="font-serif-luxury text-xs font-medium text-stone-900 line-clamp-1">
                      {look.title.split('&')[0]}
                    </h4>
                    <span className="text-[10px] text-stone-500 font-light block mt-0.5">
                      {look.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#collection-grid"
                className="px-8 py-4 bg-stone-900 hover:bg-[#8C6A24] text-white text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 rounded-none shadow-sm flex items-center gap-2 group"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenBooking}
                className="px-7 py-4 bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 hover:border-stone-900 text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 rounded-none flex items-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-[#8C6A24]" />
                <span>Book Fitting Trial</span>
              </button>
            </div>

            {/* Micro Benchmarks Bar */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-6 text-xs text-stone-600">
              <div>
                <span className="font-serif-luxury text-xl font-normal text-stone-900 block">24 SPI</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Lockstitch Seams</span>
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-normal text-stone-900 block">200/2</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Egyptian Giza Yarn</span>
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-normal text-stone-900 block">Solid Brass</span>
                <span className="text-[10px] uppercase tracking-wider text-stone-500">Gurkha Hardware</span>
              </div>
            </div>
          </div>

          {/* Right Column: Grand Editorial Visual Canvas with Seamless Zoom */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none bg-white p-3.5 sm:p-5 rounded-none border border-stone-200/90 shadow-[0_15px_40px_rgba(0,0,0,0.06)]">
              
              {/* Top Viewport Header with Integrated Floating Zoom Pill */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-200/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C6A24] animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-stone-800">
                    Interactive Macro Stage
                  </span>
                </div>

                {/* Seamless Zoom Scale Selector */}
                <div className="flex items-center gap-1 bg-stone-100 p-0.5 border border-stone-200">
                  <button
                    onClick={() => handleSetZoom(1)}
                    className={`px-3 py-1 text-[10px] uppercase tracking-widest font-medium transition-all ${
                      zoomScale === 1
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    1.0x Full
                  </button>
                  <button
                    onClick={() => handleSetZoom(1.8)}
                    className={`px-3 py-1 text-[10px] uppercase tracking-widest font-medium transition-all ${
                      zoomScale === 1.8
                        ? 'bg-white text-stone-900 shadow-xs font-semibold'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    1.8x Collar
                  </button>
                  <button
                    onClick={() => handleSetZoom(2.6)}
                    className={`px-3 py-1 text-[10px] uppercase tracking-widest font-medium transition-all ${
                      zoomScale === 2.6
                        ? 'bg-white text-[#8C6A24] shadow-xs font-semibold'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    2.6x Weave
                  </button>
                </div>
              </div>

              {/* Main Stage Canvas with Mouse Tracking & Scroll Zoom */}
              <div
                ref={stageRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 cursor-crosshair select-none"
              >
                {/* Scroll Parallax & Dynamic Zoom Transform */}
                <motion.div style={{ scale: scrollScale, opacity: heroOpacity }} className="w-full h-full relative">
                  <motion.div
                    animate={{
                      scale: zoomScale,
                      originX: zoomOrigin.x,
                      originY: zoomOrigin.y,
                    }}
                    transition={{ type: 'spring', stiffness: 240, damping: 30 }}
                    className="w-full h-full relative"
                  >
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </motion.div>
                </motion.div>

                {/* Subtle Interactive Hotspots (Visible on 1.0x & 1.8x) */}
                {zoomScale < 2.5 &&
                  current.hotspots.map((h) => (
                    <div
                      key={h.id}
                      style={{ left: `${h.x}%`, top: `${h.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={() => handleHotspotClick(h)}
                        className="group relative flex items-center justify-center p-2 focus:outline-none"
                        aria-label={h.label}
                      >
                        {/* Pulse Ring */}
                        <span className="absolute w-6 h-6 rounded-full bg-[#8C6A24]/35 animate-ping" />
                        
                        {/* Dot */}
                        <span
                          className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shadow-md transition-all duration-300 ${
                            activeHotspotId === h.id
                              ? 'bg-[#8C6A24] border-white scale-125'
                              : 'bg-white border-[#8C6A24] group-hover:scale-125'
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${
                              activeHotspotId === h.id ? 'bg-white' : 'bg-[#8C6A24]'
                            }`}
                          />
                        </span>

                        {/* Tooltip on Hover */}
                        <span className="absolute left-6 ml-1 whitespace-nowrap bg-stone-900 text-white text-[10px] tracking-wider px-2 py-1 rounded-none opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-30">
                          {h.label} →
                        </span>
                      </button>
                    </div>
                  ))}

                {/* Floating Interactive 2.8x Circular Magnifier Loupe */}
                {isHovered && zoomScale === 1 && (
                  <div
                    style={{
                      left: `${cursorPos.x}%`,
                      top: `${cursorPos.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="pointer-events-none absolute z-30 w-36 h-36 rounded-full border-2 border-[#8C6A24] shadow-[0_12px_36px_rgba(0,0,0,0.35)] overflow-hidden hidden sm:block bg-white"
                  >
                    <div
                      style={{
                        position: 'absolute',
                        width: '380px',
                        height: '520px',
                        left: `${-cursorPos.x * 2.8 + 72}px`,
                        top: `${-cursorPos.y * 3.8 + 72}px`,
                      }}
                    >
                      <Image
                        src={current.macroImage}
                        alt="Macro Fabric"
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Reticle Crosshair */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-[1px] bg-[#8C6A24]/40" />
                      <div className="h-full w-[1px] bg-[#8C6A24]/40 absolute" />
                      <div className="w-3.5 h-3.5 rounded-full border border-[#8C6A24]/60 absolute" />
                    </div>

                    {/* Loupe Badge */}
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-stone-900/90 text-white text-[7px] uppercase tracking-widest px-1.5 py-0.5 rounded-none whitespace-nowrap">
                      2.8x Lens
                    </div>
                  </div>
                )}

                {/* Bottom Garment Banner */}
                <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md px-4 py-2.5 border border-stone-200/90 shadow-sm flex items-center justify-between z-10">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-stone-900 block">
                      {current.shirtName}
                    </span>
                    <span className="text-[10px] text-stone-500 font-light block">
                      & {current.trouserName}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif-luxury text-sm font-semibold text-[#8C6A24] block">
                      {current.price}
                    </span>
                    <span className="text-[9px] text-stone-400 block uppercase tracking-wider">
                      Ready & MTM
                    </span>
                  </div>
                </div>

                {/* Top Hint Badge */}
                <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[9px] uppercase tracking-wider px-2.5 py-1 shadow-sm flex items-center gap-1.5">
                  <ZoomIn className="w-3 h-3 text-[#8C6A24]" />
                  <span>Hover to magnify • Tap pins to zoom</span>
                </div>
              </div>

              {/* Active Hotspot Technical Inspection Drawer */}
              <AnimatePresence>
                {activeHotspotId && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="mt-3 p-3.5 bg-stone-50 border border-stone-200 text-left space-y-1 relative"
                  >
                    {(() => {
                      const spot = current.hotspots.find((h) => h.id === activeHotspotId);
                      if (!spot) return null;
                      return (
                        <>
                          <div className="flex items-center justify-between">
                            <h4 className="font-serif-luxury text-xs font-semibold text-stone-900">
                              {spot.label}
                            </h4>
                            <button
                              onClick={() => {
                                setZoomScale(1);
                                setActiveHotspotId(null);
                                setZoomOrigin({ x: 0.5, y: 0.5 });
                              }}
                              className="text-[10px] text-stone-500 hover:text-stone-900 underline uppercase tracking-wider"
                            >
                              Reset Zoom ✕
                            </button>
                          </div>
                          <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                            {spot.sublabel}
                          </p>
                        </>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
