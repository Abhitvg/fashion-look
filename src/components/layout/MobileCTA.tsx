"use client";

import Link from "next/link";
import { MessageCircle, Calendar } from "lucide-react";

export function MobileCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-atelier border-t border-white/10 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-2 h-16">
        <a
          href="https://wa.me/919876543210?text=Hello%20Fashion%20Look,%20I'd%20like%20to%20know%20more%20about%20your%20tailoring%20services."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-ivory hover:text-gold transition-colors font-sans text-sm tracking-widest uppercase"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
        <Link
          href="/book"
          className="flex items-center justify-center gap-2 bg-ivory text-atelier hover:bg-gold transition-colors font-sans text-sm tracking-widest uppercase font-semibold"
        >
          <Calendar className="w-4 h-4" />
          <span>Book</span>
        </Link>
      </div>
    </div>
  );
}
