import Link from "next/link";

const toolLinks = [
  { name: "Compress Image", href: "/tools/compress-image" },
  { name: "Compress to 100KB", href: "/tools/compress-image-to-100kb" },
  { name: "Compress to 50KB", href: "/tools/compress-image-to-50kb" },
  { name: "WebP to PNG", href: "/tools/webp-to-png" },
  { name: "PNG to WebP", href: "/tools/png-to-webp" },
  { name: "Resize Image", href: "/tools/resize-image" },
  { name: "Passport Photo", href: "/tools/passport-photo-maker" },
  { name: "Crop Image", href: "/tools/crop-image" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-[var(--color-border)] mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[var(--color-primary-600)] flex items-center justify-center text-white font-bold text-xs">
                P
              </div>
              <span className="font-bold text-lg">ImageToolkit</span>
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Free online image tools that work entirely in your browser.
              Compress, convert, and resize images without uploading to any
              server. 100% free and private.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-[var(--color-text)] mb-4 uppercase tracking-wider">
              Tools
            </h3>
            <ul className="space-y-2">
              {toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-[var(--color-text)] mb-4 uppercase tracking-wider">
              Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-border)] mt-8 pt-8 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} ImageToolkit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
