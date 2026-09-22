export interface LocationData {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  description: string;
  usp: string;
  popularService: string;
}

export const serviceLocations: LocationData[] = [
  {
    slug: 'seawoods',
    name: 'Seawoods',
    lat: 19.0197,
    lng: 73.0100,
    description: 'Our flagship atelier is located in Seawoods West. We offer premium bespoke tailoring, wedding sherwanis, and corporate suits with complimentary home visits across Seawoods.',
    usp: 'Flagship Atelier & VIP Fitting Rooms',
    popularService: 'Wedding Sherwanis & Custom Tuxedos'
  },
  {
    slug: 'darave',
    name: 'Darave',
    lat: 19.0167,
    lng: 73.0167,
    description: 'Experience world-class custom tailoring in Darave. From business suits to traditional Pathani suits, Fashion Look brings master craftsmanship directly to your doorstep.',
    usp: 'Complimentary Home & Office Visits',
    popularService: 'Executive Formal Suits'
  },
  {
    slug: 'belapur',
    name: 'Belapur',
    lat: 19.0182,
    lng: 73.0411,
    description: 'Serving the corporate hub of Belapur (CBD) with premium boardroom power suits and executive safari suits. Book a direct office visit for your entire executive team.',
    usp: 'Corporate & Boardroom Suiting Specialists',
    popularService: 'Two-Piece Business Suits & Safari Suits'
  },
  {
    slug: 'nerul',
    name: 'Nerul',
    lat: 19.0330,
    lng: 73.0297,
    description: 'Fashion Look offers luxury bespoke tailoring in Nerul. Whether you need a royal groom outfit or a classic blazer, our 25 years of expertise ensures a perfect fit.',
    usp: '25+ Years Master Tailoring Experience',
    popularService: 'Groom Sherwanis & Jodhpuri Suits'
  },
  {
    slug: 'juinagar',
    name: 'Juinagar',
    lat: 19.0519,
    lng: 73.0160,
    description: 'Premium custom menswear services now available in Juinagar. Get measured in the comfort of your home for custom shirts, trousers, and three-piece suits.',
    usp: 'Perfect Fit Guarantee with Basted Trials',
    popularService: 'Custom Shirts & Formal Trousers'
  },
  {
    slug: 'sanpada',
    name: 'Sanpada',
    lat: 19.0628,
    lng: 73.0039,
    description: 'Sanpada\'s choice for luxury bespoke clothing. We source elite fabrics from Raymond, Gwalior, and Vimal to craft garments that command respect.',
    usp: 'Premium Indian & Global Mill Fabrics',
    popularService: 'Luxury Fabric Gifting & Custom Blazers'
  },
  {
    slug: 'kharghar',
    name: 'Kharghar',
    lat: 19.0213,
    lng: 73.0645,
    description: 'Tailoring to Kharghar\'s vibrant IT and professional community. Upgrade your wardrobe with our meticulously crafted two-piece suits and business casuals.',
    usp: 'Modern Cuts & Contemporary Styling',
    popularService: 'IT Professional Wardrobe Makeovers'
  },
  {
    slug: 'vashi',
    name: 'Vashi',
    lat: 19.0771,
    lng: 72.9986,
    description: 'Vashi\'s premier destination for custom wedding wear and luxury suiting. We bring the complete atelier experience to your Vashi residence for utmost convenience.',
    usp: 'Complete Wedding Trousseau Planning',
    popularService: 'Designer Tuxedos & Festive Kurta Sets'
  },
  {
    slug: 'govandi',
    name: 'Govandi',
    lat: 19.0556,
    lng: 72.9142,
    description: 'Expanding our bespoke legacy to Govandi. Enjoy our signature doorstep tailoring service for custom-fit Pathani suits and classic formal wear.',
    usp: 'Signature Doorstep Measurement Service',
    popularService: 'Classic Pathani Suits'
  },
  {
    slug: 'ulwe',
    name: 'Ulwe',
    lat: 18.9667,
    lng: 73.0167,
    description: 'Bringing 25 years of tailoring mastery to the rapidly growing Ulwe node. Perfect fits, timely delivery, and unparalleled craftsmanship for all your sartorial needs.',
    usp: 'Timely Delivery & 6-Month Warranty',
    popularService: 'Bespoke Formal Suits'
  },
  {
    slug: 'kharkopar',
    name: 'Kharkopar',
    lat: 18.9733,
    lng: 73.0233,
    description: 'Exclusive custom tailoring services in Kharkopar. From fabric selection to final fitting, experience true bespoke luxury without leaving your home.',
    usp: 'Exclusive Fabric Collection Access',
    popularService: 'Three-Piece Wedding Suits'
  },
  {
    slug: 'baman-dongri',
    name: 'Baman Dongri',
    lat: 18.9680,
    lng: 73.0210,
    description: 'Fashion Look proudly serves Baman Dongri with premium stitching services. Elevate your style with our custom-tailored menswear and luxury gift boxes.',
    usp: 'Personalized Style Consultations',
    popularService: 'Corporate Gifting & Combo Boxes'
  }
];

export function getLocationBySlug(slug: string): LocationData | undefined {
  return serviceLocations.find((loc) => loc.slug === slug);
}
