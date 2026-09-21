'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function CraftsmanshipStory() {
  return (
    <section className="py-24 md:py-32 bg-atelier-soft border-y border-ivory/5">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[550px] overflow-hidden"
          >
            <Image
              src="/images/craftsmanship/detail.jpg"
              alt="Master tailor hand-stitching a buttonhole"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 border border-gold/10" />
            
            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-gold/30" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-gold/30" />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-xs tracking-[0.3em] uppercase text-gold/70 mb-4">Our Heritage</p>
            <h2 className="text-3xl md:text-4xl font-serif text-ivory tracking-wider leading-tight mb-8">
              The Art of<br />
              <span className="text-gold">Precision Tailoring</span>
            </h2>

            <div className="space-y-5 text-ivory/60 text-sm md:text-base leading-relaxed font-light">
              <p>
                Since 1998, Fashion Look has been crafting garments that speak to the individual. 
                Every suit begins with a conversation — understanding not just your measurements, 
                but your lifestyle, your occasions, and the impression you wish to make.
              </p>
              <p>
                Our master tailors bring decades of experience to every stitch. From hand-finished 
                buttonholes to perfectly balanced lapels, we honour the traditions of Indian tailoring 
                while embracing modern silhouettes and international fabrics.
              </p>
              <p>
                With two ateliers in Navi Mumbai — at Seawoods and Govandi — we serve corporate 
                professionals, grooms, and discerning gentlemen who believe that how you dress 
                is an extension of who you are.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-8">
              <div>
                <div className="text-2xl font-serif text-gold">Tafshir Shaikh</div>
                <div className="text-xs tracking-[0.2em] uppercase text-ivory/40 mt-1">Master Tailor & Founder</div>
              </div>
              <div className="h-12 w-px bg-gold/20" />
              <div className="text-xs tracking-[0.15em] text-ivory/40 leading-relaxed">
                &ldquo;Every garment tells<br />a story. Ours tell yours.&rdquo;
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
