import { db } from './firebase';
import { collection, getDocs, getDoc, doc, orderBy, query } from 'firebase/firestore';

export interface StyleGuideItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  categoryId?: string;
  categoryName?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface StyleGuideCategory {
  id: string;
  name: string;
  description: string;
  items: StyleGuideItem[];
}

export async function getStyleGuideData(): Promise<StyleGuideCategory[]> {
  try {
    const q = query(collection(db, 'styleGuide'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    
    // Group by categoryId
    const categoriesMap = new Map<string, StyleGuideCategory>();
    
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as StyleGuideItem;
      const item = data;
      
      const catId = item.categoryId || 'general';
      const catName = item.categoryName || 'General';
      
      if (!categoriesMap.has(catId)) {
        categoriesMap.set(catId, {
          id: catId,
          name: catName,
          description: '',
          items: []
        });
      }
      
      categoriesMap.get(catId)!.items.push(item);
    });
    
    return Array.from(categoriesMap.values());
  } catch (error) {
    console.error("Error fetching style guide data:", error);
    return [];
  }
}

export async function getStyleGuideItem(categoryId: string, itemId: string): Promise<StyleGuideItem | undefined> {
  try {
    const docRef = doc(db, 'styleGuide', itemId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as StyleGuideItem;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching style guide item ${itemId}:`, error);
    return undefined;
  }
}
