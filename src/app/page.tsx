import Link from "next/link";
import {
  FileImage,
  Shrink,
  ImageDown,
  RefreshCw,
  Crop,
  RotateCw,
  Ruler,
  IdCard,
  Instagram,
  ArrowRight,
} from "lucide-react";
import JsonLd from "@/components/JsonLd";
import {
  softwareAppSchema,
} from "@/lib/schemas";
import { siteName, siteDescription } from "@/lib/seo";

const featuredTools = [
  {
    title: "Compress Image",
    description: "Reduce image file size while maintaining quality",
    href: "/tools/compress-image",
    icon: Shrink,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Compress to 100KB",
    description: "Compress images to exactly 100KB",
    href: "/tools/compress-image-to-100kb",
    icon: ImageDown,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "WebP to PNG",
    description: "Convert WebP images to PNG format",
    href: "/tools/webp-to-png",
    icon: RefreshCw,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "PNG to WebP",
    description: "Convert PNG images to WebP format",
    href: "/tools/png-to-webp",
    icon: FileImage,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Resize Image",
    description: "Change image dimensions to any size",
    href: "/tools/resize-image",
    icon: Ruler,
    color: "bg-pink-100 text-pink-600",
  },
  {
    title: "Crop Image",
    description: "Crop your photos to any aspect ratio",
    href: "/tools/crop-image",
    icon: Crop,
    color: "bg-teal-100 text-teal-600",
  },
  {
    title: "Rotate Image",
    description: "Rotate and flip your images",
    href: "/tools/rotate-image",
    icon: RotateCw,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Passport Photo",
    description: "Create passport and visa photos",
    href: "/tools/passport-photo-maker",
    icon: IdCard,
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Instagram Resizer",
    description: "Resize images for Instagram posts and stories",
    href: "/tools/instagram-image-resizer",
    icon: Instagram,
    color: "bg-yellow-100 text-yellow-600",
  },
];

const compressTargetTools = [
  { target: "20KB", href: "/tools/compress-image-to-20kb" },
  { target: "50KB", href: "/tools/compress-image-to-50kb" },
  { target: "100KB", href: "/tools/compress-image-to-100kb" },
  { target: "200KB", href: "/tools/compress-image-to-200kb" },
  { target: "1MB", href: "/tools/compress-image-to-1mb" },
];

const convertTools = [
  { from: "WebP", to: "PNG", href: "/tools/webp-to-png" },
  { from: "PNG", to: "WebP", href: "/tools/png-to-webp" },
  { from: "HEIC", to: "JPG", href: "/tools/heic-to-jpg" },
  { from: "AVIF", to: "JPG", href: "/tools/avif-to-jpg" },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={softwareAppSchema({
          name: siteName,
          description: siteDescription,
          operatingSystem: "Web",
          applicationCategory: "Multimedia",
          offers: { price: "0", priceCurrency: "USD" },
        })}
      />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] leading-tight mb-4">
          Free Online Image Tools
        </h1>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto mb-8">
          Compress, convert, resize, and edit your images directly in your
          browser. No uploads, no sign-ups, 100% free and private.
        </p>
        <Link
          href="/tools/compress-image"
          className="inline-flex items-center gap-2 bg-[var(--color-primary-600)] text-white px-8 py-3.5 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors shadow-lg shadow-blue-500/20"
        >
          <Shrink className="w-5 h-5" />
          Start Compressing Images
          <ArrowRight className="w-4 h-4" />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1">🔒 No uploads</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">⚡ Instant processing</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span className="flex items-center gap-1">💯 Free forever</span>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">All Image Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="block p-5 border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary-300)] hover:shadow-md transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${tool.color} flex items-center justify-center mb-3`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{tool.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {tool.description}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Compress to Size */}
      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          Compress Images to Exact Size
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-8">
          Need your image at a specific file size? Choose your target below.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {compressTargetTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-6 py-3 border border-[var(--color-border)] rounded-xl font-medium text-sm hover:border-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)] transition-all"
            >
              Compress to {tool.target}
            </Link>
          ))}
        </div>
      </section>

      {/* Convert Tools */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-4">
          Image Format Converter
        </h2>
        <p className="text-center text-[var(--color-text-muted)] mb-8">
          Convert images between popular formats instantly.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {convertTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-6 py-3 border border-[var(--color-border)] rounded-xl font-medium text-sm hover:border-[var(--color-primary-300)] hover:bg-[var(--color-primary-50)] transition-all"
            >
              {tool.from} to {tool.to}
            </Link>
          ))}
        </div>
      </section>

      {/* Why ImageToolkit */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center mb-8">
          Why ImageToolkit?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-[var(--color-border)] rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center mx-auto mb-4">
              🔒
            </div>
            <h3 className="font-semibold mb-2">100% Private</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              Your images never leave your device. All processing happens
              locally in your browser.
            </p>
          </div>
          <div className="p-6 border border-[var(--color-border)] rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center mx-auto mb-4">
              ⚡
            </div>
            <h3 className="font-semibold mb-2">Fast & Simple</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              No sign-ups, no uploads, no waiting. Just upload, edit, and
              download in seconds.
            </p>
          </div>
          <div className="p-6 border border-[var(--color-border)] rounded-xl text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center mx-auto mb-4">
              💯
            </div>
            <h3 className="font-semibold mb-2">Completely Free</h3>
            <p className="text-sm text-[var(--color-text-muted)]">
              No hidden fees, no premium tiers, no limits. All tools are free
              forever.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
