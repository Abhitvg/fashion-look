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
  title: "Fashion Look",
  description: "Premium Bespoke Tailoring in Navi Mumbai",
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
      <body className={`${fontClass} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
