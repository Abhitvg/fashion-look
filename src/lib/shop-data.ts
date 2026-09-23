import { db } from './firebase';
import { collection, getDocs, getDoc, doc, orderBy, query } from 'firebase/firestore';

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
  createdAt?: any;
  updatedAt?: any;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const products: Product[] = [];
    snapshot.forEach(docSnap => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  try {
    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return undefined;
  }
}
