import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { getJournalPosts } from '@/lib/journal';
import Link from 'next/link';

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
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-24 pb-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-zinc-50">
              The Atelier Journal
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
              Styling advice, tailoring insights, and guides for the modern gentleman.
            </p>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {journalPosts.map((post, idx) => (
              <ScrollReveal key={post.slug} delay={idx * 0.1}>
                <Link 
                  href={`/${locale}/journal/${post.slug}`}
                  className="block h-full group bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="aspect-[16/9] bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-auto">
                    <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 mb-3 space-x-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 flex-grow">
                      {post.description}
                    </p>
                    <div className="text-amber-600 dark:text-amber-500 font-medium mt-auto group-hover:underline">
                      Read Article →
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
