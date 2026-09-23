import { notFound } from 'next/navigation';
import { getProductById, getProducts } from '@/lib/shop-data';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { ShoppingBag, ChevronRight, MessageCircle } from 'lucide-react';

export const revalidate = 3600;

export async function generateStaticParams() {
  const locales = ['en', 'hi', 'mr', 'ur'];
  const params = [];
  
  const products = await getProducts();
  
  for (const locale of locales) {
    for (const product of products) {
      params.push({ locale, id: product.id });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }) {
  const { id, locale } = await params;
  const product = await getProductById(id);
  
  if (!product) return { title: 'Not Found' };
  
  return {
    title: `${product.name} | Fashion Look Shop`,
    description: product.description,
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}/shop/${id}`,
    }
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string, locale: string }>
}) {
  const { id } = await params;
  const product = await getProductById(id);
  
  if (!product) {
    notFound();
  }

  // Pre-fill WhatsApp message
  const whatsappNumber = "919999999999"; // Replace with actual business number
  const whatsappMessage = encodeURIComponent(`Hello, I am interested in purchasing the ${product.name} (${product.currency} ${product.price.toLocaleString()}) from your shop.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen bg-atelier pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-ivory/50 mb-12">
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-gold">{product.category.replace('-', ' ')}</span>
          <ChevronRight size={12} />
          <span className="text-ivory/30 truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[4/5] w-full bg-atelier-dark border border-ivory/10">
              <Image 
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-6">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative aspect-square w-full bg-atelier-dark border border-ivory/10">
                    <Image 
                      src={img} 
                      alt={`${product.name} detail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-32 flex flex-col">
            <p className="text-[10px] tracking-widest uppercase text-gold mb-4">
              {product.category.replace('-', ' ')}
            </p>
            
            <h1 className="text-3xl md:text-5xl font-serif text-ivory mb-6 leading-tight">
              {product.name}
            </h1>
            
            <p className="text-2xl font-light text-ivory/90 mb-8">
              {product.currency} {product.price.toLocaleString()}
            </p>
            
            <div className="w-12 h-px bg-ivory/20 mb-8"></div>
            
            <p className="text-ivory/70 font-light leading-relaxed mb-12">
              {product.description}
            </p>
            
            {/* Features List */}
            <div className="mb-12">
              <h3 className="text-xs tracking-widest uppercase text-ivory mb-6">Details & Specifications</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-light text-ivory/60">
                    <span className="text-gold mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* CTA */}
            {product.inStock ? (
              <div className="flex flex-col gap-4">
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-atelier-dark px-8 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-colors"
                >
                  <MessageCircle size={16} />
                  Purchase via WhatsApp
                </a>
                <p className="text-center text-[10px] tracking-wide text-ivory/40">
                  You will be redirected to WhatsApp to arrange secure payment and shipping details directly with our atelier.
                </p>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center gap-3 border border-ivory/20 text-ivory/40 px-8 py-5 text-xs font-bold tracking-[0.2em] uppercase bg-atelier-dark/50 cursor-not-allowed">
                Out of Stock
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
