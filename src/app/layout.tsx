import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileCTA } from "@/components/layout/MobileCTA";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Fashion Look | Premium Men's Tailoring & Cloth Stitching",
  description: "Fashion Look offers bespoke men's tailoring, premium fabrics, wedding wear, sherwanis, custom stitching and personalized tailoring services in Navi Mumbai.",
  metadataBase: new URL("https://www.fashion-look.in"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Fashion Look | Premium Men's Tailoring",
    description: "Precisely Yours Since 1998. Experience the pinnacle of Indian bespoke tailoring, where every stitch tells your story.",
    url: "https://www.fashion-look.in",
    siteName: "Fashion Look",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fashion Look | Premium Men's Tailoring",
    description: "Precisely Yours Since 1998.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased selection:bg-gold/30 selection:text-gold-light min-h-screen flex flex-col pb-16 md:pb-0`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
