import Link from "next/link";
import { getToolMeta } from "@/lib/seo";
import {
  Shrink,
  ImageDown,
  RefreshCw,
  FileImage,
  Ruler,
  Crop,
  RotateCw,
  IdCard,
  Instagram,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  "compress-image": Shrink,
  "compress-image-to-100kb": ImageDown,
  "compress-image-to-20kb": ImageDown,
  "compress-image-to-50kb": ImageDown,
  "compress-image-to-200kb": ImageDown,
  "compress-image-to-1mb": ImageDown,
  "compress-jpeg": Shrink,
  "compress-png": Shrink,
  "webp-to-png": RefreshCw,
  "png-to-webp": FileImage,
  "heic-to-jpg": RefreshCw,
  "avif-to-jpg": RefreshCw,
  "resize-image": Ruler,
  "crop-image": Crop,
  "rotate-image": RotateCw,
  "passport-photo-maker": IdCard,
  "instagram-image-resizer": Instagram,
};

export const metadata = {
  title: "All Free Online Image Tools | PixelMint",
  description:
    "Browse all free online image tools. Compress, convert, resize, crop, and edit images directly in your browser with no uploads.",
};

const categories = [
  {
    name: "Image Compression",
    slugs: [
      "compress-image",
      "compress-image-to-20kb",
      "compress-image-to-50kb",
      "compress-image-to-100kb",
      "compress-image-to-200kb",
      "compress-image-to-1mb",
      "compress-jpeg",
      "compress-png",
    ],
  },
  {
    name: "Image Conversion",
    slugs: ["webp-to-png", "png-to-webp", "heic-to-jpg", "avif-to-jpg"],
  },
  {
    name: "Image Editing",
    slugs: ["resize-image", "crop-image", "rotate-image"],
  },
  {
    name: "Photo Tools",
    slugs: ["passport-photo-maker", "instagram-image-resizer"],
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        All Image Tools
      </h1>
      <p className="text-center text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto">
        Browse our complete collection of free online image tools. All tools work
        entirely in your browser.
      </p>

      {categories.map((cat) => (
        <section key={cat.name} className="mb-12">
          <h2 className="text-xl font-bold mb-4">{cat.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cat.slugs.map((slug) => {
              const meta = getToolMeta(slug);
              const Icon = iconMap[slug] || Shrink;
              if (!meta) return null;
              return (
                <Link
                  key={slug}
                  href={`/tools/${slug}`}
                  className="flex items-center gap-3 p-4 border border-[var(--color-border)] rounded-xl hover:border-[var(--color-primary-300)] hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-100)] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{meta.h1}</h3>
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-1">
                      {meta.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
