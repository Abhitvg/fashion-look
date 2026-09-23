const fs = require('fs');

if (fs.existsSync('.env.local')) {
  const envConfig = fs.readFileSync('.env.local', 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1];
      let val = match[2];
      if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyCipnms0EwydsHXH4bxOeaE26sIKnCPsi4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "fashion-look-484b2.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "fashion-look-484b2",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "fashion-look-484b2.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "925043698954",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:925043698954:web:e9d398afc32a6e6df11ef3",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-QSWH7QGDDT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "default");

const shopData = [
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

const styleGuideData = [
  {
    id: "the-suit",
    name: "The Suit",
    description: "The foundation of a bespoke wardrobe.",
    items: [
      {
        id: "half-canvas-construction",
        title: "Half-Canvas Construction",
        subtitle: "The Standard of Quality",
        description: "Our signature half-canvas construction features a natural horsehair canvas breast piece that allows the jacket to drape naturally and mold to your body over time, while keeping the garment lightweight and breathable.",
        image: "https://images.unsplash.com/photo-1594938298596-ec65b50373d5?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "the-napolitan-shoulder",
        title: "The Neapolitan Shoulder",
        subtitle: "Spalla Camicia",
        description: "Characterized by its lack of padding and slight shirring (grinzze) at the sleeve head, the Neapolitan shoulder offers unparalleled comfort and a relaxed, elegant silhouette typical of Southern Italian tailoring.",
        image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?q=80&w=800&auto=format&fit=crop",
      }
    ]
  },
  {
    id: "the-shirt",
    name: "The Shirt",
    description: "Bespoke shirting tailored to your precise measurements.",
    items: [
      {
        id: "the-cutaway-collar",
        title: "The Cutaway Collar",
        subtitle: "Modern & Bold",
        description: "An aggressive spread that points back toward the shoulders. The cutaway collar accommodates larger tie knots perfectly and looks exceptional when worn open without a tie for a smart-casual aesthetic.",
        image: "https://images.unsplash.com/photo-1620012253295-c1590e048f46?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "mother-of-pearl-buttons",
        title: "Mother of Pearl Buttons",
        subtitle: "The Mark of Luxury",
        description: "We exclusively use genuine Mother of Pearl buttons on our bespoke shirts. Sourced from the inner layer of oyster shells, they provide a rich luster and durability that plastic buttons cannot match.",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop",
      }
    ]
  }
];

async function migrate() {
  try {
    console.log("Migrating shop data...");
    let productCount = 0;
    for (const product of shopData) {
      await setDoc(doc(db, 'products', product.id), {
        ...product,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      });
      productCount++;
    }
    
    console.log("Migrating style guide data...");
    let styleGuideCount = 0;
    for (const category of styleGuideData) {
      for (const item of category.items) {
        await setDoc(doc(db, 'styleGuide', item.id), {
          ...item,
          categoryId: category.id,
          categoryName: category.name,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        });
        styleGuideCount++;
      }
    }
    
    console.log(`Success! Migrated ${productCount} products and ${styleGuideCount} style guide items.`);
    process.exit(0);
  } catch(e) {
    console.error("Migration failed:", e);
    process.exit(1);
  }
}

migrate();
