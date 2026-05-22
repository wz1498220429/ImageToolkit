export const metadata = {
  title: "Blog | PixelMint",
  description:
    "Image optimization tips, guides, and best practices. Learn how to compress, convert, and optimize images for web and social media.",
};

const posts = [
  {
    title: "How to Compress Images for Web: A Complete Guide",
    excerpt:
      "Learn the best practices for compressing images for the web. Reduce load times while maintaining visual quality.",
    date: "May 15, 2026",
    slug: "compress-images-for-web-guide",
  },
  {
    title: "WebP vs PNG vs JPEG: Which Format Should You Use?",
    excerpt:
      "A comprehensive comparison of image formats and when to use each one for optimal results.",
    date: "May 10, 2026",
    slug: "webp-vs-png-vs-jpeg",
  },
  {
    title: "How to Reduce Image Size for Email Attachments",
    excerpt:
      "Simple tips to compress images for email attachments without breaking the size limits.",
    date: "May 5, 2026",
    slug: "reduce-image-size-email",
  },
  {
    title: "The Ultimate Guide to Passport Photo Sizes by Country",
    excerpt:
      "Everything you need to know about passport photo requirements for different countries.",
    date: "April 28, 2026",
    slug: "passport-photo-size-guide",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        PixelMint Blog
      </h1>
      <p className="text-center text-[var(--color-text-muted)] mb-12 max-w-xl mx-auto">
        Tips, guides, and best practices for image optimization and processing.
      </p>

      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="p-6 border border-[var(--color-border)] rounded-2xl hover:shadow-md transition-shadow"
          >
            <time className="text-xs text-[var(--color-text-muted)]">
              {post.date}
            </time>
            <h2 className="text-lg font-bold mt-1 mb-2">{post.title}</h2>
            <p className="text-sm text-[var(--color-text-muted)]">
              {post.excerpt}
            </p>
            <span className="inline-block mt-3 text-sm text-[var(--color-primary-600)] font-medium hover:underline cursor-default">
              Read more →
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
