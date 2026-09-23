export type ProductCategory = 'accessories' | 'ties' | 'pocket-squares' | 'leather';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  images: string[];
  inStock: boolean;
  features: string[];
}

export const shopData: Product[] = [
  {
    id: "silk-grenadine-tie-navy",
    name: "Navy Silk Grenadine Tie",
    description: "Woven in Como, Italy, this classic navy grenadine tie provides a rich, textured finish that elevates both business suits and casual blazers. The untipped construction gives it a lightweight, effortless drape.",
    price: 8500,
    currency: "INR",
    category: "ties",
    images: [
      "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624314138459-cb123e49e29a?q=80&w=800&auto=format&fit=crop"
    ],
    inStock: true,
    features: ["100% Silk Grenadine", "Woven in Italy", "Hand-rolled edges", "Untipped construction", "Width: 8cm"]
  },
  {
    id: "linen-pocket-square-white",
    name: "White Irish Linen Pocket Square",
    description: "The essential pocket square. Crisp white Irish linen with hand-rolled contrasting edges. The perfect finishing touch to any bespoke jacket.",
    price: 3500,
    currency: "INR",
    category: "pocket-squares",
    images: [
      "https://images.unsplash.com/photo-1605364177579-da232c44ed95?q=80&w=800&auto=format&fit=crop"
    ],
    inStock: true,
    features: ["100% Irish Linen", "Hand-rolled edges", "32cm x 32cm", "Made in Italy"]
  },
  {
    id: "silk-knit-tie-burgundy",
    name: "Burgundy Silk Knit Tie",
    description: "A versatile knitted silk tie that adds a touch of mid-century flair to your wardrobe. Features a classic flat bottom and a satisfyingly crunchy texture.",
    price: 7000,
    currency: "INR",
    category: "ties",
    images: [
      "https://images.unsplash.com/photo-1588667504369-0099eb3c7c25?q=80&w=800&auto=format&fit=crop"
    ],
    inStock: true,
    features: ["100% Knitted Silk", "Flat bottom", "Unlined", "Width: 6cm"]
  },
  {
    id: "leather-belt-brown",
    name: "Full Grain Leather Belt",
    description: "A classic dress belt crafted from premium Italian full-grain leather. Finished with a solid brass buckle. Designed to age beautifully and develop a unique patina.",
    price: 12000,
    currency: "INR",
    category: "leather",
    images: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop"
    ],
    inStock: true,
    features: ["Italian Full-Grain Leather", "Solid Brass Buckle", "Width: 3cm", "Hand-painted edges"]
  },
  {
    id: "silk-pocket-square-paisley",
    name: "Paisley Silk Pocket Square",
    description: "A rich, jewel-toned paisley pocket square printed on lightweight silk twill. Adds a pop of color and visual interest to a classic navy or grey suit.",
    price: 4500,
    currency: "INR",
    category: "pocket-squares",
    images: [
      "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop"
    ],
    inStock: true,
    features: ["100% Silk Twill", "Hand-rolled edges", "40cm x 40cm", "Printed in Como, Italy"]
  },
  {
    id: "silver-cufflinks-knot",
    name: "Sterling Silver Knot Cufflinks",
    description: "Classic monkey knot cufflinks crafted from solid sterling silver. An understated and elegant choice for French cuff shirts.",
    price: 18000,
    currency: "INR",
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1620012253295-c1590e048f46?q=80&w=800&auto=format&fit=crop"
    ],
    inStock: false,
    features: ["Solid 925 Sterling Silver", "Classic Knot Design", "T-bar fastening", "Includes presentation box"]
  }
];

export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  return new Promise(resolve => setTimeout(() => resolve(shopData), 100));
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find(p => p.id === id);
}
