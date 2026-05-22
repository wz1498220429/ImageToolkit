# PixelMint - Free Online Image Tools

An SEO-optimized image tools website built with Next.js 15. All image processing happens in the browser — no uploads, no servers.

## 🚀 Quick Deploy

### Deploy to Vercel (Recommended)

Click the button below to deploy instantly:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/pixelmint)

Or manually:

```bash
npx vercel --prod
```

### Deploy to Netlify

```bash
npm run build
npx netlify deploy --prod --dir=.next
```

## 🛠️ Development

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with SEO metadata
│   ├── page.tsx            # Homepage with all tools listed
│   ├── tools/              # Individual tool pages
│   │   ├── compress-image/
│   │   ├── compress-image-to-100kb/
│   │   ├── compress-image-to-50kb/
│   │   ├── compress-image-to-20kb/
│   │   ├── compress-image-to-200kb/
│   │   ├── compress-image-to-1mb/
│   │   ├── compress-jpeg/
│   │   ├── compress-png/
│   │   ├── webp-to-png/
│   │   ├── png-to-webp/
│   │   ├── heic-to-jpg/
│   │   ├── avif-to-jpg/
│   │   ├── resize-image/
│   │   ├── crop-image/
│   │   ├── rotate-image/
│   │   ├── passport-photo-maker/
│   │   └── instagram-image-resizer/
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── privacy-policy/
│   └── terms/
├── components/             # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── UploadZone.tsx
│   ├── ImagePreview.tsx
│   ├── CompressTool.tsx
│   ├── CompressToSizeTool.tsx
│   ├── ConvertTool.tsx
│   ├── ResizeTool.tsx
│   ├── CropTool.tsx
│   ├── RotateTool.tsx
│   ├── PassportPhotoTool.tsx
│   ├── InstagramResizerTool.tsx
│   ├── FAQ.tsx
│   ├── Breadcrumbs.tsx
│   ├── RelatedTools.tsx
│   ├── JsonLd.tsx
│   └── ToolPageWrapper.tsx
└── lib/                    # Utilities
    ├── seo.ts              # SEO metadata and tool configs
    ├── schemas.ts          # JSON-LD schema generators
    └── image-utils.ts      # Browser image processing
```

## ✨ Features

- **17 SEO-optimized tool pages** with unique titles, descriptions, H1s, and keywords
- **JSON-LD structured data**: FAQ Schema, Breadcrumb Schema, SoftwareApplication Schema
- **100% browser-based processing** — no server uploads
- **Image compression** with adjustable quality
- **Auto-compress to target size** (20KB, 50KB, 100KB, 200KB, 1MB)
- **Format conversion**: WebP, PNG, HEIC, AVIF, JPG
- **Image resizing** with aspect ratio lock
- **Image cropping** with preset aspect ratios
- **Image rotation** (90°, 180°, -90°)
- **Passport photo maker** with country-specific sizes
- **Instagram image resizer** with preset dimensions
- **Mobile-first responsive design**
- **Fast Lighthouse-friendly performance**

## 🧠 SEO Strategy

- Each tool has a unique URL, title, meta description, H1, and keywords
- Internal linking between related tools
- Breadcrumb navigation
- FAQ sections with schema markup
- SoftwareApplication schema for enhanced search results
- Canonical URLs for each page

## 📄 License

MIT
