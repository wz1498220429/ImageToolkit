"use client";

import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import UploadZone from "./UploadZone";
import ImagePreview from "./ImagePreview";
import {
  loadImage,
  formatFileSize,
  downloadBlob,
} from "@/lib/image-utils";
import type { CompressResult } from "@/lib/image-utils";

const POSITIONS = [
  { label: "Top Left", value: "tl" },
  { label: "Top Right", value: "tr" },
  { label: "Bottom Left", value: "bl" },
  { label: "Bottom Right", value: "br" },
  { label: "Center", value: "cc" },
];

export default function WatermarkTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [watermarkText, setWatermarkText] = useState("© ImageToolkit");
  const [opacity, setOpacity] = useState(40);
  const [position, setPosition] = useState("br");
  const [fontSize, setFontSize] = useState(24);

  const handleFileSelect = useCallback((f: File) => {
    setFile(f);
    setResult(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl(URL.createObjectURL(f));
  }, [originalUrl]);

  const handleAddWatermark = useCallback(async () => {
    if (!file || !watermarkText) return;
    setLoading(true);
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = opacity / 100;
      ctx.fillStyle = "#ffffff";
      ctx.font = `bold ${fontSize * (canvas.width / 800)}px sans-serif`;
      ctx.textAlign = "center";

      const textW = ctx.measureText(watermarkText).width;
      const textH = fontSize * (canvas.width / 800);
      const pad = 20 * (canvas.width / 800);

      let x: number, y: number;
      const halfW = canvas.width / 2;
      const halfH = canvas.height / 2;

      switch (position) {
        case "tl": x = pad + textW / 2; y = pad + textH; break;
        case "tr": x = canvas.width - pad - textW / 2; y = pad + textH; break;
        case "bl": x = pad + textW / 2; y = canvas.height - pad; break;
        case "br": x = canvas.width - pad - textW / 2; y = canvas.height - pad; break;
        case "cc": x = halfW; y = halfH + textH / 2; break;
        default: x = halfW; y = halfH + textH / 2;
      }

      ctx.fillText(watermarkText, x, y);
      ctx.globalAlpha = 1;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg", 0.95)
      );
      if (!blob) return;

      setResult({
        blob, size: blob.size,
        sizeFormatted: formatFileSize(blob.size),
        url: URL.createObjectURL(blob),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, watermarkText, opacity, position, fontSize]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    downloadBlob(result.blob, `${name}_watermarked.jpg`);
  }, [result, file]);

  const handleBackToSettings = useCallback(() => setResult(null), []);
  const handleRemoveImage = useCallback(() => {
    setResult(null); setFile(null);
    URL.revokeObjectURL(originalUrl); setOriginalUrl("");
  }, [originalUrl]);

  return (
    <div>
      {!file && <UploadZone onFileSelect={handleFileSelect} />}
      {file && !result && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-4 p-4 border rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              <img src={originalUrl} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{formatFileSize(file.size)}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Watermark Text</label>
            <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)}
              className="w-full px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Opacity: {opacity}%</label>
              <input type="range" min="10" max="100" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-[var(--color-primary-600)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Size: {fontSize}px</label>
              <input type="range" min="12" max="72" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-[var(--color-primary-600)]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Position</label>
            <div className="flex flex-wrap gap-2">
              {POSITIONS.map((p) => (
                <button key={p.value} onClick={() => setPosition(p.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${position === p.value ? "bg-[var(--color-primary-600)] text-white" : "hover:bg-gray-50"}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAddWatermark} disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Adding...</> : "Add Watermark"}
          </button>
        </div>
      )}
      {result && file && (
        <ImagePreview src={result.url} originalSize={formatFileSize(file.size)} compressedSize={result.sizeFormatted}
          onDownload={handleDownload} onBackToSettings={handleBackToSettings} onRemoveImage={handleRemoveImage} originalName={file.name} />
      )}
    </div>
  );
}
