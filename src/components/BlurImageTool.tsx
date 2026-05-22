"use client";

import { useState, useCallback } from "react";
import { Loader2, Sliders } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  loadImage,
  formatFileSize,
  downloadBlob,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

export default function BlurImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [blurAmount, setBlurAmount] = useState(5);

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
    },
    [originalUrl]
  );

  const handleBlur = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      // Apply blur filter
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0);
      ctx.filter = "none";

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
  }, [file, blurAmount]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(result.blob, `${name}_blurred.jpg`);
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

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Sliders className="w-4 h-4" />
                Blur Intensity: {blurAmount}px
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={blurAmount}
              onChange={(e) => setBlurAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[var(--color-primary-600)]"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
              <span>Light</span>
              <span>Strong</span>
            </div>
          </div>

          <button
            onClick={handleBlur}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Blurring...</>
            ) : (
              "Blur Image"
            )}
          </button>
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
