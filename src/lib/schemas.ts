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
      item: `https://pixelmint.com${item.url}`,
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
