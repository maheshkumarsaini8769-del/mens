import type { Metadata } from 'next';
import './globals.css';
import AppShell from '../components/layout/AppShell';

export const metadata: Metadata = {
  title: "CREASE & COLLAR INDIA | Luxury Shirt & Tailored Trouser Atelier",
  description: "Specialized in hand-finished Egyptian cotton shirts and tailored pleated Gurkha trousers across Mumbai, Delhi NCR, Bengaluru & Hyderabad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="lenis">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#FAF8F5] text-[#1C1917] selection:bg-[#B88E3E]/20 selection:text-[#1C1917]">
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
