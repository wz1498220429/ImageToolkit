import { siteUrl } from "./seo";

export interface FAQItem {
  question: string;
  answer: string;
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SoftwareApp {
  name: string;
  description: string;
  operatingSystem: string;
  applicationCategory: string;
  offers: {
    price: string;
    priceCurrency: string;
  };
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}

export function softwareAppSchema(app: SoftwareApp) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    description: app.description,
    operatingSystem: app.operatingSystem,
    applicationCategory: app.applicationCategory,
    offers: {
      "@type": "Offer",
      price: app.offers.price,
      priceCurrency: app.offers.priceCurrency,
    },
  };
}

export function compressFAQ(): FAQItem[] {
  return [
    {
      question: "How do I compress an image?",
      answer: "Simply upload your image using the drag-and-drop zone or click to select a file. Adjust the quality slider to your desired compression level, preview the result, and download the compressed image. Everything happens in your browser — no files are uploaded to any server.",
    },
    {
      question: "Is this image compressor free to use?",
      answer: "Yes, this image compressor is completely free to use. There are no hidden fees, no sign-ups required, and no usage limits. You can compress as many images as you need.",
    },
    {
      question: "Does this tool upload my images to a server?",
      answer: "No, your images never leave your device. All compression happens locally in your browser using JavaScript. Your privacy is guaranteed — no files are uploaded to any server.",
    },
    {
      question: "What image formats are supported?",
      answer: "This tool supports JPG, JPEG, PNG, and WebP formats. You can compress all common image types used for web, email, and document submissions.",
    },
    {
      question: "Will I lose image quality when compressing?",
      answer: "Our compression algorithm balances file size reduction with visual quality. You can control the compression level using the quality slider. Higher quality settings preserve more detail while still reducing file size.",
    },
  ];
}

export function compressToSizeFAQ(targetSize: string): FAQItem[] {
  return [
    {
      question: `How do I compress an image to ${targetSize}?`,
      answer: `Upload your image and our tool will automatically compress it to approximately ${targetSize}. The algorithm adjusts quality settings to achieve your target file size while maintaining optimal visual quality.`,
    },
    {
      question: "Is this tool free?",
      answer: `Yes, compressing images to ${targetSize} is completely free. No registration, no credit card, no limits.`,
    },
    {
      question: "Does the image upload to a server?",
      answer: "No. All processing happens locally in your browser. Your images never leave your device, ensuring complete privacy and security.",
    },
    {
      question: "What if the image can't be compressed to the target size?",
      answer: "Our tool tries multiple compression levels to achieve the target. If it can't reach the exact size, it will return the smallest possible result. You can also try reducing the image dimensions first for better results.",
    },
    {
      question: "Can I use this for passport photos?",
      answer: "Yes, this tool works well for passport and ID photos that have file size requirements. Compress to your desired size without uploading sensitive documents to any server.",
    },
  ];
}

export function convertFAQ(from: string, to: string): FAQItem[] {
  return [
    {
      question: `How do I convert ${from} to ${to}?`,
      answer: `Upload your ${from} image and click convert. Your ${to} image will be ready for download instantly. All processing is done locally in your browser.`,
    },
    {
      question: "Is this converter free?",
      answer: `Yes, converting ${from} to ${to} is completely free. No sign-ups, no limits, no hidden costs.`,
    },
    {
      question: `Does the ${from} image upload to a server?`,
      answer: "No. All conversion happens locally in your browser. Your images never leave your computer, ensuring complete privacy.",
    },
    {
      question: `Will the ${to} quality be worse than ${from}?`,
      answer: `${to} uses advanced compression that often maintains similar or better visual quality at smaller file sizes. You can preview the result before downloading.`,
    },
    {
      question: `What is the maximum file size for ${from} to ${to} conversion?`,
      answer: "There is no specific file size limit. However, very large images may take longer to process in your browser. For best results, we recommend images under 50MB.",
    },
  ];
}

export function resizeFAQ(): FAQItem[] {
  return [
    {
      question: "How do I resize an image?",
      answer: "Upload your image, enter your desired dimensions (width and height), and download the resized result. You can maintain aspect ratio automatically or set custom dimensions.",
    },
    {
      question: "Is this image resizer free?",
      answer: "Yes, resizing images is completely free. No registration, no limits, no hidden fees.",
    },
    {
      question: "Does this tool upload my images?",
      answer: "No, your images never leave your device. All resizing is done locally in your browser for complete privacy.",
    },
    {
      question: "What formats are supported for resizing?",
      answer: "You can resize JPG, JPEG, PNG, and WebP images. The output format matches the input format.",
    },
    {
      question: "Can I maintain the aspect ratio when resizing?",
      answer: "Yes, the tool automatically maintains aspect ratio by default. You can enter either width or height and the other dimension will be calculated automatically.",
    },
  ];
}

export function passportPhotoFAQ(): FAQItem[] {
  return [
    {
      question: "How do I make a passport photo?",
      answer: "Upload your photo and select your desired passport or visa photo size. The tool will guide you through cropping and adjusting your photo to meet official requirements.",
    },
    {
      question: "Is this passport photo maker free?",
      answer: "Yes, creating passport photos is completely free. No registration or payment required.",
    },
    {
      question: "Does my photo upload to a server?",
      answer: "No. All processing happens locally in your browser. Your photo never leaves your device, ensuring your privacy and security.",
    },
    {
      question: "What passport photo sizes are available?",
      answer: "We support standard passport sizes including US (2x2 inch), UK (35x45mm), EU (35x45mm), and many more. Select your country for the correct dimensions.",
    },
    {
      question: "Can I change the background color?",
      answer: "Yes, you can change the background to white, blue, or gray — the standard colors required for most passport and visa applications.",
    },
  ];
}

export function cropFAQ(): FAQItem[] {
  return [
    {
      question: "How do I crop an image?",
      answer: "Upload your image, drag to select the area you want to keep, and click Crop. You can use preset aspect ratios like 1:1, 4:3, or 16:9, or crop freely. All processing happens in your browser.",
    },
    {
      question: "Is this image cropper free?",
      answer: "Yes, cropping images is completely free. No sign-ups, no limits, no hidden costs.",
    },
    {
      question: "Does my image upload to a server when cropping?",
      answer: "No. All cropping happens locally in your browser. Your images never leave your device, ensuring complete privacy.",
    },
    {
      question: "What aspect ratios are available?",
      answer: "We support Free mode, 1:1 Square, 4:3, 3:2, 16:9, and 9:16. Select the preset that matches your needs or use Free to crop any way you want.",
    },
    {
      question: "Can I move the crop selection after drawing it?",
      answer: "Yes, simply click and drag inside the selection to reposition it. You can also cancel the selection and start over at any time.",
    },
  ];
}

export function rotateFAQ(): FAQItem[] {
  return [
    {
      question: "How do I rotate an image?",
      answer: "Upload your image and click Rotate Left, Rotate Right, or Flip 180 degrees. The rotated image is ready for download instantly. All processing is done in your browser.",
    },
    {
      question: "Is this image rotator free?",
      answer: "Yes, rotating images is completely free. No registration, no limits, no payment required.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All rotation happens locally in your browser. Your images never leave your device, ensuring complete privacy and security.",
    },
    {
      question: "What rotation options are available?",
      answer: "You can rotate 90 degrees left (counter-clockwise), 90 degrees right (clockwise), or flip 180 degrees. These cover all common rotation needs.",
    },
    {
      question: "What image formats are supported?",
      answer: "You can rotate JPG, JPEG, PNG, WebP, and other common image formats. The output format matches the input format.",
    },
  ];
}

export function base64FAQ(): FAQItem[] {
  return [
    {
      question: "How do I convert an image to Base64?",
      answer: "Upload your image and the Base64 data URI will be generated instantly. Click the copy button to copy the Base64 string to your clipboard. All processing is done in your browser.",
    },
    {
      question: "Is this Base64 converter free?",
      answer: "Yes, converting images to Base64 is completely free. No sign-ups, no limits, no hidden costs.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All conversion happens locally in your browser. Your images never leave your device.",
    },
    {
      question: "What is Base64 used for?",
      answer: "Base64 is commonly used to embed images directly in HTML, CSS, or JavaScript code without needing separate image files. It's also used for data URIs and API transfers.",
    },
    {
      question: "What image formats are supported?",
      answer: "You can convert JPG, JPEG, PNG, WebP, and other common image formats to Base64.",
    },
  ];
}

export function base64DecodeFAQ(): FAQItem[] {
  return [
    {
      question: "How do I convert Base64 back to an image?",
      answer: "Paste your Base64 string (with or without the data:image/... prefix) into the text area. The image will be decoded instantly and you can download it. All processing is done in your browser.",
    },
    {
      question: "Is this Base64 decoder free?",
      answer: "Yes, decoding Base64 to images is completely free. No registration required.",
    },
    {
      question: "What format will the output image be?",
      answer: "The output format is determined by the Base64 data. Common formats include PNG, JPEG, and WebP. The tool detects the format automatically.",
    },
    {
      question: "Can I paste the full data URI?",
      answer: "Yes, you can paste the full data URI including the 'data:image/...;base64,' prefix. The tool will automatically parse it.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes. All Base64 decoding happens locally in your browser. Your data never leaves your device.",
    },
  ];
}

export function grayscaleFAQ(): FAQItem[] {
  return [
    {
      question: "How do I convert an image to grayscale?",
      answer: "Upload your color image and click Convert. The image will be transformed to black and white instantly. Download the result or adjust settings and try again.",
    },
    {
      question: "Is this grayscale converter free?",
      answer: "Yes, converting images to grayscale is completely free. No sign-ups or limits.",
    },
    {
      question: "Does the image upload to a server?",
      answer: "No. All grayscale conversion happens locally in your browser using canvas technology. Your images remain private.",
    },
    {
      question: "What image formats are supported?",
      answer: "You can convert JPG, JPEG, PNG, WebP, and other common image formats to grayscale.",
    },
    {
      question: "Will I lose quality when converting to grayscale?",
      answer: "No, grayscale conversion preserves the full resolution and quality of your original image, just removing the color information.",
    },
  ];
}

export function blurFAQ(): FAQItem[] {
  return [
    {
      question: "How do I blur an image?",
      answer: "Upload your image and use the blur intensity slider to adjust the effect. Preview the result in real time and download when satisfied. All processing happens in your browser.",
    },
    {
      question: "Is this image blur tool free?",
      answer: "Yes, blurring images is completely free. No registration required.",
    },
    {
      question: "Does the image upload to a server?",
      answer: "No. All blur processing happens locally in your browser using canvas filters. Your images stay private.",
    },
    {
      question: "What can I use image blurring for?",
      answer: "Blur is commonly used to hide sensitive information (faces, license plates), create background effects, add depth of field, or for creative photo editing.",
    },
    {
      question: "Can I adjust the blur strength?",
      answer: "Yes, use the slider to control the blur intensity from a subtle soft focus to a strong blur effect.",
    },
  ];
}

export function flipFAQ(): FAQItem[] {
  return [
    {
      question: "How do I flip an image?",
      answer: "Upload your image and click Flip Horizontally (mirror) or Flip Vertically. The flipped image is ready for download instantly. All processing happens in your browser.",
    },
    {
      question: "Is this image flipper free?",
      answer: "Yes, flipping images is completely free. No sign-ups, no limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All image flipping happens locally in your browser. Your images never leave your device.",
    },
    {
      question: "What's the difference between flip and rotate?",
      answer: "Flipping creates a mirror image (left becomes right), while rotating turns the image at an angle. Flipping horizontally is like looking in a mirror.",
    },
    {
      question: "What image formats are supported?",
      answer: "You can flip JPG, JPEG, PNG, WebP, and other common image formats.",
    },
  ];
}

export function pdfFAQ(from: string): FAQItem[] {
  return [
    {
      question: `How do I convert ${from} to PDF?`,
      answer: `Upload your ${from} image and click Convert to PDF. The PDF will be generated with your image on a single page. All processing is done in your browser.`,
    },
    {
      question: "Is this PDF converter free?",
      answer: "Yes, converting images to PDF is completely free. No sign-ups or limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: `No. All ${from} to PDF conversion happens locally using jsPDF in your browser. Your images never leave your device.`,
    },
    {
      question: "What size will the PDF page be?",
      answer: "The PDF page is set to A4 size with the image fitting to the page dimensions while maintaining its aspect ratio.",
    },
    {
      question: "Can I add multiple images to one PDF?",
      answer: "Currently, this tool converts one image per PDF. For multiple images, convert each one separately and combine them later.",
    },
  ];
}

export function colorPickerFAQ(): FAQItem[] {
  return [
    {
      question: "How do I pick a color from an image?",
      answer: "Upload your image and click anywhere on it. The exact HEX, RGB, and HSL values of that pixel will be displayed instantly. You can copy any value with one click.",
    },
    {
      question: "Is this color picker free?",
      answer: "Yes, picking colors from images is completely free. No sign-ups, no limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All processing happens locally in your browser. Your images never leave your device.",
    },
    {
      question: "What color formats are supported?",
      answer: "The tool shows HEX, RGB, and HSL color values. You can copy any format by clicking the copy button next to each value.",
    },
    {
      question: "What image formats can I pick colors from?",
      answer: "You can pick colors from JPG, JPEG, PNG, WebP, and other common image formats.",
    },
  ];
}

export function watermarkFAQ(): FAQItem[] {
  return [
    {
      question: "How do I add a watermark to my image?",
      answer: "Upload your image, enter your watermark text, and customize the opacity, size, and position. Click Add Watermark and download the result. All processing is done in your browser.",
    },
    {
      question: "Is this watermark tool free?",
      answer: "Yes, adding watermarks to images is completely free. No sign-ups or limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All watermark processing happens locally in your browser. Your images stay private.",
    },
    {
      question: "Can I customize the watermark?",
      answer: "Yes, you can change the watermark text, adjust opacity (10-100%), font size (12-72px), and choose from 5 positions: top-left, top-right, bottom-left, bottom-right, or center.",
    },
    {
      question: "What image formats are supported?",
      answer: "You can add watermarks to JPG, JPEG, PNG, WebP, and other common image formats.",
    },
  ];
}

export function mergeFAQ(): FAQItem[] {
  return [
    {
      question: "How do I merge two images?",
      answer: "Upload two images and choose a merge mode: Side by Side (horizontal), Top to Bottom (vertical), or Overlay (semi-transparent). Click Merge Images to download the combined result.",
    },
    {
      question: "Is this image merger free?",
      answer: "Yes, merging images is completely free. No sign-ups or limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All merging happens locally in your browser using Canvas API. Your images never leave your device.",
    },
    {
      question: "What merge modes are available?",
      answer: "Three modes: Side by Side (images are placed next to each other horizontally), Top to Bottom (stacked vertically), and Overlay (images are blended together with 50% transparency).",
    },
    {
      question: "What happens if the images have different sizes?",
      answer: "In horizontal mode, the height matches the taller image. In vertical mode, the width matches the wider image. In overlay mode, the canvas fits the larger image dimensions.",
    },
  ];
}

export function imageToSvgFAQ(): FAQItem[] {
  return [
    {
      question: "How do I convert an image to SVG?",
      answer: "Upload your image and the tool generates an SVG file with your image embedded. You can copy the SVG code or download the .svg file. All processing is done in your browser.",
    },
    {
      question: "Is this image to SVG converter free?",
      answer: "Yes, converting images to SVG is completely free. No sign-ups, no limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All conversion happens locally in your browser. Your images never leave your device.",
    },
    {
      question: "What can I use the SVG code for?",
      answer: "SVG code can be used directly in HTML, React components, or any web project. It's also compatible with design tools like Figma, Illustrator, and Inkscape.",
    },
    {
      question: "What image formats can I convert to SVG?",
      answer: "You can convert JPG, JPEG, PNG, WebP, and other common image formats to SVG.",
    },
  ];
}

export function splitImageFAQ(): FAQItem[] {
  return [
    {
      question: "How do I split an image into a grid?",
      answer: "Upload your image, set the number of rows and columns (1-10 each), and click Split. The image will be divided into equal pieces. You can download each piece individually.",
    },
    {
      question: "Is this image splitter free?",
      answer: "Yes, splitting images is completely free. No sign-ups or limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All splitting happens locally in your browser. Your images never leave your device.",
    },
    {
      question: "What is image splitting used for?",
      answer: "Image splitting is commonly used for Instagram puzzle posts (split a single image into a 3x3 grid), creating tile maps, or dividing large images for easier processing.",
    },
    {
      question: "Can I control the grid size?",
      answer: "Yes, you can set custom rows and columns from 1 to 10. For example, a 3x3 grid creates 9 equal pieces, perfect for Instagram puzzle posts.",
    },
  ];
}

export function pixelateFAQ(): FAQItem[] {
  return [
    {
      question: "How do I pixelate an image?",
      answer: "Upload your image and adjust the pixel block size using the slider. Click Pixelate to apply the effect. You can adjust the intensity and try again. All processing is done in your browser.",
    },
    {
      question: "Is this pixelation tool free?",
      answer: "Yes, pixelating images is completely free. No sign-ups or limits.",
    },
    {
      question: "Does my image upload to a server?",
      answer: "No. All pixelation happens locally in your browser. Your images remain private.",
    },
    {
      question: "What is pixelation used for?",
      answer: "Pixelation is commonly used for censoring sensitive content (faces, license plates, text), creating pixel art effects, or adding privacy protection to photos.",
    },
    {
      question: "Can I control the pixel block size?",
      answer: "Yes, use the slider to adjust pixel size from 2px (subtle effect) to 40px (extreme pixelation). Preview the result and adjust as needed.",
    },
  ];
}
