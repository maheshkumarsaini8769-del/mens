export type GarmentType = 'shirt' | 'trouser';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  garmentType: GarmentType;
  category: 'formal-shirts' | 'linen-shirts' | 'casual-shirts' | 'gurkha-trousers' | 'dress-trousers' | 'sartorial-chinos';
  categoryLabel: string;
  priceUSD: number;
  priceINR: number;
  image: string;
  hoverImage: string;
  detailImages: string[];
  fabric: string;
  fabricOrigin: string;
  gsmWeight: string;
  weave: string;
  fit: string;
  // Shirt specific details
  collarType?: string;
  cuffType?: string;
  buttonType?: string;
  // Trouser specific details
  waistband?: string;
  pleats?: string;
  rise?: string;
  hemFinish?: string;
  // Common
  description: string;
  highlightSpecs: string[];
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface ShowroomZone {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  atmosphere: string;
  curatedPiece: string;
  hotspots: {
    title: string;
    description: string;
    x: number;
    y: number;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  collarOrWaist?: string;
  fit?: string;
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR';
