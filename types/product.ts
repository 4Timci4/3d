export type StockStatus = "Stokta" | "Sipariş üzerine üretilir" | "Tükendi";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  category: string;
  material: "PLA" | "PETG";
  colors: string[];
  dimensions: string;
  sizes?: string[];
  weight: string;
  productionTime: string;
  layerHeight: string;
  customizable: boolean;
  stockStatus: StockStatus;
  featured: boolean;
  images: string[];
  care: string;
  boxContents: string;
};
