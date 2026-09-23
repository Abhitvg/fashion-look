import { notFound } from 'next/navigation';
import { getPostBySlug, getJournalPosts } from '@/lib/journal';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const locales = ['en', 'hi', 'mr', 'ur'];
  const params = [];
  
  const posts = await getJournalPosts();
  
  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | Fashion Look Journal`,
    description: post.description,
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}/journal/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://www.fashion-look.in/${locale}/journal/${slug}`,
      images: [
        {
          url: `https://www.fashion-look.in${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ]
    }
  };
}

export default async function JournalArticlePage({
  params
}: {
  params: Promise<{ slug: string, locale: string }>
}) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "image": `https://www.fashion-look.in${post.image}`,
    "datePublished": `${post.date}T08:00:00+08:00`,
    "dateModified": `${post.date}T08:00:00+08:00`,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fashion Look",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.fashion-look.in/images/logo.png"
      }
    }
  };

  return (
    <main className="min-h-screen bg-atelier pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      
      {/* Editorial Header */}
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center mb-16">
        <Link 
          href={`/journal`}
          className="text-gold hover:text-gold-light transition-colors mb-12 inline-block font-semibold tracking-widest uppercase text-xs"
        >
          &larr; Return to Journal
        </Link>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-ivory mb-8 leading-[1.1]">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-center gap-4 text-xs tracking-widest uppercase text-ivory/50">
          <span>{post.author}</span>
          <span className="w-1 h-1 rounded-full bg-gold/50"></span>
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-gold/50"></span>
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-4 md:px-8 max-w-6xl mb-24">
        <div className="relative aspect-[21/9] w-full border border-ivory/10">
          <Image 
            src={post.image} 
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Editorial Content */}
      <article className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div 
          className="prose prose-lg dark:prose-invert prose-atelier max-w-none 
            prose-headings:font-serif prose-headings:font-normal prose-headings:text-ivory
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            prose-p:text-ivory/70 prose-p:font-light prose-p:leading-relaxed prose-p:mb-8
            prose-a:text-gold hover:prose-a:text-gold-light prose-a:transition-colors
            prose-strong:text-ivory prose-strong:font-normal
            prose-blockquote:border-l-gold prose-blockquote:bg-ivory/5 prose-blockquote:p-6 prose-blockquote:text-ivory/90 prose-blockquote:font-serif prose-blockquote:italic
            first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-serif first-letter:text-gold first-letter:leading-[0.8] first-line:uppercase first-line:tracking-widest"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="mt-24 pt-12 border-t border-ivory/10 text-center">
          <p className="text-ivory/40 italic font-serif text-xl">Fashion Look Tailors</p>
        </div>
      </article>
    </main>
  );
}
