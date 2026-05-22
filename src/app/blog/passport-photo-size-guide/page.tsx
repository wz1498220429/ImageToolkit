import Link from "next/link";

export const metadata = {
  title: "Passport Photo Size Requirements by Country - Complete Guide 2026 | ImageToolkit",
  description: "Complete guide to passport photo sizes for US, UK, EU, China, India, Canada, and more. Free online passport photo maker. No uploads needed.",
  keywords: ["passport photo size", "passport photo requirements", "visa photo size", "passport photo dimensions", "id photo size by country"],
  openGraph: {
    title: "Passport Photo Size Requirements by Country - Complete Guide 2026",
    description: "Find the correct passport and visa photo sizes for every country. Free online passport photo maker included.",
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-3xl mx-auto px-4 pt-12 pb-16 blog-article">
      <time className="text-sm text-[var(--color-text-muted)]">May 22, 2026</time>
      <h1>Passport Photo Size Requirements by Country</h1>

      <p>
        Getting your passport or visa photo wrong is one of the most common reasons for
        application rejection. Each country has specific requirements for photo size,
        background color, and head position. This guide covers the most common passport
        photo sizes and how to create them online for free.
      </p>

      <h2>Common Passport Photo Sizes</h2>

      <h3>United States Passport (2 × 2 inches / 51 × 51 mm)</h3>
      <p>
        The US requires a 2×2 inch photo with a white or off-white background. The head
        should be between 1 and 1-3/8 inches from chin to crown. Smiling is optional but
        a neutral expression is recommended.
      </p>

      <h3>United Kingdom Passport (35 × 45 mm)</h3>
      <p>
        UK passport photos are 35mm wide by 45mm tall. The background must be plain light
        gray or cream. The face should be clearly visible with both eyes open. No shadows
        on the face or background are allowed.
      </p>

      <h3>European Union Passport (35 × 45 mm)</h3>
      <p>
        EU member states follow the ICAO standard of 35×45mm. Requirements vary slightly
        by country but generally require a white background and neutral expression. The EU
        is moving toward digital biometric photos stored on chip.
      </p>

      <h3>China Visa (33 × 48 mm)</h3>
      <p>
        Chinese visa photos are 33mm wide by 48mm tall. A white background is required.
        The head should take up about two-thirds of the photo. No glasses with tinted
        lenses are allowed.
      </p>

      <h3>India Passport (35 × 45 mm)</h3>
      <p>
        India follows the 35×45mm standard with a white background. Both ears should be
        visible. The photo must be no older than 6 months.
      </p>

      <h2>How to Create Passport Photos Online</h2>
      <p>
        With our <Link href="/tools/passport-photo-maker">free online passport photo maker</Link>,
        you can create compliant passport photos in seconds:
      </p>
      <ol>
        <li>Upload a recent photo of yourself</li>
        <li>Select your country and document type</li>
        <li>Choose the background color (white, blue, gray)</li>
        <li>Click &quot;Create Passport Photo&quot;</li>
        <li>Download and print</li>
      </ol>
      <p>
        All processing happens in your browser. Your photo never leaves your device.
      </p>

      <h2>File Size Requirements</h2>
      <p>
        Many online application portals also require the photo file to be under a specific
        size. Common limits include 50KB, 100KB, and 200KB. If your passport photo is too
        large, use our tools to compress it:
      </p>
      <ul>
        <li><Link href="/tools/compress-image-to-50kb">Compress to 50KB</Link></li>
        <li><Link href="/tools/compress-image-to-100kb">Compress to 100KB</Link></li>
        <li><Link href="/tools/compress-image-to-200kb">Compress to 200KB</Link></li>
      </ul>

      <h2>Tips for a Successful Passport Photo</h2>
      <ul>
        <li>Use good, even lighting — no shadows on your face</li>
        <li>Wear plain clothing that contrasts with the background</li>
        <li>Look directly at the camera with both eyes open</li>
        <li>Keep a neutral expression (no smiling in some countries)</li>
        <li>Remove glasses if possible, or ensure no glare</li>
        <li>Make sure the photo is sharp and not pixelated</li>
      </ul>

      <h2>Background Colors by Country</h2>
      <ul>
        <li><strong>White:</strong> US, UK, India, China, Japan, Canada, Australia, Singapore</li>
        <li><strong>Blue:</strong> Some EU countries and Middle Eastern nations</li>
        <li><strong>Gray:</strong> UK, some EU countries</li>
      </ul>

      <div className="mt-12 p-6 bg-[var(--color-primary-50)] rounded-2xl">
        <h3 className="mt-0">Create Your Passport Photo Now</h3>
        <p className="mb-4">No uploads, no sign-ups, completely free:</p>
        <Link
          href="/tools/passport-photo-maker"
          className="inline-flex items-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors no-underline"
        >
          Create Passport Photo →
        </Link>
      </div>
    </article>
  );
}
