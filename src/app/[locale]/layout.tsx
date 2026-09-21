import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
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

export const metadata: Metadata = {
  title: "Fashion Look | Premium Bespoke Tailoring in Navi Mumbai",
  description: "Bespoke suits, sherwanis, and luxury fabric gifting in Seawoods and Govandi. Book a master tailor home visit or visit our atelier.",
  openGraph: {
    title: "Fashion Look | Premium Bespoke Tailoring in Navi Mumbai",
    description: "Bespoke suits, sherwanis, and luxury fabric gifting in Seawoods and Govandi. Book a master tailor home visit or visit our atelier.",
    url: "https://www.fashion-look.in",
    siteName: "Fashion Look",
    images: [
      {
        url: "https://www.fashion-look.in/images/hero/atelier.jpg",
        width: 1200,
        height: 630,
        alt: "Fashion Look Bespoke Tailoring",
      }
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Look | Premium Bespoke Tailoring",
    description: "Bespoke suits, sherwanis, and luxury fabric gifting in Seawoods and Govandi.",
    images: ["https://www.fashion-look.in/images/hero/atelier.jpg"],
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "TailorShop"],
  "name": "Fashion Look",
  "image": "https://www.fashion-look.in/images/hero/atelier.jpg",
  "description": "Premium bespoke tailoring in Navi Mumbai. Specialists in suits, sherwanis, and luxury fabric gifting.",
  "url": "https://www.fashion-look.in",
  "telephone": "+918108014945",
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "Shop No. 5, Fashion Look, Plot No. 144, Seawoods West, Sector 44, Seawoods",
      "addressLocality": "Navi Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400706",
      "addressCountry": "IN"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "Near Govandi Station, Deonar",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400088",
      "addressCountry": "IN"
    }
  ]
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as any)) {
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
    <html lang={locale} dir={dir}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
