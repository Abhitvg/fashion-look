'use client';

import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2, Plus, Edit2, Trash2, X } from 'lucide-react';
import { BlogPost } from '@/lib/journal';

export default function JournalCMS() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  
  // Form State
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [author, setAuthor] = useState('Fashion Look Editorial');
  const [image, setImage] = useState('/images/storeimage.png');
  const [readTime, setReadTime] = useState('3 min read');

  useEffect(() => {
    const q = query(collection(db, 'journal'), orderBy('date', 'desc'));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const data: BlogPost[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ slug: doc.id, ...doc.data() } as BlogPost);
      });
      setPosts(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const resetForm = () => {
    setSlug('');
    setTitle('');
    setDescription('');
    setContent('');
    setDate(new Date().toISOString().split('T')[0]);
    setAuthor('Fashion Look Editorial');
    setImage('/images/storeimage.png');
    setReadTime('3 min read');
    setIsEditing(false);
    setCurrentPostId(null);
  };

  const handleEdit = (post: BlogPost) => {
    setSlug(post.slug);
    setTitle(post.title);
    setDescription(post.description);
    setContent(post.content);
    setDate(post.date);
    setAuthor(post.author);
    setImage(post.image);
    setReadTime(post.readTime);
    setCurrentPostId(post.slug);
    setIsEditing(true);
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteDoc(doc(db, 'journal', slug));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!slug || !title || !content) return alert('Slug, Title, and Content are required.');

    const postData = {
      title,
      description,
      content,
      date,
      author,
      image,
      readTime,
      updatedAt: serverTimestamp(),
    };

    try {
      if (currentPostId) {
        // Edit existing (Note: if slug changed, we should technically create a new doc and delete the old one, but for simplicity we'll just update the current doc or alert if slug changed)
        if (currentPostId !== slug) {
          await deleteDoc(doc(db, 'journal', currentPostId));
          await updateDoc(doc(db, 'journal', slug), postData); // This might fail if doc doesn't exist, better to use setDoc
        } else {
          await updateDoc(doc(db, 'journal', currentPostId), postData);
        }
      } else {
        // Create new (We use slug as the document ID)
        const { doc, setDoc } = await import('firebase/firestore');
        await setDoc(doc(db, 'journal', slug), {
          ...postData,
          createdAt: serverTimestamp()
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving post: ", error);
      alert("Failed to save post. See console.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <Loader2 className="w-8 h-8 text-gold animate-spin mb-4" />
        <p className="text-ivory/50">Loading Journal...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Editor Form */}
      <div className="lg:col-span-1 bg-atelier-soft border border-ivory/10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-serif text-ivory tracking-widest uppercase">
            {isEditing ? 'Edit Article' : 'New Article'}
          </h2>
          {isEditing && (
            <button onClick={resetForm} className="text-ivory/50 hover:text-ivory">
              <X size={20} />
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">URL Slug</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. how-to-choose-sherwani" className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={2} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
            </div>
            <div>
              <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Read Time</label>
              <input type="text" value={readTime} onChange={(e) => setReadTime(e.target.value)} placeholder="e.g. 4 min read" className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Author</label>
              <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
            </div>
            <div>
              <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Image URL</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none" required />
            </div>
          </div>
          <div>
            <label className="block text-xs text-ivory/70 uppercase tracking-wider mb-1">Content (HTML allowed)</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={10} className="w-full bg-black border border-ivory/20 text-ivory px-3 py-2 text-sm focus:border-gold outline-none font-mono" required />
          </div>
          
          <button type="submit" className="w-full bg-gold text-black uppercase tracking-widest py-3 font-medium hover:bg-ivory transition-colors">
            {isEditing ? 'Update Article' : 'Publish Article'}
          </button>
        </form>
      </div>

      {/* Post List */}
      <div className="lg:col-span-2 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-ivory/10 text-gold/70 text-xs uppercase tracking-widest">
              <th className="p-4 font-normal">Date</th>
              <th className="p-4 font-normal">Title & Slug</th>
              <th className="p-4 font-normal">Author</th>
              <th className="p-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-ivory/5 hover:bg-ivory/[0.02] transition-colors">
                <td className="p-4 text-ivory/50 whitespace-nowrap">{post.date}</td>
                <td className="p-4">
                  <div className="text-ivory font-medium">{post.title}</div>
                  <div className="text-ivory/40 text-xs mt-1">/{post.slug}</div>
                </td>
                <td className="p-4 text-ivory/80 whitespace-nowrap">{post.author}</td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(post)} className="p-2 text-ivory/50 hover:text-gold bg-black border border-ivory/10 transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(post.slug)} className="p-2 text-ivory/50 hover:text-red-500 bg-black border border-ivory/10 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-ivory/50 border-b border-ivory/5">
                  No articles found in Firestore.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
