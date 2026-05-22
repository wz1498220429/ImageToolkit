export const metadata = {
  title: "About | ImageToolkit",
  description:
    "Learn about ImageToolkit - the free online image tools platform. All tools work directly in your browser with no uploads.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 pb-16 prose prose-gray">
      <h1>About ImageToolkit</h1>
      <p>
        ImageToolkit is a collection of free, browser-based image tools designed to
        help you compress, convert, resize, and edit your images quickly and
        securely.
      </p>
      <h2>Our Mission</h2>
      <p>
        We believe that image editing tools should be free, fast, and private.
        That&apos;s why every tool on ImageToolkit processes your images entirely in your
        browser. Your files never leave your device.
        <br />
        No uploads.
        <br />
        No sign-ups.
        <br /> No limits.
      </p>
      <h2>Why We Built ImageToolkit</h2>
      <p>
        Most online image tools require you to upload your files to their
        servers, wait for processing, and then download the result. This is slow,
        insecure, and often comes with file size limits or paywalls.
        <br />
        We built ImageToolkit to be different. Using modern browser technology, all
        processing happens locally on your device. It&apos;s faster, more private,
        and completely free.
      </p>
      <h2>Our Tools</h2>
      <ul>
        <li>Image compression with adjustable quality</li>
        <li>Compress to exact file sizes (20KB, 50KB, 100KB, 200KB, 1MB)</li>
        <li>Format conversion (WebP, PNG, HEIC, AVIF, JPG)</li>
        <li>Image resizing with aspect ratio lock</li>
        <li>Image cropping with preset aspect ratios</li>
        <li>Image rotation and flipping</li>
        <li>Passport photo maker with country-specific sizes</li>
        <li>Instagram image resizer</li>
      </ul>
      <h2>Privacy</h2>
      <p>
        Your privacy is our priority. Since all processing happens in your
        browser, your images never leave your device. We don&apos;t store, track, or
        access your files in any way.
      </p>
    </div>
  );
}
