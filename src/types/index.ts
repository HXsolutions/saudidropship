export type Product = {
  id: string;
  name: string;
  price: number;
  currency: "SAR";
  category: string;
  description: string;
  images: string[];
  stock: string;
  sku: string;
};

export type Category = {
  id: string;
  name: string;
};
