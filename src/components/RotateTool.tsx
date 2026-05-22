"use client";

import { useState, useCallback } from "react";
import { Loader2, RotateCcw, RotateCw, ArrowLeftRight } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  rotateImage,
  formatFileSize,
  downloadBlob,
  getExtensionFromMime,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

export default function RotateTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
    },
    [originalUrl]
  );

  const handleRotate = useCallback(
    async (angle: number) => {
      if (!file) return;
      setLoading(true);
      try {
        const res = await rotateImage(file, angle);
        setResult(res);
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
    const ext = getExtensionFromMime(result.blob.type);
    downloadBlob(result.blob, `${name}_rotated${ext}`);
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

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleRotate(-90)}
              disabled={loading}
              className="flex flex-col items-center gap-2 p-4 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RotateCcw className="w-6 h-6" />
              <span className="text-xs font-medium">Rotate Left</span>
            </button>
            <button
              onClick={() => handleRotate(90)}
              disabled={loading}
              className="flex flex-col items-center gap-2 p-4 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RotateCw className="w-6 h-6" />
              <span className="text-xs font-medium">Rotate Right</span>
            </button>
            <button
              onClick={() => handleRotate(180)}
              disabled={loading}
              className="flex flex-col items-center gap-2 p-4 border border-[var(--color-border)] rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ArrowLeftRight className="w-6 h-6" />
              <span className="text-xs font-medium">Flip 180&deg;</span>
            </button>
          </div>

          {loading && (
            <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-text-muted)]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Rotating...
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
