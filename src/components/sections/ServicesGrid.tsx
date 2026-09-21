'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    title: 'Two-Piece Formal Suit',
    desc: 'Impeccably tailored from premium wool and linen. Slim, regular, or relaxed fit — measured to your exact silhouette.',
    price: '₹7,500',
    image: '/images/services/formal-suit.jpg',
  },
  {
    title: 'Royal Groom Sherwani',
    desc: 'Exquisite hand-embroidered wedding sherwanis in silk, velvet, and brocade. The centrepiece of your celebration.',
    price: '₹15,000',
    image: '/images/services/sherwani.jpg',
  },
  {
    title: 'Premium Tuxedo',
    desc: 'Black-tie perfection with satin peak lapels and hand-finished details. For galas, receptions, and landmark evenings.',
    price: '₹12,000',
    image: '/images/services/tuxedo.jpg',
  },
  {
    title: 'Classic Pathani',
    desc: 'Timeless Pathani suits in cotton and linen blends. Effortless elegance for festivals, prayers, and everyday refinement.',
    price: '₹3,500',
    image: '/images/services/pathani.jpg',
  },
  {
    title: 'Executive Safari Suit',
    desc: 'The power suit of Indian professionals. Structured shoulders, smart pockets, and a commanding presence in the boardroom.',
    price: '₹4,500',
    image: '/images/services/safari.jpg',
  },
  {
    title: 'Luxury Fabric Gifting',
    desc: 'Curated gift boxes of premium fabrics, silk ties, and accessories. The perfect corporate or festive gift.',
    price: '₹2,500',
    image: '/images/services/gift-box.jpg',
  },
];

export default function ServicesGrid() {
  const handleWhatsApp = (service: string) => {
    const text = `Hello Fashion Look! I'm interested in your ${service} service. Could you tell me more?`;
    window.open(`https://wa.me/919930724040?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">What We Craft</p>
          <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase">
            Bespoke Services
          </h2>
          <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative bg-atelier-soft border border-ivory/5 overflow-hidden hover:border-gold/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-72 md:h-80 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-gold/30 px-3 py-1">
                  <span className="text-xs tracking-widest text-gold font-medium">From {service.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h3 className="text-xl font-serif text-ivory mb-3 tracking-wide">{service.title}</h3>
                <p className="text-sm text-ivory/50 leading-relaxed mb-6 font-light">{service.desc}</p>
                <button
                  onClick={() => handleWhatsApp(service.title)}
                  className="text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors group/btn flex items-center gap-2"
                >
                  <span>Enquire Now</span>
                  <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
