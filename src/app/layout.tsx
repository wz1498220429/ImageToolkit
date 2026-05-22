import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "PixelMint - Free Online Image Tools",
    template: "%s | PixelMint",
  },
  description: "Free online image tools. Compress, convert, resize, and edit images directly in your browser. No uploads, no sign-ups, 100% free.",
  keywords: ["image compressor", "image resizer", "webp converter", "png compressor", "passport photo maker", "free online tools"],
  openGraph: {
    title: "PixelMint - Free Online Image Tools",
    description: "Compress, convert, resize, and edit images directly in your browser. No uploads, no sign-ups, 100% free.",
    type: "website",
    siteName: "PixelMint",
  },
  twitter: {
    card: "summary_large_image",
    title: "PixelMint - Free Online Image Tools",
    description: "Compress, convert, resize, and edit images directly in your browser. No uploads, no sign-ups, 100% free.",
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
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
