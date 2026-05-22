"use client";

import { useState, useCallback } from "react";
import { Loader2, Sliders } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import { compressImage, formatFileSize, downloadBlob, getExtensionFromMime } from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

export default function CompressTool() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(80);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");

  const handleFileSelect = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl(URL.createObjectURL(f));
  }, [originalUrl]);

  const handleCompress = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await compressImage(file, quality / 100);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, quality]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = getExtensionFromMime(result.blob.type);
    downloadBlob(result.blob, `${name}_compressed${ext}`);
  }, [result, file]);

  const handleReset = useCallback(() => {
    setResult(null);
    setFile(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl("");
  }, [originalUrl]);

  return (
    <div>
      {!file && (
        <UploadZone onFileSelect={handleFileSelect} />
      )}

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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Sliders className="w-4 h-4" />
                Quality: {quality}%
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">
                Lower = smaller file
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[var(--color-primary-600)]"
            />
            <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
              <span>Small size</span>
              <span>Best quality</span>
            </div>
          </div>

          <button
            onClick={handleCompress}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Compressing...
              </>
            ) : (
              "Compress Image"
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
