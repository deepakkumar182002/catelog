import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://experiencelife.design"),
  title: "EXPERIENCE LIFE | Furniture for Every Space",
  description:
    "Thoughtful designs. Functional spaces. Lasting quality. Architectural furniture crafted for modern workspaces, homes and commercial environments.",
  keywords: [
    "Experience Life",
    "Executive Work Desk",
    "Architectural Furniture",
    "Modern Office Desks",
    "Commercial Furniture",
    "Custom Furniture Manufacturer",
    "Interior Design Furniture",
    "Minimal Desk",
    "Z-Frame Desk",
  ],
  authors: [{ name: "Experience Life Studio" }],
  creator: "Experience Life",
  publisher: "Experience Life",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "EXPERIENCE LIFE | Furniture for Every Space",
    description:
      "Thoughtful designs. Functional spaces. Lasting quality. Architectural furniture crafted for modern workspaces, homes and commercial environments.",
    url: "https://experiencelife.design",
    siteName: "Experience Life",
    images: [
      {
        url: "/images/lifestyle/hero-editorial.png",
        width: 1200,
        height: 630,
        alt: "Experience Life Architectural Furniture Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EXPERIENCE LIFE | Furniture for Every Space",
    description:
      "Thoughtful designs. Functional spaces. Lasting quality. Architectural furniture crafted for modern workspaces, homes and commercial environments.",
    images: ["/images/lifestyle/hero-editorial.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-stone-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
