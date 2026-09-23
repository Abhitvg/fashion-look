import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // Markdown or HTML string
  date: string;
  author: string;
  image: string;
  readTime: string;
  createdAt?: Date | string | null;
}

// Fallback data in case Firestore is empty initially
const fallbackPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-wedding-sherwani',
    title: 'How to Choose the Perfect Wedding Sherwani in 2026',
    description: 'A comprehensive guide for grooms on selecting the right fabric, cut, and color for a bespoke wedding sherwani.',
    content: `
      <h2>The Importance of a Bespoke Sherwani</h2>
      <p>Your wedding day is one of the most important milestones of your life. While the bride's outfit often takes center stage, the groom's sherwani is equally crucial. A well-tailored sherwani exudes regality, confidence, and cultural pride.</p>
      
      <h2>1. Fabric is Everything</h2>
      <p>The foundation of any great sherwani is the fabric. For winter weddings, heavy silks, velvets, and brocades are ideal. For summer weddings, lighter cotton-silks and blended fabrics ensure you stay comfortable without sacrificing style.</p>
      
      <h2>2. The Right Cut</h2>
      <p>A bespoke sherwani should fit like a second skin. At Fashion Look, our master tailors ensure that the shoulders sit perfectly, the chest has enough breathing room, and the length complements your height.</p>
      
      <h2>3. Color Coordination</h2>
      <p>Gone are the days when grooms only wore red or gold. Today, pastel shades like mint green, powder blue, and ivory are incredibly popular. It's essential to coordinate your sherwani with the bride's lehenga.</p>
      
      <h2>Book a Home Visit</h2>
      <p>Finding time to visit a tailor can be tough. That's why Fashion Look offers complimentary home visits across Navi Mumbai. <a href="/book-visit">Book yours today</a>.</p>
    `,
    date: '2026-09-10',
    author: 'Tafshir Shaikh',
    image: '/images/storeimage.png',
    readTime: '4 min read',
  },
];

export async function getJournalPosts(): Promise<BlogPost[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'journal'));
    const posts: BlogPost[] = [];
    
    querySnapshot.forEach((doc) => {
      posts.push({ slug: doc.id, ...doc.data() } as BlogPost);
    });
    
    // Sort by date descending
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (posts.length === 0) {
      return fallbackPosts;
    }
    
    return posts;
  } catch (error) {
    console.error("Error fetching journal posts:", error);
    return fallbackPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const docRef = doc(db, 'journal', slug);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { slug: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    
    // Fallback search
    return fallbackPosts.find((post) => post.slug === slug);
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return fallbackPosts.find((post) => post.slug === slug);
  }
}
