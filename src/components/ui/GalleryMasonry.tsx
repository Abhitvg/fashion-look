"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "@/content/gallery";

export function GalleryMasonry() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  return (
    <>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {galleryImages.map((image, idx) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
            className="relative break-inside-avoid cursor-pointer group"
            onClick={() => setSelectedImage(idx)}
          >
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src={image.url}
                alt={image.caption || "Gallery Image"}
                width={800}
                height={image.height || 600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            </div>
            {image.category && (
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-sans text-xs tracking-widest uppercase text-muted">
                  {image.category}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-atelier/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-ivory/50 hover:text-ivory transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-ivory/50 hover:text-ivory transition-colors z-10 hidden md:block p-4"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-ivory/50 hover:text-ivory transition-colors z-10 hidden md:block p-4"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl max-h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] md:h-[80vh]">
                <Image
                  src={galleryImages[selectedImage].url}
                  alt={galleryImages[selectedImage].caption || "Gallery View"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              
              <div className="mt-6 text-center">
                {galleryImages[selectedImage].category && (
                  <p className="font-sans text-xs tracking-widest uppercase text-gold mb-2">
                    {galleryImages[selectedImage].category}
                  </p>
                )}
                {galleryImages[selectedImage].caption && (
                  <p className="font-serif text-xl md:text-2xl text-ivory">
                    {galleryImages[selectedImage].caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
