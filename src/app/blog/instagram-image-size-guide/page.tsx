import Link from "next/link";

export const metadata = {
  title: "Instagram Image Size Guide 2026 - Perfect Photo Dimensions for Posts & Stories | ImageToolkit",
  description: "Complete Instagram image size guide. Get the exact dimensions for feed posts, stories, reels, profile photos, and thumbnails. Free online resizer included.",
  keywords: ["instagram image size", "instagram photo dimensions", "instagram post size", "instagram story size", "instagram feed size"],
  openGraph: { title: "Instagram Image Size Guide 2026", description: "Perfect Instagram photo dimensions for posts, stories, and reels. Free resizer tool included." },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 pt-12 pb-16 blog-article">
      <time className="text-sm text-[var(--color-text-muted)]">May 22, 2026</time>
      <h1>Instagram Image Size Guide 2026</h1>

      <p>
        Using the wrong image size on Instagram can result in awkward cropping, poor
        quality, or rejected uploads. Here&apos;s the complete guide to Instagram image
        dimensions for every type of content.
      </p>

      <h2>Instagram Feed Post Sizes</h2>

      <h3>Square Post (1:1) — 1080 × 1080px</h3>
      <p>The classic Instagram format. Works perfectly in the feed and on your profile grid.</p>

      <h3>Portrait Post (4:5) — 1080 × 1350px</h3>
      <p>Takes up more vertical space in the feed, making it more engaging. Recommended for most content.</p>

      <h3>Landscape Post (1.91:1) — 1080 × 566px</h3>
      <p>Best for wide shots, group photos, and scenic landscapes.</p>

      <h2>Instagram Story & Reels — 1080 × 1920px (9:16)</h2>
      <p>Full-screen vertical format. Stories and Reels share the same dimensions. Keep
      important content within the safe zone (center 1080×1420px) to avoid being cut off.</p>

      <h2>Profile Photo — 320 × 320px</h2>
      <p>Displayed as a circle, so center your subject. Upload at 320×320px for best quality.</p>

      <h2>How to Resize for Instagram</h2>
      <p>
        Use our <Link href="/tools/instagram-image-resizer">free Instagram image resizer</Link>
        with preset dimensions for every format:
      </p>
      <ul>
        <li>Square: 1080×1080</li>
        <li>Portrait: 1080×1350</li>
        <li>Landscape: 1080×566 or 1080×608</li>
        <li>Story: 1080×1920</li>
        <li>Profile: 320×320</li>
      </ul>

      <h2>Tips for Best Quality</h2>
      <ul>
        <li>Always upload at the highest resolution — Instagram compresses images</li>
        <li>Use JPEG format for photos, PNG for graphics with text</li>
        <li>Keep file size under 5MB for fastest uploads</li>
        <li>If images are too large, <Link href="/tools/compress-image">compress them first</Link></li>
      </ul>

      <div className="p-6 bg-[var(--color-primary-50)] rounded-2xl">
        <h3 className="mt-0">Resize for Instagram Now</h3>
        <p className="mb-4">Get the perfect dimensions for any Instagram format:</p>
        <Link href="/tools/instagram-image-resizer" className="cta-btn inline-flex items-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors">
          Resize for Instagram →
        </Link>
      </div>
    </article>
  );
}
