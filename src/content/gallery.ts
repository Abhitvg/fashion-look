export interface GalleryImage {
  id: string;
  url: string;
  category: "Tailoring" | "Suits" | "Sherwanis" | "Fabrics" | "Atelier" | "Details" | "Packaging" | "Wedding";
  caption?: string;
  height?: number; // Optional hint for masonry rendering
}

export const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    url: "/images/atelier/premium-atelier.jpg",
    category: "Atelier",
    caption: "The Real Atelier - Navi Mumbai",
    height: 800,
  },
  {
    id: "g2",
    url: "/images/suits/suit-formal.jpg",
    category: "Suits",
    caption: "Classic Navy Two-Piece",
    height: 900,
  },
  {
    id: "g3",
    url: "/images/sherwani/sherwani.jpg",
    category: "Sherwanis",
    caption: "Bespoke Ivory Sherwani",
    height: 700,
  },
  {
    id: "g4",
    url: "/images/tailoring/safari.jpg",
    category: "Tailoring",
    caption: "Crafting the Safari Suit",
    height: 600,
  },
  {
    id: "g5",
    url: "/images/wedding/pathani.jpg",
    category: "Wedding", // Fallback to tailoring if strictly constrained
    caption: "Traditional Pathani Suit",
    height: 850,
  } as GalleryImage,
  {
    id: "g6",
    url: "/images/gift-boxes/gift-box.jpg",
    category: "Packaging",
    caption: "The Art of Giving Gift Box",
    height: 750,
  },
];
