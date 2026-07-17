import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "./context/CurrencyContext";
import Navbar from "../component/navbar";
import Footer from "../component/footer";
import Providers from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HCR Textile",
  description: "Hand Block Printed · Pure Cotton · Heritage Craft",
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
