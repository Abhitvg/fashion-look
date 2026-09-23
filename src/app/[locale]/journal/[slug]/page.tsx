import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollReveal from '@/components/layout/ScrollReveal';
import { getPostBySlug, getJournalPosts } from '@/lib/journal';
import Link from 'next/link';

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
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://www.fashion-look.in/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Journal",
        "item": `https://www.fashion-look.in/${locale}/journal`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://www.fashion-look.in/${locale}/journal/${slug}`
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      
      <main className="flex-grow pt-24 pb-16 bg-white dark:bg-zinc-950">
        <article className="container mx-auto px-4 md:px-8 max-w-3xl">
          <ScrollReveal>
            <Link 
              href={`/${locale}/journal`}
              className="text-amber-600 dark:text-amber-500 hover:underline mb-8 inline-block font-medium"
            >
              ← Back to Journal
            </Link>
            
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-zinc-900 dark:text-zinc-50 leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center text-zinc-500 dark:text-zinc-400 gap-4 text-sm font-medium border-b border-zinc-200 dark:border-zinc-800 pb-8">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <div className="aspect-[16/9] w-full mb-12 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-sm">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <div 
              className="prose prose-lg dark:prose-invert prose-amber max-w-none 
                         prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                         prose-p:text-zinc-600 dark:prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
                         prose-a:text-amber-600 dark:prose-a:text-amber-500 hover:prose-a:text-amber-700
                         prose-strong:text-zinc-900 dark:prose-strong:text-zinc-50"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </ScrollReveal>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}
