"use client";

import { useState, useCallback } from "react";
import { Loader2, Instagram } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  resizeImage,
  formatFileSize,
  downloadBlob,
  getExtensionFromMime,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

const INSTAGRAM_SIZES = [
  { label: "Square (1:1)", width: 1080, height: 1080, description: "Feed posts" },
  { label: "Portrait (4:5)", width: 1080, height: 1350, description: "Feed posts" },
  { label: "Landscape (16:9)", width: 1080, height: 608, description: "Feed posts" },
  { label: "Landscape (1.91:1)", width: 1080, height: 566, description: "Feed posts" },
  { label: "Story (9:16)", width: 1080, height: 1920, description: "Stories & Reels" },
  { label: "Profile Photo", width: 320, height: 320, description: "Profile picture" },
  { label: "Thumbnail", width: 420, height: 420, description: "Share thumbnails" },
];

export default function InstagramResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState(INSTAGRAM_SIZES[0]);

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
    },
    [originalUrl]
  );

  const handleResize = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await resizeImage(
        file,
        selectedSize.width,
        selectedSize.height,
        false
      );
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, selectedSize]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = getExtensionFromMime(result.blob.type);
    downloadBlob(result.blob, `${name}_instagram${ext}`);
  }, [result, file]);

  const handleBackToSettings = useCallback(() => {
    setResult(null);
  }, []);

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
              <img
                src={originalUrl}
                alt="Original"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium">
              <Instagram className="w-4 h-4 inline mr-1" />
              Instagram Image Size
            </label>
            <div className="grid gap-2">
              {INSTAGRAM_SIZES.map((size, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedSize(size)}
                  className={`flex items-center justify-between px-4 py-3 border rounded-xl text-left transition-colors ${
                    selectedSize.width === size.width &&
                    selectedSize.height === size.height
                      ? "border-[var(--color-primary-600)] bg-[var(--color-primary-50)]"
                      : "border-[var(--color-border)] hover:bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium">{size.label}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {size.width} x {size.height} &middot; {size.description}
                    </p>
                  </div>
                  <div className="text-xs font-mono text-[var(--color-text-muted)]">
                    {size.width}&times;{size.height}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleResize}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Resizing for Instagram...
              </>
            ) : (
              `Resize to ${selectedSize.width}x${selectedSize.height}`
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
