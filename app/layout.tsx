import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/cart/CheckoutModal";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteConfig } from "@/config/site";

const displayFont = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
});

const bodyFont = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: `${siteConfig.name} — 3D Baskı Ürünler`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — 3D Baskı Ürünler`,
    description: siteConfig.description,
    type: "website",
    locale: "tr_TR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F1DEC4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">İçeriğe geç</a>
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <CartDrawer />
          <CheckoutModal />
        </CartProvider>
      </body>
    </html>
  );
}
