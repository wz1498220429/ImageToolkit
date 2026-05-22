"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  resizeImage,
  loadImage,
  formatFileSize,
  downloadBlob,
  getExtensionFromMime,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

const PASSPORT_SIZES = [
  { label: "US Passport (2x2 in)", width: 600, height: 600, country: "United States" },
  { label: "UK Passport (35x45mm)", width: 413, height: 531, country: "United Kingdom" },
  { label: "EU Passport (35x45mm)", width: 413, height: 531, country: "European Union" },
  { label: "China Visa (33x48mm)", width: 390, height: 567, country: "China" },
  { label: "India Passport (35x45mm)", width: 413, height: 531, country: "India" },
  { label: "Canada Passport (50x70mm)", width: 590, height: 826, country: "Canada" },
  { label: "Australia Visa (35x45mm)", width: 413, height: 531, country: "Australia" },
  { label: "Japan Passport (35x45mm)", width: 413, height: 531, country: "Japan" },
  { label: "Brazil Passport (35x45mm)", width: 413, height: 531, country: "Brazil" },
  { label: "Singapore Passport (35x45mm)", width: 413, height: 531, country: "Singapore" },
];

const BACKGROUND_COLORS = [
  { label: "White", value: "#ffffff" },
  { label: "Blue", value: "#4a90d9" },
  { label: "Gray", value: "#d4d4d4" },
  { label: "Red", value: "#e74c3c" },
];

export default function PassportPhotoTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState(PASSPORT_SIZES[0]);
  const [bgColor, setBgColor] = useState(BACKGROUND_COLORS[0]);

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
    },
    [originalUrl]
  );

  const handleCreate = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = selectedSize.width;
      canvas.height = selectedSize.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fill background
      ctx.fillStyle = bgColor.value;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Calculate aspect ratio to fit
      const scale = Math.min(
        selectedSize.width / img.width,
        selectedSize.height / img.height
      ) * 0.8;

      const drawW = img.width * scale;
      const drawH = img.height * scale;
      const drawX = (selectedSize.width - drawW) / 2;
      const drawY = (selectedSize.height - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.95)
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
  }, [file, selectedSize, bgColor]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(result.blob, `${name}_passport.jpg`);
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

          <div>
            <label className="block text-sm font-medium mb-2">
              Passport / Visa Size
            </label>
            <select
              value={PASSPORT_SIZES.indexOf(selectedSize)}
              onChange={(e) =>
                setSelectedSize(PASSPORT_SIZES[Number(e.target.value)])
              }
              className="w-full px-3 py-2 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]"
            >
              {PASSPORT_SIZES.map((size, i) => (
                <option key={i} value={i}>
                  {size.label} - {size.country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Background Color
            </label>
            <div className="flex gap-3">
              {BACKGROUND_COLORS.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setBgColor(color)}
                  className={`flex items-center gap-2 px-3 py-2 border rounded-xl text-xs font-medium transition-colors ${
                    bgColor.value === color.value
                      ? "border-[var(--color-primary-600)] bg-[var(--color-primary-50)]"
                      : "border-[var(--color-border)] hover:bg-gray-50"
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.value }}
                  />
                  {color.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating passport photo...
              </>
            ) : (
              "Create Passport Photo"
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
