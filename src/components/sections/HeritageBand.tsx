'use client';

import { motion } from 'framer-motion';
import CountUp from 'react-countup';

function AnimatedCounter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  return (
    <CountUp 
      end={end} 
      suffix={suffix} 
      duration={duration} 
      enableScrollSpy 
      scrollSpyOnce 
      scrollSpyDelay={100}
      separator=","
    />
  );
}

const STATS = [
  { value: 25, suffix: '+', label: 'Years of Heritage' },
  { value: 50000, suffix: '+', label: 'Garments Crafted' },
  { value: 1, suffix: '', label: 'Atelier in Navi Mumbai' },
  { value: 100, suffix: '%', label: 'Bespoke & Custom' },
];

export default function HeritageBand() {
  return (
    <section id="stats" className="relative py-16 bg-atelier-dark border-y border-gold/10 overflow-hidden">
      {/* Subtle gold shimmer */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(212,175,55,0.03),transparent)] animate-pulse" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-serif text-gold mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-ivory/40 font-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
