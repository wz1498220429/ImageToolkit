"use client";

import { useState, useCallback, useRef } from "react";
import { Loader2, Copy, Check } from "lucide-react";
import UploadZone from "./UploadZone";
import { loadImage, formatFileSize } from "@/lib/image-utils";

export default function ColorPickerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  const [color, setColor] = useState<{ hex: string; rgb: string; hsl: string; x: number; y: number } | null>(null);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = useCallback(async (f: File) => {
    setFile(f);
    setColor(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl(URL.createObjectURL(f));
    const img = await loadImage(f);
    setImgDims({ w: img.width, h: img.height });
  }, [originalUrl]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pixel = ctx.getImageData(x, y, 1, 1).data;

    const r = pixel[0], g = pixel[1], b = pixel[2];
    const hex = "#" + [r, g, b].map(v => v.toString(16).padStart(2, "0")).join("");
    const rgb = `rgb(${r}, ${g}, ${b})`;

    // RGB to HSL
    const rr = r / 255, gg = g / 255, bb = b / 255;
    const max = Math.max(rr, gg, bb), min = Math.min(rr, gg, bb);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === rr) h = ((gg - bb) / d + (gg < bb ? 6 : 0)) * 60;
      else if (max === gg) h = ((bb - rr) / d + 2) * 60;
      else h = ((rr - gg) / d + 4) * 60;
    }
    const hsl = `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;

    setColor({ hex, rgb, hsl, x, y });
  }, []);

  const handleCopy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }, []);

  const handleReset = useCallback(() => {
    setFile(null);
    setColor(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl("");
  }, [originalUrl]);

  return (
    <div>
      {!file && <UploadZone onFileSelect={handleFileSelect} />}

      {file && (
        <div className="w-full max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-4 p-4 border border-[var(--color-border)] rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              <canvas ref={canvasRef} width={48} height={48} className="hidden" />
              <img src={originalUrl} alt="Original" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{imgDims.w} x {imgDims.h} · {formatFileSize(file.size)}</p>
            </div>
          </div>

          <p className="text-sm text-center text-[var(--color-text-muted)]">Click anywhere on the image to pick a color</p>

          <div className="relative bg-gray-100 rounded-xl overflow-hidden" ref={containerRef}>
            <canvas
              ref={canvasRef}
              width={imgDims.w}
              height={imgDims.h}
              onClick={handleClick}
              className="w-full h-auto cursor-crosshair"
              style={{ display: imgDims.w ? "block" : "none" }}
            />
            <img
              src={originalUrl}
              alt="Pick color from"
              className={`w-full h-auto ${imgDims.w ? "hidden" : "block"}`}
              onLoad={() => {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;
                const img = new Image();
                img.onload = () => { ctx.drawImage(img, 0, 0); };
                img.src = originalUrl;
              }}
              draggable={false}
            />
          </div>

          {color && (
            <div className="p-4 border border-[var(--color-border)] rounded-xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border" style={{ backgroundColor: color.hex }} />
                <div>
                  <p className="text-xs text-[var(--color-text-muted)]">Clicked at ({color.x}, {color.y})</p>
                </div>
              </div>
              {[
                { label: "HEX", value: color.hex },
                { label: "RGB", value: color.rgb },
                { label: "HSL", value: color.hsl },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[var(--color-text-muted)] w-8">{item.label}</span>
                    <span className="text-sm font-mono">{item.value}</span>
                  </div>
                  <button onClick={() => handleCopy(item.value)} className="p-1 hover:bg-gray-200 rounded transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-[var(--color-text-muted)]" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          <button onClick={handleReset} className="w-full border border-[var(--color-border)] text-[var(--color-text)] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
            Choose Another Image
          </button>
        </div>
      )}
    </div>
  );
}
