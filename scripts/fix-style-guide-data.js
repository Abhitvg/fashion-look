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

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

try {
  const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountStr) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY in .env.local");
  
  const serviceAccount = JSON.parse(serviceAccountStr);

  initializeApp({
    credential: cert(serviceAccount)
  });
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1);
}

const db = getFirestore("default");

const styleGuideData = [
  {
    id: "suits",
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
    id: "shirts",
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
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Elegant layers for the colder months.",
    items: [
      {
        id: "cashmere-overcoat",
        title: "The Cashmere Overcoat",
        subtitle: "Timeless Winter Elegance",
        description: "A staple for the colder months, our bespoke overcoats are crafted from pure cashmere. Cut generously to fit comfortably over a suit jacket, featuring peak lapels and a classic double-breasted closure for maximum warmth and style.",
        image: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "the-trench-coat",
        title: "Bespoke Trench Coat",
        subtitle: "Weatherproof Tailoring",
        description: "Constructed from water-resistant gabardine, the bespoke trench coat is a functional yet highly stylish layer. Complete with traditional epaulettes, a gun flap, and a belted waist to create a strong V-shaped silhouette.",
        image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?q=80&w=800&auto=format&fit=crop",
      }
    ]
  },
  {
    id: "details",
    name: "Bespoke Details",
    description: "The subtle signatures of handmade tailoring.",
    items: [
      {
        id: "working-cuffs",
        title: "Surgeon's Cuffs",
        subtitle: "Working Buttonholes",
        description: "A hallmark of true bespoke tailoring, working cuff buttonholes (surgeon's cuffs) allow you to leave the last button undone, subtly signaling the custom nature of your garment.",
        image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?q=80&w=800&auto=format&fit=crop",
      },
      {
        id: "pick-stitching",
        title: "Hand Pick-Stitching",
        subtitle: "Artisan Finishing",
        description: "Delicate hand-stitching along the lapels, pockets, and edges of the jacket. This subtle detail requires immense skill and adds a beautiful artisanal texture to the finished garment.",
        image: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop",
      }
    ]
  }
];

async function migrate() {
  try {
    // 1. Delete all existing styleGuide documents
    console.log("Cleaning up old styleGuide data...");
    const snapshot = await db.collection('styleGuide').get();
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    console.log(`Deleted ${snapshot.size} old documents.`);

    // 2. Insert new data
    console.log("Migrating new style guide data...");
    let styleGuideCount = 0;
    for (const category of styleGuideData) {
      for (const item of category.items) {
        await db.collection('styleGuide').doc(item.id).set({
          ...item,
          categoryId: category.id,
          categoryName: category.name,
          createdAt: new Date().getTime(),
          updatedAt: new Date().getTime()
        });
        styleGuideCount++;
      }
    }
    
    console.log(`Success! Migrated ${styleGuideCount} style guide items.`);
    process.exit(0);
  } catch(e) {
    console.error("Migration failed:", e);
    process.exit(1);
  }
}

migrate();
