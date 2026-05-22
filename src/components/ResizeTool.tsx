"use client";

import { useState, useCallback } from "react";
import { Loader2, Maximize2 } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  resizeImage,
  formatFileSize,
  downloadBlob,
  getExtensionFromMime,
  loadImage,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

export default function ResizeTool() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [originalDimensions, setOriginalDimensions] = useState({ w: 0, h: 0 });

  const handleFileSelect = useCallback(
    async (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));

      const img = await loadImage(f);
      setOriginalDimensions({ w: img.width, h: img.height });
      setWidth(img.width);
      setHeight(img.height);
    },
    [originalUrl]
  );

  const handleWidthChange = useCallback(
    (val: number) => {
      setWidth(val);
      if (lockAspect && originalDimensions.w > 0) {
        setHeight(Math.round(val * (originalDimensions.h / originalDimensions.w)));
      }
    },
    [lockAspect, originalDimensions]
  );

  const handleHeightChange = useCallback(
    (val: number) => {
      setHeight(val);
      if (lockAspect && originalDimensions.h > 0) {
        setWidth(Math.round(val * (originalDimensions.w / originalDimensions.h)));
      }
    },
    [lockAspect, originalDimensions]
  );

  const handleResize = useCallback(async () => {
    if (!file || !width || !height) return;
    setLoading(true);
    try {
      const res = await resizeImage(file, width, height, false);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, width, height]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = getExtensionFromMime(result.blob.type);
    downloadBlob(result.blob, `${name}_${width}x${height}${ext}`);
  }, [result, file, width, height]);

  const handleReset = useCallback(() => {
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
                {originalDimensions.w} x {originalDimensions.h} &middot;{" "}
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span className="text-sm font-medium">
                New Dimensions
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                  Width (px)
                </label>
                <input
                  type="number"
                  min="1"
                  value={width || ""}
                  onChange={(e) =>
                    handleWidthChange(Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
              </div>
              <div>
                <label className="block text-xs text-[var(--color-text-muted)] mb-1">
                  Height (px)
                </label>
                <input
                  type="number"
                  min="1"
                  value={height || ""}
                  onChange={(e) =>
                    handleHeightChange(Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] cursor-pointer">
              <input
                type="checkbox"
                checked={lockAspect}
                onChange={(e) => setLockAspect(e.target.checked)}
                className="rounded border-[var(--color-border)] text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)]"
              />
              Maintain aspect ratio
            </label>
          </div>

          <button
            onClick={handleResize}
            disabled={loading || !width || !height}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Resizing...
              </>
            ) : (
              "Resize Image"
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
          onReset={handleReset}
          originalName={file.name}
        />
      )}
    </div>
  );
}
