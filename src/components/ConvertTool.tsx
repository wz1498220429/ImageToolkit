"use client";

import { useState, useCallback } from "react";
import { Loader2, ArrowRightLeft } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  convertImage,
  formatFileSize,
  downloadBlob,
  getExtensionFromMime,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

interface ConvertToolProps {
  fromFormat: string;
  toFormat: string;
  accept?: string;
  outputMime: string;
}

export default function ConvertTool({
  fromFormat,
  toFormat,
  accept,
  outputMime,
}: ConvertToolProps) {
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

  const handleConvert = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const res = await convertImage(file, outputMime);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, outputMime]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = getExtensionFromMime(outputMime);
    downloadBlob(result.blob, `${name}${ext}`);
  }, [result, file, outputMime]);

  const handleReset = useCallback(() => {
    setResult(null);
    setFile(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl("");
  }, [originalUrl]);

  return (
    <div>
      {!file && (
        <UploadZone
          onFileSelect={handleFileSelect}
          accept={accept || "image/*"}
          label={`Upload ${fromFormat} image`}
        />
      )}

      {file && !result && (
        <div className="w-full max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-4 p-4 border border-[var(--color-border)] rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              <img
                src={originalUrl}
                alt={`Original ${fromFormat}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {formatFileSize(file.size)} &middot; {file.type}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 text-sm text-[var(--color-text-muted)]">
            <span className="px-3 py-1 bg-gray-100 rounded-lg font-medium text-[var(--color-text)]">
              {fromFormat}
            </span>
            <ArrowRightLeft className="w-5 h-5 text-[var(--color-primary-600)]" />
            <span className="px-3 py-1 bg-[var(--color-primary-50)] rounded-lg font-medium text-[var(--color-primary-600)]">
              {toFormat}
            </span>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Converting...
              </>
            ) : (
              `Convert to ${toFormat}`
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
