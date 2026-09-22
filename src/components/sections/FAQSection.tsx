'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { openWhatsApp } from '@/lib/analytics';

const FAQS = [
  {
    question: 'Where can I get a sherwani custom-stitched in Navi Mumbai?',
    answer: 'Fashion Look Tailors in Seawoods (Sector 44) specializes in custom-stitched groom sherwanis, silk and velvet sherwanis, and royal wedding outfits. Our master tailors ensure a perfect fit with personalized measurements and high-quality fabrics.',
  },
  {
    question: 'Best bespoke tailor for a home visit in Seawoods?',
    answer: 'Fashion Look Tailors offers complimentary home visit bespoke tailoring services in Seawoods, Kharghar, Vashi, and across Navi Mumbai. Our master tailors visit your home or office for precise measurements and fabric selection.',
  },
  {
    question: 'How much does a custom suit cost in Navi Mumbai?',
    answer: 'Our transparent pricing for bespoke formal suits starts at ₹7,500. Premium options like Tuxedos start at ₹15,000, and Sherwanis at ₹12,000. You can use our online Atelier Calculator for exact upfront pricing.',
  },
  {
    question: 'Which tailor does corporate fabric gifting in Mumbai?',
    answer: 'We regularly handle corporate fabric gifting and Diwali gift boxes for clients in Mumbai and Navi Mumbai. We offer luxury tie and fabric hampers, executive suiting combos, and branded bulk orders.',
  },
  {
    question: 'Who are the top wedding outfit tailors near Seawoods?',
    answer: 'Established in 1998, Fashion Look Tailors in Seawoods West is a top-rated bespoke tailor for wedding outfits. We craft groom sherwanis, three-piece suits, and sangeet outfits, backed by hundreds of 5-star Google reviews.',
  },
  {
    question: 'How long does a bespoke suit take at Fashion Look?',
    answer: 'A bespoke suit typically takes 3–4 weeks from consultation to final delivery. This includes fabric selection, measurement, basted fitting, and finishing. Rush orders for select garments may be accommodated — WhatsApp us to discuss.',
  },
  {
    question: 'Where do Fashion Look fabrics come from?',
    answer: "We source from India's finest mills — Raymond, Gwalior, and Vimal — as well as select Italian and British woollen mills for premium commissions. We carry 500+ fabric swatches across seasons, weights, and occasions.",
  },
  {
    question: 'What is your warranty and re-stitching policy?',
    answer: 'Every garment we craft carries a 6-month craftsmanship warranty. If any seam, button, or finishing detail fails under normal wear, we re-stitch it free of charge. Minor fit alterations within the first 30 days are also complimentary.',
  }
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="border-b border-ivory/8"
      itemProp="mainEntity"
      itemScope
      itemType="https://schema.org/Question"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left gap-6 group"
        aria-expanded={open}
      >
        <span
          className="text-sm md:text-base font-light text-ivory group-hover:text-gold transition-colors duration-300 tracking-wide"
          itemProp="name"
        >
          {faq.question}
        </span>
        <span className="flex-shrink-0 w-7 h-7 border border-ivory/15 group-hover:border-gold/40 flex items-center justify-center transition-colors duration-300">
          {open
            ? <Minus size={14} className="text-gold" />
            : <Plus size={14} className="text-ivory/50 group-hover:text-gold transition-colors" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
            itemProp="acceptedAnswer"
            itemScope
            itemType="https://schema.org/Answer"
          >
            <p
              className="text-sm text-ivory/50 font-light leading-relaxed pb-6 pr-12"
              itemProp="text"
            >
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section
      id="faq"
      className="py-24 md:py-32 bg-atelier-soft border-t border-ivory/5"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <p className="text-xs tracking-[0.3em] text-gold uppercase mb-4">Know Before You Visit</p>
            <h2 className="text-4xl md:text-5xl font-serif tracking-wider uppercase">
              Common Questions
            </h2>
            <div className="w-16 h-px bg-gold/50 mt-8" />
          </motion.div>

          {/* FAQ Accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <FAQItem key={faq.question} faq={faq} index={i} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-ivory/5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <p className="text-sm text-ivory/40 font-light flex-grow">
              Still have a question? We typically reply within 30 minutes on WhatsApp.
            </p>
            <button
              onClick={() => openWhatsApp("https://wa.me/918108014945?text=Hi%20Fashion%20Look!%20I%20have%20a%20question.", 'whatsapp_cta_faq')}
              className="flex-shrink-0 px-6 py-3 border border-ivory/20 text-xs tracking-widest uppercase hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Ask on WhatsApp →
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
