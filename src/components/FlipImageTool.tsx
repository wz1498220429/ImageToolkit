"use client";

import { useState, useCallback } from "react";
import { Loader2, ArrowLeftRight, ArrowUpDown } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  loadImage,
  formatFileSize,
  downloadBlob,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

export default function FlipImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
    },
    [originalUrl]
  );

  const handleFlip = useCallback(
    async (horizontal: boolean) => {
      if (!file) return;
      setLoading(true);
      try {
        const img = await loadImage(file);
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.translate(
          horizontal ? canvas.width : 0,
          horizontal ? 0 : canvas.height
        );
        ctx.scale(horizontal ? -1 : 1, horizontal ? 1 : -1);
        ctx.drawImage(img, 0, 0);

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", 0.92)
        );
        if (!blob) return;

        setResult({
          blob,
          size: blob.size,
          sizeFormatted: formatFileSize(blob.size),
          url: URL.createObjectURL(blob),
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [file]
  );

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(result.blob, `${name}_flipped.jpg`);
  }, [result, file]);

  const handleBackToSettings = useCallback(() => setResult(null), []);
  const handleRemoveImage = useCallback(() => {
    setResult(null);
    setFile(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl("");
  }, [originalUrl]);

  return (
    <div>
      {!file && <UploadZone onFileSelect={handleFileSelect} />}

      {file && !result && (
        <div className="w-full max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-4 p-4 border border-[var(--color-border)] rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              <img src={originalUrl} alt="Original" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{formatFileSize(file.size)}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleFlip(true)}
              disabled={loading}
              className="flex flex-col items-center gap-3 p-6 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ArrowLeftRight className="w-8 h-8 text-[var(--color-primary-600)]" />
              <span className="text-sm font-medium">Flip Horizontally</span>
              <span className="text-xs text-[var(--color-text-muted)]">Mirror image</span>
            </button>
            <button
              onClick={() => handleFlip(false)}
              disabled={loading}
              className="flex flex-col items-center gap-3 p-6 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ArrowUpDown className="w-8 h-8 text-[var(--color-primary-600)]" />
              <span className="text-sm font-medium">Flip Vertically</span>
              <span className="text-xs text-[var(--color-text-muted)]">Upside down</span>
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Flipping...
            </div>
          )}
        </div>
      )}

      {result && file && (
        <ImagePreview
          src={result.url}
          originalSize={formatFileSize(file.size)}
          compressedSize={result.sizeFormatted}
          onDownload={handleDownload}
          onBackToSettings={handleBackToSettings}
          onRemoveImage={handleRemoveImage}
          originalName={file.name}
        />
      )}
    </div>
  );
}
