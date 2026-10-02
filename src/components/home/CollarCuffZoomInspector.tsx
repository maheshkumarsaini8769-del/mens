'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ZoomIn, Check } from 'lucide-react';

const ZOOM_ITEMS = [
  {
    id: 'semi-spread',
    title: 'The Semi-Spread Collar',
    garment: 'Dress Shirt',
    zoomImg: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1600&q=90',
    specs: [
      '24 stitches per inch (SPI) single-needle lockstitch',
      'Floating micro-canvas interlining avoids bubbling',
      'Solid polished brass engraved collar stays',
      'Hand-turned collar points that never curl'
    ],
    technicalDetail: '24 SPI Single-Needle • Floating Canvas',
  },
  {
    id: 'button-down',
    title: 'The Unlined S-Roll Collar',
    garment: 'Oxford Shirt',
    zoomImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1600&q=90',
    specs: [
      'Unlined and unfused for natural gentle roll',
      'Genuine Trocas shell buttons with crow-foot stitching',
      'Center back box pleat for shoulder mobility',
      '2-ply pinpoint combed cotton basketweave'
    ],
    technicalDetail: 'Natural S-Curve Roll • Unfused Soft Construction',
  },
  {
    id: 'gurkha-hardware',
    title: 'Gurkha Solid Brass Buckles',
    garment: 'Tailored Trouser',
    zoomImg: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1600&q=90',
    specs: [
      'Hand-cast antique solid brass prong side buckles',
      'Deep forward inward-facing pleats for drape',
      'Extended 4.5cm cummerbund waistband with shirt-grip',
      'Fish-tail back split for ergonomic comfort'
    ],
    technicalDetail: 'Solid Brass Buckles • Double Forward Pleats',
  },
  {
    id: 'neapolitan-tab',
    title: 'Neapolitan Extended Tab',
    garment: 'Dress Pant',
    zoomImg: 'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=1600&q=90',
    specs: [
      '6cm extended tab creates clean abdominal line',
      'Concealed French metal hook-and-eye closure',
      'Fluid reverse pleat aligning into razor-sharp crease',
      'Blind interior hem with 5cm turn-up cuff allowance'
    ],
    technicalDetail: 'Extended French Tab • Concealed Hook & Eye',
  },
];

export default function CollarCuffZoomInspector() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [zoomFactor, setZoomFactor] = useState(2.5);

  const containerRef = useRef<HTMLDivElement>(null);
  const current = ZOOM_ITEMS[selectedIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <section id="collar-zoom" className="py-24 bg-[#FAF8F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C6A24] font-medium block">
            Macro Inspection
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-light text-[#1C1917] tracking-tight">
            Collar & Pleat Precision
          </h2>
          <p className="text-sm text-[#78716C] font-light leading-relaxed">
            Move your cursor across each swatch to inspect single-needle seam density and solid brass hardware under our digital 2.5x loupe.
          </p>
        </div>

        {/* Clean Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {ZOOM_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIdx(idx);
                setIsHovered(false);
              }}
              className={`p-4 text-left border rounded-sm transition-all ${
                selectedIdx === idx
                  ? 'border-[#1C1917] bg-white shadow-sm ring-1 ring-[#1C1917]'
                  : 'border-stone-200 bg-white/70 hover:bg-white text-[#78716C]'
              }`}
            >
              <span className="text-[9px] uppercase tracking-widest text-[#8C6A24] font-semibold block mb-1">
                {item.garment}
              </span>
              <h4 className="font-serif-luxury text-xs sm:text-sm font-semibold text-[#1C1917] line-clamp-1">
                {item.title}
              </h4>
            </button>
          ))}
        </div>

        {/* Loupe Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Loupe Canvas */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative aspect-[4/3] w-full bg-white rounded-sm overflow-hidden border border-stone-200 shadow-md cursor-crosshair select-none"
            >
              <Image
                src={current.zoomImg}
                alt={current.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 650px"
              />

              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-sm border border-stone-200 text-[11px] font-medium text-[#1C1917] flex items-center gap-1.5 shadow-xs">
                <ZoomIn className="w-3.5 h-3.5 text-[#8C6A24]" />
                <span>Move cursor to inspect stitching</span>
              </div>

              {/* Magnifying Loupe */}
              {isHovered && (
                <div
                  style={{
                    left: `${mousePos.x}%`,
                    top: `${mousePos.y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundImage: `url(${current.zoomImg})`,
                    backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
                    backgroundSize: `${zoomFactor * 100}%`,
                  }}
                  className="absolute w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-[#1C1917] shadow-2xl pointer-events-none z-30 overflow-hidden bg-white"
                >
                  <div className="absolute inset-0 flex items-center justify-center opacity-25">
                    <div className="w-full h-[1px] bg-[#1C1917]" />
                    <div className="h-full w-[1px] bg-[#1C1917]" />
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full">
                    {zoomFactor}x Zoom
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Technical Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C6A24] font-semibold block mb-1">
                Atelier Benchmark
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-[#1C1917]">
                {current.title}
              </h3>
              <p className="text-xs text-[#78716C] font-light mt-1">{current.technicalDetail}</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.16em] font-semibold text-[#1C1917] block">
                Craftsmanship Details
              </span>
              <ul className="space-y-2.5 text-xs text-[#78716C] font-light">
                {current.specs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <Check className="w-3.5 h-3.5 text-[#8C6A24] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
