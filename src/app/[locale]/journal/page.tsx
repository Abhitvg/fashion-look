import { getJournalPosts } from '@/lib/journal';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export const metadata = {
  title: 'Journal | Fashion Look Bespoke Tailors',
  description: 'Read the latest styling advice, bespoke tailoring tips, and wedding outfit guides from the master tailors at Fashion Look.',
};

export const revalidate = 3600; // Revalidate every hour

export default async function JournalIndexPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  const journalPosts = await getJournalPosts();
  
  if (journalPosts.length === 0) {
    return (
      <main className="min-h-screen bg-atelier pt-32 pb-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors group">
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back
          </Link>
        </div>
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <h1 className="text-4xl font-serif text-ivory mb-6">The Atelier Journal</h1>
          <p className="text-ivory/60 font-light">No articles published yet.</p>
        </div>
      </main>
    );
  }

  const featuredPost = journalPosts[0];
  const secondaryPosts = journalPosts.slice(1);

  return (
    <main className="min-h-screen bg-atelier pt-32 pb-24">
      {/* Back Button */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-ivory/50 hover:text-gold transition-colors group">
          <span className="group-hover:-translate-x-1 transition-transform">&larr;</span> Back
        </Link>
      </div>

      {/* Magazine Header */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-serif text-ivory mb-4 tracking-wide uppercase">
          The Journal
        </h1>
        <div className="w-24 h-px bg-gold mx-auto mb-6"></div>
        <p className="text-ivory/60 font-light tracking-[0.2em] uppercase text-xs md:text-sm">
          Sartorial Excellence & Lifestyle
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Featured Article - Full Width Hero */}
        <div className="mb-24 group relative block overflow-hidden bg-atelier-dark/50 border border-ivory/10">
          <Link href={`/journal/${featuredPost.slug}`} className="absolute inset-0 z-10">
            <span className="sr-only">Read {featuredPost.title}</span>
          </Link>
          
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-96 md:h-[600px] overflow-hidden">
              <Image 
                src={featuredPost.image} 
                alt={featuredPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center p-8 md:p-16 lg:p-24 relative z-20 bg-gradient-to-r from-atelier-dark/90 to-atelier/90 md:bg-none md:bg-atelier-dark">
              <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-gold mb-6">
                <span>{featuredPost.date}</span>
                <span className="w-1 h-1 rounded-full bg-gold/50"></span>
                <span>{featuredPost.readTime}</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-ivory leading-tight mb-8 group-hover:text-gold transition-colors duration-300">
                {featuredPost.title}
              </h2>
              
              <p className="text-ivory/70 font-light leading-relaxed text-lg mb-10">
                {featuredPost.description}
              </p>
              
              <div className="inline-flex items-center gap-3 text-xs tracking-[0.2em] uppercase text-ivory group-hover:text-gold transition-colors">
                Read The Feature
                <span className="block w-8 h-px bg-current group-hover:w-12 transition-all duration-300"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Articles Grid */}
        {secondaryPosts.length > 0 && (
          <div>
            <div className="flex items-center gap-6 mb-12">
              <h3 className="text-xl font-serif text-ivory uppercase tracking-widest">Latest Dispatches</h3>
              <div className="flex-grow h-px bg-ivory/10"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {secondaryPosts.map((post) => (
                <article key={post.slug} className="group relative">
                  <Link href={`/journal/${post.slug}`} className="absolute inset-0 z-10">
                    <span className="sr-only">Read {post.title}</span>
                  </Link>
                  
                  <div className="relative h-80 mb-6 overflow-hidden border border-ivory/5 bg-atelier-dark/30">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 text-[10px] tracking-widest uppercase text-gold mb-4">
                    <span>{post.date}</span>
                  </div>
                  
                  <h2 className="text-2xl font-serif text-ivory leading-snug mb-4 group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-ivory/60 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="inline-flex items-center text-xs tracking-widest uppercase text-ivory/50 group-hover:text-gold transition-colors">
                    Read Article &rarr;
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
