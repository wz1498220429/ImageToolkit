"use client";

import { useState, useCallback } from "react";
import { Loader2, AlertCircle, RotateCw } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  compressToTargetSize,
  formatFileSize,
  downloadBlob,
  getExtensionFromMime,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

interface CompressToSizeToolProps {
  targetKB: number;
  targetLabel: string;
}

export default function CompressToSizeTool({
  targetKB,
  targetLabel,
}: CompressToSizeToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>("");

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      setResult(null);
      setError(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
    },
    [originalUrl]
  );

  const handleCompress = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const res = await compressToTargetSize(file, targetKB * 1024);
      setResult(res);
    } catch (err: any) {
      const smallest = err.smallestFormatted;
      setError(
        smallest
          ? `Could not reach ${targetLabel}. Smallest possible: ${smallest}. Try a smaller image or reduce dimensions first.`
          : `Failed to compress to target size. Try a smaller image or reduce dimensions first.`
      );
    } finally {
      setLoading(false);
    }
  }, [file, targetKB, targetLabel]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = getExtensionFromMime(result.blob.type);
    downloadBlob(result.blob, `${name}_${targetLabel.replace(" ", "")}${ext}`);
  }, [result, file, targetLabel]);

  const handleReset = useCallback(() => {
    setResult(null);
    setFile(null);
    setError(null);
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
              {file.type === "image/png" && (
                <p className="text-xs text-amber-600 mt-1">
                  PNG will be converted to JPEG for compression
                </p>
              )}
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
                Compressing to {targetLabel}...
              </>
            ) : (
              `Compress to ${targetLabel}`
            )}
          </button>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">{error}</p>
                <p className="text-xs text-amber-600 mt-1">
                  Try again with a different quality or reduce the image
                  dimensions first.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {result && file && (
        <div>
          <ImagePreview
            src={result.url}
            originalSize={formatFileSize(file.size)}
            compressedSize={result.sizeFormatted}
            onDownload={handleDownload}
            onReset={handleReset}
            originalName={file.name}
          />
          {error && (
            <div className="w-full max-w-xl mx-auto mt-4">
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">{error}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
