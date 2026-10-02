'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-showroom-gold via-[#D4AF37] to-showroom-gold-dark z-50 origin-left shadow-[0_0_8px_rgba(184,142,62,0.6)]"
      style={{ scaleX }}
    />
  );
}
