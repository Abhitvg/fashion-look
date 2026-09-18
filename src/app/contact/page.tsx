import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Fashion Look",
  description: "Get in touch with Fashion Look for bespoke tailoring inquiries, appointment bookings, and consultations.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-atelier pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <header className="mb-20 text-center">
          <p className="font-sans text-gold text-sm tracking-[0.2em] uppercase mb-4">
            Get in touch
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory uppercase tracking-wide">
            Contact Us
          </h1>
          <div className="mt-8 h-px w-24 bg-gold mx-auto opacity-30" />
        </header>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-2xl text-ivory tracking-wide uppercase mb-6">Direct Contact</h2>
              <div className="space-y-6">
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                    <MessageCircle className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-sm tracking-widest uppercase text-ivory mb-1">WhatsApp</p>
                    <p className="font-sans text-muted">+91 98765 43210</p>
                  </div>
                </a>
                
                <a href="mailto:contact@fashion-look.in" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                    <Mail className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-sans text-sm tracking-widest uppercase text-ivory mb-1">Email</p>
                    <p className="font-sans text-muted">contact@fashion-look.in</p>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ivory tracking-wide uppercase mb-6">Working Hours</h2>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-sans text-sm tracking-widest uppercase text-ivory mb-1">Open 7 Days</p>
                  <p className="font-sans text-muted">10:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-atelier-soft border border-white/5 p-8 rounded-sm">
            <h2 className="font-serif text-2xl text-ivory tracking-wide uppercase mb-6">Visit Our Ateliers</h2>
            <p className="font-sans text-muted leading-relaxed mb-8">
              Experience our craftsmanship firsthand. Our primary ateliers are located in Seawoods (Navi Mumbai) and Govandi (Mumbai).
            </p>
            <div className="space-y-4">
              <Button asChild className="w-full bg-gold hover:bg-gold-light text-atelier font-sans tracking-widest uppercase rounded-none">
                <Link href="/book">Book an Appointment</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-gold text-gold hover:bg-gold hover:text-atelier font-sans tracking-widest uppercase rounded-none">
                <Link href="/stores">View Store Locations</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
