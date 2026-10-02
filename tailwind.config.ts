import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        showroom: {
          bg: "#FAF8F5",           // Soft Warm Alabaster Canvas
          white: "#FFFFFF",        // Pure Pristine White
          card: "#FFFFFF",         // Crisp Card Background
          cream: "#F4EFE6",        // Light Warm Champagne Sand
          stone: "#EBE6DD",        // Subtle Divider & Border Stone
          gold: "#B88E3E",         // Imperial Muted Gold
          "gold-light": "#E9D9AA", // Delicate Gold Glow
          "gold-dark": "#8C6A24",  // Rich Antique Brass
          charcoal: "#1C1917",     // Deep Tailored Charcoal Text
          espresso: "#2E2824",     // Rich Warm Black
          muted: "#78716C",        // Sophisticated Neutral Gray
          subtle: "#A8A29E",       // Light Neutral
          border: "#E7E2D8",       // Delicate Hairline Border
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Cinzel", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'luxury': '0 10px 40px -15px rgba(28, 25, 23, 0.07)',
        'luxury-hover': '0 25px 50px -12px rgba(184, 142, 62, 0.15)',
        'gold-glow': '0 0 25px rgba(184, 142, 62, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
