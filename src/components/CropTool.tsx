"use client";

import { useState, useCallback, useRef } from "react";
import { Loader2, Crop as CropIcon } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  cropImage,
  formatFileSize,
  downloadBlob,
  getExtensionFromMime,
  loadImage,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

const ASPECT_RATIOS = [
  { label: "Free", value: 0 },
  { label: "1:1 Square", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

export default function CropTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [imgDimensions, setImgDimensions] = useState({ w: 0, h: 0 });
  const [selectedRatio, setSelectedRatio] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = useCallback(
    async (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
      const img = await loadImage(f);
      setImgDimensions({ w: img.width, h: img.height });
      setCrop({
        x: 0,
        y: 0,
        w: img.width,
        h: img.height,
      });
    },
    [originalUrl]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setIsDragging(true);
      setDragStart({ x, y });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current || !imgDimensions.w) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scale = imgDimensions.w / rect.width;

      let w = (e.clientX - rect.left - dragStart.x) * scale;
      let h = (e.clientY - rect.top - dragStart.y) * scale;

      if (w < 0) {
        w = Math.abs(w);
        setCrop((c) => ({
          ...c,
          x: Math.max(0, dragStart.x * scale - w),
        }));
      } else {
        setCrop((c) => ({
          ...c,
          x: Math.max(0, dragStart.x * scale),
        }));
      }
      if (h < 0) {
        h = Math.abs(h);
        setCrop((c) => ({ ...c, y: Math.max(0, dragStart.y * scale - h) }));
      } else {
        setCrop((c) => ({ ...c, y: Math.max(0, dragStart.y * scale) }));
      }

      if (selectedRatio > 0) {
        h = w / selectedRatio;
      }

      setCrop((c) => ({
        ...c,
        w: Math.min(w, imgDimensions.w - c.x),
        h: Math.min(h, imgDimensions.h - c.y),
      }));
    },
    [isDragging, dragStart, selectedRatio, imgDimensions]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleAspectChange = useCallback(
    (ratio: number) => {
      setSelectedRatio(ratio);
      if (ratio > 0 && crop.h > 0) {
        const newW = crop.h * ratio;
        setCrop((c) => ({
          ...c,
          w: Math.min(newW, imgDimensions.w - c.x),
        }));
      }
    },
    [crop, imgDimensions]
  );

  const handleCropImage = useCallback(async () => {
    if (!file || !crop.w || !crop.h) return;
    setLoading(true);
    try {
      const res = await cropImage(
        file,
        Math.round(crop.x),
        Math.round(crop.y),
        Math.round(crop.w),
        Math.round(crop.h)
      );
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, crop]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = getExtensionFromMime(result.blob.type);
    downloadBlob(result.blob, `${name}_cropped${ext}`);
  }, [result, file]);

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
                {imgDimensions.w} x {imgDimensions.h}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.label}
                onClick={() => handleAspectChange(ratio.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  selectedRatio === ratio.value
                    ? "bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]"
                    : "border-[var(--color-border)] hover:bg-gray-50"
                }`}
              >
                {ratio.label}
              </button>
            ))}
          </div>

          <div
            ref={containerRef}
            className="relative bg-gray-100 rounded-xl overflow-hidden cursor-crosshair"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ maxHeight: "400px" }}
          >
            <img
              src={originalUrl}
              alt="Image to crop"
              className="w-full h-auto"
              draggable={false}
            />
            {crop.w > 0 && crop.h > 0 && (
              <div
                className="absolute border-2 border-[var(--color-primary-500)] bg-[var(--color-primary-500)]/10"
                style={{
                  left: `${(crop.x / imgDimensions.w) * 100}%`,
                  top: `${(crop.y / imgDimensions.h) * 100}%`,
                  width: `${(crop.w / imgDimensions.w) * 100}%`,
                  height: `${(crop.h / imgDimensions.h) * 100}%`,
                }}
              />
            )}
          </div>

          <div className="text-center text-sm text-[var(--color-text-muted)]">
            {crop.w > 0 && crop.h > 0
              ? `${Math.round(crop.w)} x ${Math.round(crop.h)} px`
              : "Click and drag to select crop area"}
          </div>

          <button
            onClick={handleCropImage}
            disabled={loading || !crop.w || !crop.h}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Cropping...
              </>
            ) : (
              <>
                <CropIcon className="w-5 h-5" />
                Crop Image
              </>
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
