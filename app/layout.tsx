import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const SITE_URL = "https://alesia-nails-szczecin.pl";
const TITLE = "Alesia Nails Szczecin — manicure i stylizacja paznokci";
const DESCRIPTION =
  "Delikatny manicure, precyzyjna stylizacja i kobiecy detal w centrum Szczecina. Manicure hybrydowy, żel, akryl, przedłużanie, pedicure i zdobienia. Rezerwacja przez Instagram.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Alesia Nails Szczecin",
  },
  description: DESCRIPTION,
  keywords: [
    "manicure Szczecin",
    "paznokcie Szczecin",
    "stylizacja paznokci Szczecin",
    "manicure hybrydowy Szczecin",
    "przedłużanie paznokci Szczecin",
    "pedicure Szczecin",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "Alesia Nails Szczecin",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F8F3ED",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
