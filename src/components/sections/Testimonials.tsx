'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rajesh Mehta',
    role: 'Corporate Executive, Mumbai',
    text: 'Fashion Look tailored my entire wedding wardrobe — sherwani, reception suit, and three-piece for the sangeet. Every single piece fit like a dream. Their attention to detail is unmatched.',
    rating: 5,
  },
  {
    name: 'Arjun Kapoor',
    role: 'Entrepreneur, Navi Mumbai',
    text: 'I have been getting my suits stitched here for 8 years now. The quality of fabric selection and the precision of fit keeps me coming back. No off-the-rack brand can match this.',
    rating: 5,
  },
  {
    name: 'Sameer Joshi',
    role: 'Advocate, Seawoods',
    text: 'Ordered 20 safari suits for our law firm as corporate gifts. Tafshir bhai personally ensured each one was perfect. The gift packaging was a beautiful bonus. Highly recommended.',
    rating: 5,
  },
  {
    name: 'Vikram Desai',
    role: 'IT Professional, Kharghar',
    text: 'My first bespoke suit from Fashion Look changed how I think about clothing. The fabric consultation alone was an education. Now I understand why people say "bespoke is different."',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      className="py-24 md:py-32 bg-atelier-soft border-y border-ivory/5"
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">Client Stories</p>
          <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase">
            Words of Trust
          </h2>
          <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />

          {/* Google Reviews aggregate badge */}
          <motion.a
            href="https://maps.app.goo.gl/wY4L4UaD1Zf9Fh3N6"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 mt-8 px-6 py-3 border border-gold/20 hover:border-gold/50 transition-colors duration-300 group"
            itemProp="aggregateRating"
            itemScope
            itemType="https://schema.org/AggregateRating"
          >
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="text-sm text-ivory font-light" itemProp="ratingValue">4.9</span>
            <span className="text-ivory/30 text-xs">·</span>
            <span className="text-xs text-ivory/50 tracking-wide">
              <span itemProp="reviewCount">200</span>+ Google Reviews
            </span>
            <ExternalLink size={10} className="text-gold/50 group-hover:text-gold transition-colors" />
            <meta itemProp="bestRating" content="5" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="p-8 md:p-10 border border-ivory/5 bg-background hover:border-gold/20 transition-all duration-500 relative group"
              itemProp="review"
              itemScope
              itemType="https://schema.org/Review"
            >
              {/* Quote mark */}
              <div className="absolute top-6 right-8 text-6xl font-serif text-gold/10 leading-none select-none">&ldquo;</div>

              {/* Stars */}
              <div
                className="flex gap-1 mb-5"
                itemProp="reviewRating"
                itemScope
                itemType="https://schema.org/Rating"
              >
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
                <meta itemProp="ratingValue" content={String(t.rating)} />
                <meta itemProp="bestRating" content="5" />
              </div>

              <p className="text-sm md:text-base text-ivory/60 leading-relaxed font-light mb-8 relative z-10" itemProp="reviewBody">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="text-sm font-serif text-gold">{t.name.charAt(0)}</span>
                </div>
                <div itemProp="author" itemScope itemType="https://schema.org/Person">
                  <div className="text-sm font-medium text-ivory" itemProp="name">{t.name}</div>
                  <div className="text-xs text-ivory/40 tracking-wide">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
