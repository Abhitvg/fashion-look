import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import Script from 'next/script';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Devanagari, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "700"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  variable: "--font-noto-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "700"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: "Fashion Look | Bespoke Tailoring in Navi Mumbai",
    description: "Precisely yours since 1998. Master tailors in Seawoods, Navi Mumbai crafting bespoke suits, sherwanis, and luxury fabric gifting.",
    alternates: {
      canonical: `https://www.fashion-look.in/${locale}`,
      languages: {
        'en': 'https://www.fashion-look.in/en',
        'hi': 'https://www.fashion-look.in/hi',
        'mr': 'https://www.fashion-look.in/mr',
        'ur': 'https://www.fashion-look.in/ur',
        'x-default': 'https://www.fashion-look.in/en',
      },
    },
    openGraph: {
      title: "Fashion Look | Bespoke Tailors & Luxury Gifting – Navi Mumbai",
      description: "Mumbai's premier bespoke tailoring atelier since 1998. Instant price calculator, custom suits & sherwanis, luxury fabric gifts. Home visits available.",
      type: "website",
      locale: locale,
      url: `https://www.fashion-look.in/${locale}`,
      siteName: "Fashion Look",
    },
    twitter: {
      card: "summary_large_image",
      title: "Fashion Look | Bespoke Tailors & Luxury Gifting – Navi Mumbai",
      description: "Bespoke suits, sherwanis & luxury fabric gifting since 1998. Instant price calculator. Home visits available across Navi Mumbai.",
    }
  };
}

const getJsonLd = (locale: string) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ClothingStore", "Organization"],
      "@id": "https://www.fashion-look.in/#business",
      "name": "Fashion Look – Seawoods Atelier",
      "legalName": "Fashion Look Tailors",
      "description": "Navi Mumbai's premier bespoke tailoring atelier since 1998. Custom suits, sherwanis, Pathani suits, tuxedos, safari suits, and luxury fabric gifting.",
      "url": `https://www.fashion-look.in/${locale}`,
      "image": "https://www.fashion-look.in/images/storeimage.png",
      "logo": "https://www.fashion-look.in/images/logo.png",
      "telephone": "+918108014945",
      "foundingDate": "1998",
      "priceRange": "₹₹₹",
      "knowsAbout": [
        "Bespoke Tailoring",
        "Menswear",
        "Custom Suits",
        "Sherwanis",
        "Corporate Gifting",
        "Luxury Fabrics",
        "Raymond Fabrics"
      ],
      "brand": {
        "@type": "Brand",
        "name": "Fashion Look"
      },
      "hasMap": "https://maps.app.goo.gl/wY4L4UaD1Zf9Fh3N6",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Shop No. 5, Plot No. 144, Seawoods West, Sector 44",
        "addressLocality": "Navi Mumbai",
        "addressRegion": "Maharashtra",
        "postalCode": "400706",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "19.0197",
        "longitude": "73.0100"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
          "opens": "10:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "11:00",
          "closes": "19:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "200",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {"@type": "Person", "name": "Rajesh Mehta"},
          "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
          "reviewBody": "Fashion Look tailored my entire wedding wardrobe. Every single piece fit like a dream. Their attention to detail is unmatched."
        },
        {
          "@type": "Review",
          "author": {"@type": "Person", "name": "Sameer Joshi"},
          "reviewRating": {"@type": "Rating", "ratingValue": "5", "bestRating": "5"},
          "reviewBody": "Ordered 20 safari suits for our law firm as corporate gifts. Tafshir bhai personally ensured each one was perfect."
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Bespoke Tailoring Services",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Bespoke Formal Suit"}, "priceCurrency": "INR", "price": "7500"},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Sherwani"}, "priceCurrency": "INR", "price": "12000"},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Tuxedo"}, "priceCurrency": "INR", "price": "15000"},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Pathani Suit"}, "priceCurrency": "INR", "price": "4500"},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Safari Suit"}, "priceCurrency": "INR", "price": "5500"},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Luxury Fabric Gift Box"}, "priceCurrency": "INR", "price": "2500"}
        ]
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where can I get a sherwani custom-stitched in Navi Mumbai?",
          "acceptedAnswer": {"@type": "Answer", "text": "Fashion Look Tailors in Seawoods (Sector 44) specializes in custom-stitched groom sherwanis, silk and velvet sherwanis, and royal wedding outfits. Our master tailors ensure a perfect fit with personalized measurements and high-quality fabrics."}
        },
        {
          "@type": "Question",
          "name": "Best bespoke tailor for a home visit in Seawoods?",
          "acceptedAnswer": {"@type": "Answer", "text": "Fashion Look Tailors offers complimentary home visit bespoke tailoring services in Seawoods, Kharghar, Vashi, and across Navi Mumbai. Our master tailors visit your home or office for precise measurements and fabric selection."}
        },
        {
          "@type": "Question",
          "name": "How much does a custom suit cost in Navi Mumbai?",
          "acceptedAnswer": {"@type": "Answer", "text": "Our transparent pricing for bespoke formal suits starts at ₹7,500. Premium options like Tuxedos start at ₹15,000, and Sherwanis at ₹12,000. You can use our online Atelier Calculator for exact upfront pricing."}
        },
        {
          "@type": "Question",
          "name": "Which tailor does corporate fabric gifting in Mumbai?",
          "acceptedAnswer": {"@type": "Answer", "text": "We regularly handle corporate fabric gifting and Diwali gift boxes for clients in Mumbai and Navi Mumbai. We offer luxury tie and fabric hampers, executive suiting combos, and branded bulk orders."}
        },
        {
          "@type": "Question",
          "name": "Who are the top wedding outfit tailors near Seawoods?",
          "acceptedAnswer": {"@type": "Answer", "text": "Established in 1998, Fashion Look Tailors in Seawoods West is a top-rated bespoke tailor for wedding outfits. We craft groom sherwanis, three-piece suits, and sangeet outfits, backed by hundreds of 5-star Google reviews."}
        },
        {
          "@type": "Question",
          "name": "How long does a bespoke suit take at Fashion Look?",
          "acceptedAnswer": {"@type": "Answer", "text": "A bespoke suit typically takes 3–4 weeks from consultation to final delivery. This includes fabric selection, measurement, basted fitting, and final finishing. Rush orders may be accommodated for select garments — WhatsApp us to discuss."}
        },
        {
          "@type": "Question",
          "name": "Where do Fashion Look fabrics come from?",
          "acceptedAnswer": {"@type": "Answer", "text": "We source from India's finest mills — Raymond, Gwalior, and Vimal — as well as select Italian and British woollen mills for premium bespoke commissions. We carry over 500 fabric swatches across seasons and weights."}
        },
        {
          "@type": "Question",
          "name": "What is your re-stitching and warranty policy?",
          "acceptedAnswer": {"@type": "Answer", "text": "Every garment we stitch carries a 6-month craftsmanship warranty. If any seam, button, or finishing detail fails under normal wear, we re-stitch it free of charge. Minor alterations for fit within the first 30 days are also complimentary."}
        }
      ]
    }
  ]
});

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ur' ? 'rtl' : 'ltr';
  
  let fontClass = `${geistSans.variable} ${geistMono.variable} font-sans`;
  if (locale === 'hi' || locale === 'mr') {
    fontClass = `${notoSansDevanagari.variable} font-devanagari`;
  } else if (locale === 'ur') {
    fontClass = `${notoNastaliqUrdu.variable} font-nastaliq`;
  }

  return (
    <html lang={locale} dir={dir} className="scroll-smooth">
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-WPGKRLGNN7`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WPGKRLGNN7', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(locale)) }}
        />
      </head>
      <body className={`${fontClass} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
