'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, Coffee, Scissors, Ruler } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHOWROOM_LOCATIONS } from '../../data/products';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowroomBookingModal({ isOpen, onClose }: BookingModalProps) {
  const [selectedCity, setSelectedCity] = useState(SHOWROOM_LOCATIONS[0].city);
  const [service, setService] = useState('Shirt Collar & Sleeve Length Measurement');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const timeSlots = [
    '10:30 AM', '12:00 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'
  ];

  const services = [
    'Shirt Collar & Sleeve Length Measurement (Custom Neck & Sleeve)',
    'Trouser Inseam & Hem Break Trial (Gurkha & Pleated Trousers)',
    'Complete Shirt + Trouser Pair Trial & Fabric Swatch Consultation',
    'Chino & Linen Pants Fitting (Waist Adjuster Calibration)'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setConfirmed(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#B88E3E', '#8C6A24', '#1C1917', '#FAF8F5']
    });
  };

  const handleReset = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white border border-[#E7E2D8] rounded-sm shadow-2xl overflow-hidden z-10 my-8"
          >
            {/* Header */}
            <div className="bg-[#FAF8F5] p-6 border-b border-[#E7E2D8] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#B88E3E] text-xs uppercase tracking-[0.25em] font-semibold">
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Showroom Fitting Appointment</span>
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#1C1917] mt-1">
                  Book Shirt & Trouser Measurement Trial
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-stone-400 hover:text-[#1C1917] transition-colors rounded-full hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {confirmed ? (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-700 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-2xl text-[#1C1917] mb-2">
                    Trial Appointment Reserved
                  </h4>
                  <p className="text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-[#1C1917]">{name}</span>. Your private collar & inseam measurement session at our <span className="text-[#B88E3E] font-semibold">{selectedCity} Studio</span> has been scheduled.
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-5 border border-[#E7E2D8] text-left max-w-md mx-auto text-xs space-y-2 text-[#1C1917]">
                  <div className="flex justify-between border-b border-stone-200 pb-1.5">
                    <span className="text-stone-500">Service:</span>
                    <span className="font-medium">{service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Time & Date:</span>
                    <span className="font-medium">{time} • {date || 'Next Available Slot'}</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="px-8 py-3 bg-[#1C1917] hover:bg-[#B88E3E] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-sm"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBooking} className="p-6 sm:p-8 space-y-6">
                {/* City */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-2.5">
                    1. Select Atelier Showroom
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {SHOWROOM_LOCATIONS.map((loc) => (
                      <button
                        type="button"
                        key={loc.city}
                        onClick={() => setSelectedCity(loc.city)}
                        className={`p-3 text-left border rounded-sm transition-all ${
                          selectedCity === loc.city
                            ? 'border-[#B88E3E] bg-[#FAF8F5] ring-1 ring-[#B88E3E]'
                            : 'border-[#E7E2D8] bg-white hover:border-stone-400'
                        }`}
                      >
                        <div className="font-serif-luxury text-sm font-semibold text-[#1C1917]">
                          {loc.city}
                        </div>
                        <div className="text-[10px] text-[#78716C] mt-0.5">{loc.district}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-2">
                    2. Fitting & Tailoring Requirement
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full text-xs p-3 border border-[#E7E2D8] bg-white text-[#1C1917] rounded-sm focus:outline-none focus:border-[#B88E3E]"
                  >
                    {services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#B88E3E]" />
                      <span>Preferred Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs p-3 border border-[#E7E2D8] bg-white text-[#1C1917] rounded-sm focus:outline-none focus:border-[#B88E3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.18em] font-semibold text-[#1C1917] mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#B88E3E]" />
                      <span>Time Slot</span>
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {timeSlots.map((slot) => (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setTime(slot)}
                          className={`py-2 text-[11px] font-medium border rounded-sm transition-colors ${
                            time === slot
                              ? 'bg-[#1C1917] text-white border-[#1C1917]'
                              : 'border-[#E7E2D8] hover:bg-stone-50 text-[#1C1917]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#78716C] mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-[#B88E3E]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aditya Singhania"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs p-2.5 border border-[#E7E2D8] rounded-sm focus:outline-none focus:border-[#B88E3E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#78716C] mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-[#B88E3E]" />
                      <span>Phone / WhatsApp (+91)</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 12345"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 border border-[#E7E2D8] rounded-sm focus:outline-none focus:border-[#B88E3E]"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#B88E3E] hover:bg-[#8C6A24] text-white font-semibold text-xs uppercase tracking-[0.25em] transition-colors rounded-sm shadow-md"
                  >
                    Confirm Shirt & Trouser Measurement Session
                  </button>
                  <p className="text-[10px] text-center text-[#78716C] mt-2">
                    Complimentary precision fitting & styling review • No purchase commitment
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
