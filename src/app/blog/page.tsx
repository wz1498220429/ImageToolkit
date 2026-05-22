import Link from "next/link";

export const metadata = {
  title: "Blog | ImageToolkit",
  description:
    "Image optimization tips, guides, and best practices. Learn how to compress, convert, and optimize images for web, social media, and more.",
};

const posts = [
  {
    title: "How to Compress Image to 100KB Online Free — Complete Guide",
    excerpt:
      "Step-by-step guide to compressing images to exactly 100KB. Perfect for passport photos, job applications, and email attachments.",
    date: "May 22, 2026",
    slug: "how-to-compress-image-to-100kb",
    tags: ["compression", "guide"],
  },
  {
    title: "WebP vs PNG vs JPEG: Which Image Format Should You Use?",
    excerpt:
      "A comprehensive comparison of the three most popular image formats. Learn when to use each one for optimal quality and file size.",
    date: "May 22, 2026",
    slug: "webp-vs-png-vs-jpeg",
    tags: ["formats", "comparison"],
  },
  {
    title: "Passport Photo Size Requirements by Country — Complete Guide 2026",
    excerpt:
      "Everything you need to know about passport and visa photo sizes for the US, UK, EU, China, India, Canada, and more.",
    date: "May 22, 2026",
    slug: "passport-photo-size-guide",
    tags: ["passport", "guide"],
  },
  {
    title: "How to Convert JPG to PDF in Browser — Free Online Converter",
    excerpt:
      "Learn how to convert JPG images to PDF documents directly in your browser. No software, no uploads, completely free.",
    date: "May 22, 2026",
    slug: "convert-jpg-to-pdf",
    tags: ["pdf", "converter"],
  },
  {
    title: "How to Convert Image to Base64 Online Free — Developer Guide",
    excerpt:
      "Convert images to Base64 data URIs for embedding in HTML, CSS, or JavaScript. Perfect for developers and web designers.",
    date: "May 22, 2026",
    slug: "convert-image-to-base64",
    tags: ["base64", "developer"],
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        ImageToolkit Blog
      </h1>
      <p className="text-center text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto">
        Tips, guides, and best practices for image optimization, format conversion,
        and online photo editing.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-[var(--color-border)] rounded-2xl hover:shadow-md transition-shadow no-underline text-inherit"
          >
            <time className="text-xs text-[var(--color-text-muted)]">
              {post.date}
            </time>
            <h2 className="text-lg font-bold mt-1 mb-2 text-[var(--color-text)]">
              {post.title}
            </h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              {post.excerpt}
            </p>
            <div className="flex gap-2 mt-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-gray-100 text-xs text-[var(--color-text-muted)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
