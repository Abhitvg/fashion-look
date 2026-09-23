import { getProducts } from '@/lib/shop-data';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export const metadata = {
  title: 'Shop | Fashion Look Accessories',
  description: 'Elevate your wardrobe with our curated selection of bespoke accessories, including silk grenadine ties, pocket squares, and fine leather goods.',
};

export default async function ShopIndexPage({
  params
}: {
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  const products = await getProducts();
  
  return (
    <main className="min-h-screen bg-atelier pt-32 pb-24">
      {/* Shop Header */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-ivory mb-4 tracking-wide uppercase">
          The Haberdashery
        </h1>
        <div className="w-16 h-px bg-gold mx-auto mb-6"></div>
        <p className="text-ivory/60 font-light tracking-[0.2em] uppercase text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
          Curated Accessories for the Modern Gentleman
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-16">
          {products.map((product) => (
            <Link 
              key={product.id}
              href={`/shop/${product.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-atelier-dark border border-ivory/5">
                <Image 
                  src={product.images[0]} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                />
                
                {!product.inStock && (
                  <div className="absolute top-4 left-4 bg-atelier-dark/80 backdrop-blur-sm border border-ivory/10 px-3 py-1">
                    <span className="text-[10px] tracking-widest uppercase text-ivory/70">Out of Stock</span>
                  </div>
                )}
                
                {product.inStock && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-gradient-to-t from-atelier-dark/90 to-transparent">
                    <div className="w-full py-3 text-center border border-ivory/20 bg-atelier-dark/50 backdrop-blur-md text-xs tracking-widest uppercase text-ivory hover:text-gold hover:border-gold/50 transition-colors">
                      View Details
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <p className="text-[10px] tracking-widest uppercase text-gold mb-2">
                  {product.category.replace('-', ' ')}
                </p>
                <h2 className="text-lg font-serif text-ivory mb-2 group-hover:text-gold transition-colors duration-300">
                  {product.name}
                </h2>
                <p className="text-ivory/70 font-light text-sm">
                  {product.currency} {product.price.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
