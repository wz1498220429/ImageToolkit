export interface ToolMeta {
  slug: string;
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  category: "compress" | "convert" | "resize" | "photo";
}

export const siteName = "ImageToolkit";
export const siteUrl = "https://www.imagetoolkit.fit";
export const siteDescription = "Free online image tools. Compress, convert, and resize images directly in your browser. No uploads, no sign-ups, 100% free.";

export const tools: Record<string, ToolMeta> = {
  "compress-image": {
    slug: "compress-image",
    title: "Compress Image Online Free - Reduce Image Size Without Losing Quality",
    description: "Compress JPG, PNG, WebP images online for free. Reduce file size while maintaining quality. No upload required, works in your browser.",
    h1: "Free Online Image Compressor",
    keywords: ["compress image", "reduce image size", "image compressor", "compress jpg", "compress png"],
    category: "compress",
  },
  "compress-image-to-100kb": {
    slug: "compress-image-to-100kb",
    title: "Compress Image to 100KB Online Free - Exact Size Image Compressor",
    description: "Compress your images to exactly 100KB online for free. Fast, secure browser-based tool. No upload needed. Get precise file size every time.",
    h1: "Compress Image to 100KB Online Free",
    keywords: ["compress image to 100kb", "reduce image to 100kb", "image 100kb", "compress to 100kb"],
    category: "compress",
  },
  "compress-image-to-20kb": {
    slug: "compress-image-to-20kb",
    title: "Compress Image to 20KB Online Free - Make Images Under 20KB",
    description: "Compress images to 20KB or less online for free. Perfect for passport photos, email attachments, and web uploads. Browser-based, no uploads.",
    h1: "Compress Image to 20KB Online Free",
    keywords: ["compress image to 20kb", "reduce image to 20kb", "image 20kb", "compress to 20kb"],
    category: "compress",
  },
  "compress-image-to-50kb": {
    slug: "compress-image-to-50kb",
    title: "Compress Image to 50KB Online Free - Image Size Reducer",
    description: "Free online tool to compress images to 50KB. Perfect for applications, forms, and web use. Works entirely in your browser.",
    h1: "Compress Image to 50KB Online Free",
    keywords: ["compress image to 50kb", "reduce image to 50kb", "image 50kb", "compress to 50kb"],
    category: "compress",
  },
  "compress-image-to-200kb": {
    slug: "compress-image-to-200kb",
    title: "Compress Image to 200KB Online Free - High Quality Image Compression",
    description: "Compress your images to 200KB online free. Maintain high quality while reducing file size. Perfect for sharing and uploading.",
    h1: "Compress Image to 200KB Online Free",
    keywords: ["compress image to 200kb", "reduce image to 200kb", "image 200kb", "compress to 200kb"],
    category: "compress",
  },
  "compress-image-to-1mb": {
    slug: "compress-image-to-1mb",
    title: "Compress Image to 1MB Online Free - Reduce Image Under 1MB",
    description: "Free online tool to compress images to 1MB. Ideal for document submissions and email attachments. 100% browser-based.",
    h1: "Compress Image to 1MB Online Free",
    keywords: ["compress image to 1mb", "reduce image to 1mb", "image under 1mb", "compress to 1mb"],
    category: "compress",
  },
  "compress-jpeg": {
    slug: "compress-jpeg",
    title: "Compress JPEG Image Online Free - Reduce JPG File Size",
    description: "Free JPEG compressor. Reduce JPG file size without losing quality. Browser-based, no uploads. Compress your JPEG images instantly.",
    h1: "Free JPEG Compressor Online",
    keywords: ["compress jpeg", "compress jpg", "jpeg compressor", "reduce jpg size", "jpg optimizer"],
    category: "compress",
  },
  "compress-png": {
    slug: "compress-png",
    title: "Compress PNG Image Online Free - Reduce PNG File Size",
    description: "Free online PNG compressor. Reduce PNG file size while preserving transparency. No server uploads, 100% browser based.",
    h1: "Free PNG Compressor Online",
    keywords: ["compress png", "png compressor", "reduce png size", "png optimizer", "compress png online"],
    category: "compress",
  },
  "webp-to-png": {
    slug: "webp-to-png",
    title: "Convert WebP to PNG Online Free - WebP to PNG Converter",
    description: "Free online tool to convert WebP images to PNG format. Fast, secure, and works entirely in your browser. No uploads needed.",
    h1: "Convert WebP to PNG Online Free",
    keywords: ["webp to png", "convert webp to png", "webp converter", "webp to png online", "change webp to png"],
    category: "convert",
  },
  "png-to-webp": {
    slug: "png-to-webp",
    title: "Convert PNG to WebP Online Free - PNG to WebP Converter",
    description: "Free online PNG to WebP converter. Reduce image file size by converting to WebP format. Works in your browser, no uploads required.",
    h1: "Convert PNG to WebP Online Free",
    keywords: ["png to webp", "convert png to webp", "png converter", "png to webp online", "change png to webp"],
    category: "convert",
  },
  "heic-to-jpg": {
    slug: "heic-to-jpg",
    title: "Convert HEIC to JPG Online Free - HEIC to JPEG Converter",
    description: "Free online HEIC to JPG converter. Convert Apple HEIC images to universal JPEG format. No uploads, works in browser.",
    h1: "Convert HEIC to JPG Online Free",
    keywords: ["heic to jpg", "convert heic to jpg", "heic to jpeg", "heic converter", "change heic to jpg"],
    category: "convert",
  },
  "avif-to-jpg": {
    slug: "avif-to-jpg",
    title: "Convert AVIF to JPG Online Free - AVIF to JPEG Converter",
    description: "Free online AVIF to JPG converter. Convert AVIF images to JPEG format. Browser-based, no uploads. Fast and secure.",
    h1: "Convert AVIF to JPG Online Free",
    keywords: ["avif to jpg", "convert avif to jpg", "avif to jpeg", "avif converter", "change avif to jpg"],
    category: "convert",
  },
  "png-to-jpg": {
    slug: "png-to-jpg",
    title: "Convert PNG to JPG Online Free - PNG to JPEG Converter",
    description: "Free online PNG to JPG converter. Convert PNG images to JPEG format. Reduce file size while maintaining quality. Works in your browser, no uploads.",
    h1: "Convert PNG to JPG Online Free",
    keywords: ["png to jpg", "convert png to jpg", "png to jpeg", "png converter", "change png to jpg"],
    category: "convert",
  },
  "jpg-to-png": {
    slug: "jpg-to-png",
    title: "Convert JPG to PNG Online Free - JPEG to PNG Converter",
    description: "Free online JPG to PNG converter. Convert JPEG images to PNG format with transparency support. Browser-based, no uploads. Fast and free.",
    h1: "Convert JPG to PNG Online Free",
    keywords: ["jpg to png", "convert jpg to png", "jpeg to png", "jpg converter", "change jpg to png"],
    category: "convert",
  },
  "resize-image": {
    slug: "resize-image",
    title: "Resize Image Online Free - Change Image Dimensions",
    description: "Free online image resizer. Resize JPG, PNG, WebP images to any dimensions. No uploads, works in your browser. Fast and easy.",
    h1: "Free Online Image Resizer",
    keywords: ["resize image", "image resizer", "change image size", "resize photo", "image dimensions"],
    category: "resize",
  },
  "passport-photo-maker": {
    slug: "passport-photo-maker",
    title: "Passport Photo Maker Online Free - Create Passport Size Photos",
    description: "Free online passport photo maker. Create passport, visa, and ID photos in seconds. Adjust size, background, and download. Browser-based.",
    h1: "Free Online Passport Photo Maker",
    keywords: ["passport photo maker", "passport size photo", "visa photo maker", "id photo maker", "passport photo online"],
    category: "photo",
  },
  "instagram-image-resizer": {
    slug: "instagram-image-resizer",
    title: "Instagram Image Resizer Online Free - Perfect Instagram Photo Size",
    description: "Free Instagram image resizer. Resize photos to perfect Instagram dimensions (1080x1080, 1080x1350, 1080x566). No uploads needed.",
    h1: "Free Instagram Image Resizer",
    keywords: ["instagram image resizer", "instagram photo size", "instagram image size", "resize for instagram"],
    category: "resize",
  },
  "crop-image": {
    slug: "crop-image",
    title: "Crop Image Online Free - Crop Photos Instantly",
    description: "Free online image cropper. Crop your photos with custom dimensions or preset aspect ratios. No uploads, works entirely in browser.",
    h1: "Free Online Image Cropper",
    keywords: ["crop image", "crop photo", "image cropper", "crop images online", "photo cropper"],
    category: "resize",
  },
  "rotate-image": {
    slug: "rotate-image",
    title: "Rotate Image Online Free - Rotate Photos Instantly",
    description: "Free online image rotator. Rotate images left, right, or flip them. Works with JPG, PNG, WebP. No uploads, 100% browser-based.",
    h1: "Free Online Image Rotator",
    keywords: ["rotate image", "rotate photo", "flip image", "rotate image online", "photo rotator"],
    category: "resize",
  },
  "compress-image-to-10kb": {
    slug: "compress-image-to-10kb",
    title: "Compress Image to 10KB Online Free - Image Size Reducer",
    description: "Compress images to 10KB or less online for free. Perfect for passport photos, application forms, and email attachments. Browser-based, no uploads.",
    h1: "Compress Image to 10KB Online Free",
    keywords: ["compress image to 10kb", "reduce image to 10kb", "image 10kb", "compress to 10kb"],
    category: "compress",
  },
  "compress-webp": {
    slug: "compress-webp",
    title: "Compress WebP Image Online Free - Reduce WebP File Size",
    description: "Free online WebP compressor. Reduce WebP image file size while maintaining quality. No uploads, works in your browser instantly.",
    h1: "Compress WebP Image Online Free",
    keywords: ["compress webp", "webp compressor", "reduce webp size", "webp optimizer", "compress webp online"],
    category: "compress",
  },
  "image-to-base64": {
    slug: "image-to-base64",
    title: "Convert Image to Base64 Online Free - Image to Base64 Encoder",
    description: "Free online tool to convert images to Base64 data URIs. Encode JPG, PNG, WebP to Base64. Copy the result with one click. No uploads needed.",
    h1: "Convert Image to Base64 Online Free",
    keywords: ["image to base64", "image to base64 converter", "convert image to base64", "image to base64 online", "base64 encoder image"],
    category: "convert",
  },
  "base64-to-image": {
    slug: "base64-to-image",
    title: "Convert Base64 to Image Online Free - Base64 Image Decoder",
    description: "Free online Base64 to image converter. Decode Base64 strings back to JPG, PNG, or WebP images. Works in your browser, no uploads.",
    h1: "Convert Base64 to Image Online Free",
    keywords: ["base64 to image", "base64 to image converter", "decode base64 to image", "base64 to image online", "base64 decoder image"],
    category: "convert",
  },
  "image-to-grayscale": {
    slug: "image-to-grayscale",
    title: "Convert Image to Grayscale Online Free - Black and White Photo Converter",
    description: "Free online tool to convert images to grayscale (black and white). Turn your color photos into stunning grayscale. Works in your browser, no uploads.",
    h1: "Convert Image to Grayscale Online Free",
    keywords: ["image to grayscale", "convert image to black and white", "grayscale image converter", "color to grayscale", "image to bw"],
    category: "convert",
  },
  "blur-image": {
    slug: "blur-image",
    title: "Blur Image Online Free - Blur Photos Instantly",
    description: "Free online image blur tool. Apply adjustable blur to your photos. Perfect for backgrounds, privacy, and creative effects. No uploads, browser-based.",
    h1: "Blur Image Online Free",
    keywords: ["blur image", "blur photo", "image blur tool", "blur image online", "photo blur"],
    category: "resize",
  },
  "flip-image": {
    slug: "flip-image",
    title: "Flip Image Online Free - Mirror Image Horizontally or Vertically",
    description: "Free online image flipper. Flip images horizontally (mirror) or vertically. Works with JPG, PNG, WebP. No uploads, instant results in your browser.",
    h1: "Flip Image Online Free",
    keywords: ["flip image", "mirror image", "flip photo online", "image flipper", "flip image horizontally"],
    category: "resize",
  },
  "jpg-to-pdf": {
    slug: "jpg-to-pdf",
    title: "Convert JPG to PDF Online Free - JPEG to PDF Converter",
    description: "Free online JPG to PDF converter. Convert JPEG images to PDF documents instantly. No uploads, works in your browser. Perfect for converting photos to PDF.",
    h1: "Convert JPG to PDF Online Free",
    keywords: ["jpg to pdf", "jpeg to pdf", "convert jpg to pdf", "jpg to pdf converter", "image to pdf"],
    category: "convert",
  },
  "png-to-pdf": {
    slug: "png-to-pdf",
    title: "Convert PNG to PDF Online Free - PNG to PDF Converter",
    description: "Free online PNG to PDF converter. Convert PNG images to PDF documents instantly. Browser-based, no uploads. Perfect for scan-to-PDF workflow.",
    h1: "Convert PNG to PDF Online Free",
    keywords: ["png to pdf", "convert png to pdf", "png to pdf converter", "image to pdf", "change png to pdf"],
    category: "convert",
  },
};

export function getToolMeta(slug: string): ToolMeta | undefined {
  return tools[slug];
}

export function getRelatedTools(slug: string, count: number = 4): ToolMeta[] {
  const current = tools[slug];
  if (!current) return [];

  return Object.values(tools)
    .filter((t) => t.slug !== slug && t.category === current.category)
    .slice(0, count);
}

export function generateBreadcrumbs(slug: string) {
  const meta = tools[slug];
  if (!meta) return [];

  return [
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: meta.h1, url: `/tools/${slug}` },
  ];
}
