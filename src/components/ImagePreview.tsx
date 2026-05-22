"use client";

import { Download, RotateCw } from "lucide-react";

interface ImagePreviewProps {
  src: string;
  originalSize: string;
  compressedSize: string;
  onDownload: () => void;
  onReset: () => void;
  originalName: string;
}

export default function ImagePreview({
  src,
  originalSize,
  compressedSize,
  onDownload,
  onReset,
  originalName,
}: ImagePreviewProps) {
  const saved = originalSize && compressedSize
    ? calculateSavings(originalSize, compressedSize)
    : null;

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden">
        <div className="relative aspect-video bg-gray-100 flex items-center justify-center p-4">
          <img
            src={src}
            alt="Processed image preview"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-[var(--color-surface-alt)] rounded-xl">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                Original
              </p>
              <p className="text-lg font-bold text-[var(--color-text)]">
                {originalSize}
              </p>
            </div>
            <div className="text-center p-3 bg-[var(--color-primary-50)] rounded-xl">
              <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                Compressed
              </p>
              <p className="text-lg font-bold text-[var(--color-primary-600)]">
                {compressedSize}
              </p>
            </div>
          </div>

          {saved && (
            <div className="text-center">
              <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                Saved {saved}
              </span>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={onDownload}
              className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={onReset}
              className="flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              <RotateCw className="w-5 h-5" />
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateSavings(original: string, compressed: string): string | null {
  const parseSize = (s: string): number => {
    const match = s.match(/([\d.]+)\s*(B|KB|MB)/);
    if (!match) return 0;
    const val = parseFloat(match[1]);
    const unit = match[2];
    if (unit === "KB") return val * 1024;
    if (unit === "MB") return val * 1024 * 1024;
    return val;
  };

  const orig = parseSize(original);
  const comp = parseSize(compressed);
  if (!orig || !comp) return null;

  const pct = Math.round((1 - comp / orig) * 100);
  if (pct <= 0) return null;
  return `${pct}%`;
}
