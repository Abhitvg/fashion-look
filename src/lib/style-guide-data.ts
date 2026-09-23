export type StyleCategory = 'suits' | 'shirts' | 'details' | 'outerwear';

export interface StyleItem {
  id: string;
  category: StyleCategory;
  title: string;
  description: string;
  image: string;
}

export const styleGuideData: StyleItem[] = [
  // SUITS
  {
    id: "suit-2-piece",
    category: "suits",
    title: "The Two-Piece Suit",
    description: "The quintessential foundation of any gentleman's wardrobe. Comprising a jacket and trousers cut from the same cloth, the two-piece suit offers versatility ranging from business professional to evening elegance.",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "suit-3-piece",
    category: "suits",
    title: "The Three-Piece Suit",
    description: "Adding a matching waistcoat elevates the formality and adds a layer of depth and sophistication. The three-piece suit is a sartorial statement that commands respect and attention.",
    image: "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "suit-tuxedo",
    category: "suits",
    title: "The Tuxedo (Dinner Suit)",
    description: "Reserved for the most formal of occasions. Distinguished by satin or grosgrain facings on the lapels and buttons, the bespoke tuxedo is the pinnacle of evening elegance.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
  },

  // SHIRTS
  {
    id: "shirt-dress",
    category: "shirts",
    title: "The Dress Shirt",
    description: "The canvas upon which the rest of your outfit is built. A bespoke dress shirt perfectly contours the body, eliminating billowing while maintaining complete freedom of movement.",
    image: "https://images.unsplash.com/photo-1620012253295-c1590e048f46?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "shirt-casual",
    category: "shirts",
    title: "The Casual Shirt",
    description: "Tailored with softer collars and relaxed fabrics like linen or Oxford cloth. The bespoke casual shirt bridges the gap between weekend comfort and tailored precision.",
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "shirt-tuxedo",
    category: "shirts",
    title: "The Tuxedo Shirt",
    description: "Designed specifically for black tie. Featuring a pleated or piqué bib, stud front closures, and French cuffs to accommodate your finest cufflinks.",
    image: "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?q=80&w=800&auto=format&fit=crop"
  },

  // DETAILS
  {
    id: "detail-notch-lapel",
    category: "details",
    title: "Notch Lapel",
    description: "The standard on single-breasted suits and blazers. The notch lapel is versatile, understated, and appropriate for virtually any business or casual setting.",
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "detail-peak-lapel",
    category: "details",
    title: "Peak Lapel",
    description: "Characterized by edges pointing upwards towards the shoulders. The peak lapel is more formal and assertive, traditionally found on double-breasted jackets and formalwear.",
    image: "https://images.unsplash.com/photo-1588667504369-0099eb3c7c25?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "detail-roped-shoulder",
    category: "details",
    title: "Roped Shoulder (Spalla Camicia)",
    description: "A pronounced sleevehead that stands slightly above the shoulder line. This provides a structured, powerful silhouette heavily favored in British tailoring.",
    image: "https://images.unsplash.com/photo-1598808503460-70f90e8a8dcc?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "detail-french-cuff",
    category: "details",
    title: "French Cuff (Double Cuff)",
    description: "A formal shirt cuff folded back and fastened with cufflinks. A subtle opportunity to introduce personal flair and luxury hardware to your ensemble.",
    image: "https://images.unsplash.com/photo-1605364177579-da232c44ed95?q=80&w=800&auto=format&fit=crop"
  },

  // OUTERWEAR
  {
    id: "outerwear-single-overcoat",
    category: "outerwear",
    title: "Single-Breasted Overcoat",
    description: "The most versatile winter layer. Cut beautifully to drape over a suit or worn casually over knitwear, providing warmth without sacrificing a sharp silhouette.",
    image: "https://www.fitcoat.com/wp-content/uploads/1/Single-Breasted-Overcoat.jpg"
  },
  {
    id: "outerwear-double-overcoat",
    category: "outerwear",
    title: "Double-Breasted Overcoat",
    description: "The pinnacle of formal winter wear. A double-breasted overcoat features sweeping lapels and a wrap-around closure that exudes authority and commanding style.",
    image: "https://www.fitcoat.com/wp-content/uploads/1/Double-Breasted-Overcoat.jpg"
  },
  {
    id: "outerwear-peacoat",
    category: "outerwear",
    title: "The Peacoat",
    description: "A shorter, double-breasted coat originally worn by sailors. Featuring broad lapels and a dense wool composition, it is the ultimate smart-casual outerwear piece.",
    image: "https://www.fitcoat.com/wp-content/uploads/1/Peacoat-Men.jpg"
  }
];
