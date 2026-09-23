'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Edit2, Trash2, X } from 'lucide-react';
import { Product, ProductCategory } from '@/lib/shop-data';

export default function ShopCMS() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);
  
  // Form State
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [category, setCategory] = useState<ProductCategory>('accessories');
  const [images, setImages] = useState(''); // Comma separated URLs
  const [inStock, setInStock] = useState(true);
  const [features, setFeatures] = useState(''); // Comma separated

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data: Product[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(data);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
    });

    return () => unsub();
  }, []);

  const resetForm = () => {
    setId('');
    setName('');
    setDescription('');
    setPrice(0);
    setCurrency('INR');
    setCategory('accessories');
    setImages('');
    setInStock(true);
    setFeatures('');
    setIsEditing(false);
    setCurrentProductId(null);
  };

  const handleEdit = (product: Product) => {
    setId(product.id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setCurrency(product.currency);
    setCategory(product.category);
    setImages(product.images.join(', '));
    setInStock(product.inStock);
    setFeatures(product.features.join('\n'));
    setCurrentProductId(product.id);
    setIsEditing(true);
  };

  const handleDelete = async (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await deleteDoc(doc(db, 'products', productId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !name) return alert('ID and Name are required.');

    const productData = {
      name,
      description,
      price: Number(price),
      currency,
      category,
      images: images.split(',').map(s => s.trim()).filter(Boolean),
      inStock,
      features: features.split('\n').map(s => s.trim()).filter(Boolean),
      updatedAt: serverTimestamp(),
    };

    try {
      const { doc, setDoc } = await import('firebase/firestore');
      
      if (currentProductId && currentProductId !== id) {
        // If ID changed, delete old one
        await deleteDoc(doc(db, 'products', currentProductId));
      }
      
      await setDoc(doc(db, 'products', id), {
        ...productData,
        createdAt: currentProductId ? undefined : serverTimestamp()
      }, { merge: true });

      resetForm();
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product. See console.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
        <p className="text-ivory/50">Loading Shop Data...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Editor Form */}
      <div className="lg:col-span-1 bg-atelier-soft border border-ivory/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-serif text-ivory tracking-widest uppercase">
            {isEditing ? 'Edit Product' : 'New Product'}
          </h2>
          {isEditing && (
            <button onClick={resetForm} className="text-ivory/50 hover:text-ivory">
              <X size={20} />
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Product ID (Slug)</label>
            <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. navy-silk-tie" className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
            </div>
            <div>
              <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value as ProductCategory)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none">
                <option value="accessories">Accessories</option>
                <option value="ties">Ties</option>
                <option value="pocket-squares">Pocket Squares</option>
                <option value="leather">Leather</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Images (Comma separated URLs)</label>
            <textarea value={images} onChange={(e) => setImages(e.target.value)} rows={2} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Features (One per line)</label>
            <textarea value={features} onChange={(e) => setFeatures(e.target.value)} rows={3} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="inStock" checked={inStock} onChange={(e) => setInStock(e.target.checked)} className="accent-gold" />
            <label htmlFor="inStock" className="text-xs text-ivory/70 uppercase tracking-wider">In Stock</label>
          </div>
          
          <button type="submit" className="w-full bg-gold text-black uppercase tracking-widest py-3 font-medium hover:bg-ivory transition-colors">
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="lg:col-span-2 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ivory/10 text-gold/70 text-xs uppercase tracking-widest">
              <th className="p-4 font-normal">Product</th>
              <th className="p-4 font-normal">Category</th>
              <th className="p-4 font-normal">Price</th>
              <th className="p-4 font-normal">Stock</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {products.map((product) => (
              <tr key={product.id} className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors">
                <td className="p-4">
                  <div className="text-ivory font-medium">{product.name}</div>
                  <div className="text-ivory/40 text-xs mt-1">/{product.id}</div>
                </td>
                <td className="p-4 text-ivory/80 whitespace-nowrap capitalize">{product.category.replace('-', ' ')}</td>
                <td className="p-4 text-ivory/80 whitespace-nowrap">{product.currency} {product.price}</td>
                <td className="p-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded text-xs ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 text-ivory/50 hover:text-gold bg-black border border-ivory/10 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="p-2 text-ivory/50 hover:text-red-500 bg-black border border-ivory/10 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-ivory/50 border-b border-ivory/5">
                  No products found in Firestore.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
