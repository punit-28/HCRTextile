// import type { Metadata } from "next";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "./context/CurrencyContext";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Basic Meta
  title: "HCR Textile | Authentic Bagru Hand Block Printed Sarees & Suits",
  description:
    "Discover authentic Bagru hand block printed sarees, suits & dupattas. Pure cotton ethnic wear crafted by skilled artisans using traditional Rajasthani techniques. Heritage craft since 2024.",

  // Keywords for SEO
  keywords: [
    "Bagru print",
    "hand block printed sarees",
    "Bagru sarees",
    "traditional Rajasthani attire",
    "pure cotton sarees",
    "handcrafted suits",
    "Bagru dupattas",
    "ethnic wear India",
    "heritage textile",
    "Rajasthan hand block printing",
    "natural dye fabrics",
    "artisan craft",
    "HCR Textile",
    "Bagru printing",
    "block print suits",
    "cotton suits online",
    "Rajasthani traditional wear",
    "handmade sarees",
    "Bagru design",
    "ethnic collection",
    "dosaya textiles",
    "hand block printing",
    "heritage fashion",
    "Indian ethnic wear",
    "Bagru cotton sarees",
    "handcrafted dupattas",
    "traditional Indian textiles",
    "Rajasthani heritage clothing",
    "dosaya hand block prints",
  ],
  openGraph: {
    title: "HCR Textile - Authentic Bagru Hand Block Printed Ethnic Wear",
    description:
      "Explore our collection of handcrafted Bagru printed sarees, suits & dupattas. Pure cotton, natural dyes, traditional Rajasthani artistry.",
    type: "website",
    url: "https://hcrtextile.in",
    siteName: "HCR Textile",
    locale: "en_IN",
    images: [
      {
        url: "https://res.cloudinary.in/dzyhjgtji/image/upload/v1783058410/hero_1_n33olr.png",
        width: 1200,
        height: 630,
        alt: "HCR Textile - Bagru Hand Block Printed Collection",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "HCR Textile - Authentic Bagru Hand Block Printed Wear",
    description:
      "Handcrafted Bagru printed sarees, suits & dupattas. Pure cotton, traditional Rajasthani block printing. Heritage textile since 2024.",
    images: [
      "https://res.cloudinary.in/dzyhjgtji/image/upload/v1783058410/hero_1_n33olr.png",
    ],
    creator: "@hcrtextile",
    site: "@hcrtextile",
  },

  // Additional Meta
  applicationName: "HCR Textile",
  generator: "Next.js",
  authors: [{ name: "HCR Textile", url: "https://hcrtextile.in" }],
  creator: "HCR Textile",
  publisher: "HCR Textile",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  // Robots & Crawlers
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "your-google-verification-code",
  },

  // Canonical URL
  alternates: {
    canonical: "https://hcrtextile.in",
    languages: {
      "en-US": "https://hcrtextile.in/en",
      "hi-IN": "https://hcrtextile.in/hi",
    },
  },

  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
  },
  category: "Fashion",
  classification: "Ethnic Wear, Hand Block Printing, Traditional Textiles",
  manifest: "/manifest.json",
  referrer: "origin-when-cross-origin",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#faf6ef",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CurrencyProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CurrencyProvider>
        </Providers>
      </body>
    </html>
  );
}
