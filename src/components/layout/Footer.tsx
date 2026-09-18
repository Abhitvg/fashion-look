import Link from "next/link";
import Image from "next/image";
import { contactInfo, desktopNavigation, socialLinks, legalLinks } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-atelier-soft border-t border-gold/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h2 className="font-serif text-ivory text-2xl tracking-wide uppercase">
              Fashion Look
            </h2>
            <div className="space-y-1">
              <p className="text-gold text-sm tracking-widest uppercase font-sans">
                Cloth & Stitching
              </p>
              <p className="text-ivory/60 text-sm tracking-widest uppercase font-sans">
                Precisely Yours Since 1998
              </p>
            </div>
            <Link href="/" className="inline-block relative h-8 w-40 mt-4 opacity-50 hover:opacity-100 transition-opacity">
              <Image
                src="/brand/fashion-look-logo-original.png"
                alt="Fashion Look Monogram"
                fill
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-ivory text-xl tracking-wider uppercase mb-6">Navigation</h3>
            <ul className="space-y-4">
              {desktopNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-ivory/60 hover:text-gold transition-colors text-sm uppercase tracking-widest font-sans"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-ivory text-xl tracking-wider uppercase mb-6">Contact</h3>
            <ul className="flex flex-col gap-4 text-ivory/70 text-sm uppercase tracking-widest font-sans">
              <li>
                <a 
                  href={socialLinks.whatsapp} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors block"
                >
                  WhatsApp
                </a>
                <span className="text-xs text-ivory/40 lowercase tracking-normal">{contactInfo.phone}</span>
              </li>
              <li>
                <a href={`tel:${contactInfo.phone.replace(/\s+/g, "")}`} className="hover:text-gold transition-colors block">
                  Phone
                </a>
              </li>
              <li>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-gold transition-colors block">
                  Email
                </a>
                <span className="text-xs text-ivory/40 lowercase tracking-normal">{contactInfo.email}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-serif text-ivory text-xl tracking-wider uppercase mb-6">Legal</h3>
            <ul className="space-y-4">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-ivory/60 hover:text-gold transition-colors text-sm uppercase tracking-widest font-sans"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gold/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-ivory/40 text-xs tracking-wider uppercase">
            © {new Date().getFullYear()} Fashion Look. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-gold text-xs uppercase tracking-widest">
              Instagram
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-ivory/40 hover:text-gold text-xs uppercase tracking-widest">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
