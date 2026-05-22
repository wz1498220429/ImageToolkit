export const metadata = {
  title: "Privacy Policy | ImageToolkit",
  description:
    "ImageToolkit privacy policy. We never upload your images to any server. All processing happens locally in your browser.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 pt-12 pb-16 prose prose-gray">
      <h1>Privacy Policy</h1>
      <p><em>Last updated: May 2026</em></p>
      <h2>Your Data Stays on Your Device</h2>
      <p>
        ImageToolkit processes all images entirely in your browser. Your images are never uploaded to any server.
        This means:
      </p>
      <ul>
        <li>We never see your images</li>
        <li>We never store your images</li>
        <li>We cannot access your images</li>
        <li>Your images never leave your computer</li>
      </ul>
      <h2>What Data We Collect</h2>
      <p>
        We use minimal analytics to understand which tools are popular and improve our service.
        This includes:
      </p>
      <ul>
        <li>Page views and tool usage (anonymous)</li>
        <li>Browser type and device information</li>
        <li>Referring website information</li>
      </ul>
      <p>
        We do not collect any personal information or image data.
      </p>
      <h2>Cookies</h2>
      <p>
        We use essential cookies for site functionality. We do not use tracking cookies or third-party
        advertising cookies.
      </p>
      <h2>Third-Party Services</h2>
      <p>
        This site is hosted on Vercel. Vercel may collect standard server logs
        including IP addresses and request information. Please refer to Vercel&apos;s
        privacy policy for more details.
      </p>
      <h2>Contact</h2>
      <p>
        If you have questions about this privacy policy, please contact us through our
        contact page.
      </p>
    </div>
  );
}
