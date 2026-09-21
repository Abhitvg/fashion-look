'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We begin with a conversation about your lifestyle, preferred silhouettes, and occasions. Explore our curated selection of premium fabrics from global mills.',
  },
  {
    number: '02',
    title: 'Measurement',
    description: 'A master tailor takes exacting measurements, ensuring every contour is accounted for to create a garment that drapes flawlessly.',
  },
  {
    number: '03',
    title: 'Basted Fitting',
    description: 'The first trial. Your garment is temporarily stitched together to perfect the fit, balance, and proportions before final construction.',
  },
  {
    number: '04',
    title: 'Final Delivery',
    description: 'Your finished garment is ready. We ensure all final details are pristine, delivering a piece of wearable art crafted specifically for you.',
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-24 md:py-32 bg-background border-t border-ivory/5">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">The Journey</p>
          <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider uppercase">
            Our Bespoke Process
          </h2>
          <div className="h-px w-16 bg-gold/40 mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-6 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-px bg-gold/20" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Step Circle */}
              <div className="w-14 h-14 rounded-full bg-atelier-dark border border-gold/30 flex items-center justify-center mb-8 relative z-10 group-hover:border-gold transition-colors duration-500">
                <span className="text-sm font-serif text-gold">{step.number}</span>
                
                {/* Connecting Line (Mobile) */}
                {i !== STEPS.length - 1 && (
                  <div className="lg:hidden absolute top-14 left-1/2 -translate-x-1/2 w-px h-12 bg-gold/20" />
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-serif text-ivory tracking-wide mb-4">
                {step.title}
              </h3>
              <p className="text-sm text-ivory/50 leading-relaxed font-light max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
