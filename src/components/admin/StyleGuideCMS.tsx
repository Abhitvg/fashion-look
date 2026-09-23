'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Edit2, Trash2, X } from 'lucide-react';

export type StyleGuideItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  categoryId: string;
  categoryName: string;
};

export default function StyleGuideCMS() {
  const [items, setItems] = useState<StyleGuideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState<string | null>(null);
  
  // Form State
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [categoryId, setCategoryId] = useState('the-suit');
  const [categoryName, setCategoryName] = useState('The Suit');

  const categories = [
    { id: 'the-suit', name: 'The Suit' },
    { id: 'the-shirt', name: 'The Shirt' },
    { id: 'details', name: 'The Details' }
  ];

  useEffect(() => {
    const q = query(collection(db, 'styleGuide'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data: StyleGuideItem[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as StyleGuideItem);
      });
      setItems(data);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching style guide:", error);
        setLoading(false);
    });

    return () => unsub();
  }, []);

  const resetForm = () => {
    setId('');
    setTitle('');
    setSubtitle('');
    setDescription('');
    setImage('');
    setCategoryId('the-suit');
    setCategoryName('The Suit');
    setIsEditing(false);
    setCurrentItemId(null);
  };

  const handleEdit = (item: StyleGuideItem) => {
    setId(item.id);
    setTitle(item.title);
    setSubtitle(item.subtitle);
    setDescription(item.description);
    setImage(item.image);
    setCategoryId(item.categoryId);
    setCategoryName(item.categoryName);
    setCurrentItemId(item.id);
    setIsEditing(true);
  };

  const handleDelete = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      await deleteDoc(doc(db, 'styleGuide', itemId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !title) return alert('ID and Title are required.');

    const itemData = {
      title,
      subtitle,
      description,
      image,
      categoryId,
      categoryName,
      updatedAt: serverTimestamp(),
    };

    try {
      const { doc, setDoc } = await import('firebase/firestore');
      
      if (currentItemId && currentItemId !== id) {
        // If ID changed, delete old one
        await deleteDoc(doc(db, 'styleGuide', currentItemId));
      }
      
      await setDoc(doc(db, 'styleGuide', id), {
        ...itemData,
        createdAt: currentItemId ? undefined : serverTimestamp()
      }, { merge: true });

      resetForm();
    } catch (error) {
      console.error("Error saving style guide item: ", error);
      alert("Failed to save item. See console.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
        <p className="text-ivory/50">Loading Style Guide Data...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Editor Form */}
      <div className="lg:col-span-1 bg-atelier-soft border border-ivory/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-serif text-ivory tracking-widest uppercase">
            {isEditing ? 'Edit Item' : 'New Item'}
          </h2>
          {isEditing && (
            <button onClick={resetForm} className="text-ivory/50 hover:text-ivory">
              <X size={20} />
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Category</label>
            <select 
              value={categoryId} 
              onChange={(e) => {
                setCategoryId(e.target.value);
                setCategoryName(categories.find(c => c.id === e.target.value)?.name || '');
              }} 
              className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Item ID (Slug)</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. half-canvas-construction" className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Subtitle</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Image URL</label>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          
          <button type="submit" className="w-full bg-gold text-black uppercase tracking-widest py-3 font-medium hover:bg-ivory transition-colors">
            {isEditing ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      </div>

      {/* Item List */}
      <div className="lg:col-span-2 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ivory/10 text-gold/70 text-xs uppercase tracking-widest">
              <th className="p-4 font-normal">Item</th>
              <th className="p-4 font-normal">Category</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {items.map((item) => (
              <tr key={item.id} className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors">
                <td className="p-4">
                  <div className="text-ivory font-medium">{item.title}</div>
                  <div className="text-ivory/40 text-xs mt-1">/{item.id}</div>
                </td>
                <td className="p-4 text-ivory/80 whitespace-nowrap">{item.categoryName}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 text-ivory/50 hover:text-gold bg-black border border-ivory/10 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-ivory/50 hover:text-red-500 bg-black border border-ivory/10 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-ivory/50 border-b border-ivory/5">
                  No items found in Firestore.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
