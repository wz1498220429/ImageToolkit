"use client";

import { useState, useCallback, useRef } from "react";
import { Loader2, Crop as CropIcon, X } from "lucide-react";
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

interface CropRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Clamp a value between min and max */
function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export default function CropTool() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [imgDims, setImgDims] = useState({ w: 0, h: 0 });
  const [ratio, setRatio] = useState(0);
  const [sel, setSel] = useState<CropRect>({ x: 0, y: 0, w: 0, h: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Interaction state (mutable refs to avoid stale closure issues)
  const dragRef = useRef<{
    mode: "idle" | "draw" | "move";
    startX: number; // display-pixel coords
    startY: number;
    selStartX: number; // image coords of selection when move started
    selStartY: number;
  }>({ mode: "idle", startX: 0, startY: 0, selStartX: 0, selStartY: 0 });

  // ── helpers ──────────────────────────────────────────

  /** Convert display-pixel coords → image coords */
  const toImg = useCallback(
    (displayX: number, displayY: number) => {
      if (!containerRef.current || !imgDims.w) return { x: 0, y: 0 };
      const rect = containerRef.current.getBoundingClientRect();
      const sx = imgDims.w / rect.width;
      const sy = imgDims.h / rect.height;
      return { x: displayX * sx, y: displayY * sy };
    },
    [imgDims]
  );

  /** Build a clamped crop rectangle from two image-coordinate points */
  const makeRect = useCallback(
    (ax: number, ay: number, bx: number, by: number, ar: number): CropRect => {
      let left = Math.min(ax, bx);
      let top = Math.min(ay, by);
      let w = Math.abs(bx - ax);
      let h = Math.abs(by - ay);

      // Apply aspect ratio (derive h from w, then clamp)
      if (ar > 0) {
        h = w / ar;
        // If h exceeds image, recompute from h instead
        if (top + h > imgDims.h) {
          const maxH = imgDims.h - top;
          h = maxH;
          w = h * ar;
        }
      }

      // Clamp to image bounds
      left = clamp(left, 0, imgDims.w);
      top = clamp(top, 0, imgDims.h);
      w = clamp(w, 1, imgDims.w - left);
      h = clamp(h, 1, imgDims.h - top);

      return { x: left, y: top, w, h };
    },
    [imgDims]
  );

  // ── event handlers ───────────────────────────────────

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !imgDims.w) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = e.clientX - rect.left;
      const dy = e.clientY - rect.top;
      const img = toImg(dx, dy);

      // If selection covers the entire image (e.g. just switched to Free),
      // treat click as drawing a new selection, not moving.
      const fullSel =
        sel.x === 0 && sel.y === 0 && sel.w === imgDims.w && sel.h === imgDims.h;

      // If an existing selection exists (not full-image), check if click is inside → move
      if (!fullSel && sel.w > 0 && sel.h > 0) {
        if (
          img.x >= sel.x &&
          img.x <= sel.x + sel.w &&
          img.y >= sel.y &&
          img.y <= sel.y + sel.h
        ) {
          dragRef.current = {
            mode: "move",
            startX: dx,
            startY: dy,
            selStartX: sel.x,
            selStartY: sel.y,
          };
          return;
        }
      }

      // Otherwise start drawing a new selection
      dragRef.current = {
        mode: "draw",
        startX: dx,
        startY: dy,
        selStartX: 0,
        selStartY: 0,
      };
    },
    [imgDims, sel, toImg]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const dr = dragRef.current;
      if (dr.mode === "idle" || !containerRef.current || !imgDims.w) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dx = e.clientX - rect.left;
      const dy = e.clientY - rect.top;

      if (dr.mode === "draw") {
        const img = toImg(dx, dy);
        const startImg = toImg(dr.startX, dr.startY);
        setSel(makeRect(startImg.x, startImg.y, img.x, img.y, ratio));
      } else if (dr.mode === "move") {
        const delta = toImg(dx - dr.startX, dy - dr.startY);
        const newX = clamp(dr.selStartX + delta.x, 0, imgDims.w - sel.w);
        const newY = clamp(dr.selStartY + delta.y, 0, imgDims.h - sel.h);
        setSel((s) => ({ ...s, x: newX, y: newY }));
      }
    },
    [imgDims, sel, ratio, toImg, makeRect]
  );

  const handleMouseUp = useCallback(() => {
    dragRef.current.mode = "idle";
  }, []);

  // ── file load ────────────────────────────────────────

  const handleFileSelect = useCallback(
    async (f: File) => {
      setFile(f);
      setResult(null);
      URL.revokeObjectURL(originalUrl);
      const url = URL.createObjectURL(f);
      setOriginalUrl(url);
      const img = await loadImage(f);
      setImgDims({ w: img.width, h: img.height });
      setSel({ x: 0, y: 0, w: img.width, h: img.height });
    },
    [originalUrl]
  );

  // ── aspect ratio change ──────────────────────────────

  const handleRatioChange = useCallback(
    (ar: number) => {
      setRatio(ar);
      if (ar > 0 && sel.h > 0) {
        // Adjust selection to fit new aspect ratio, anchored at top-left
        let h = sel.h;
        let w = h * ar;
        if (sel.x + w > imgDims.w) {
          w = imgDims.w - sel.x;
          h = w / ar;
        }
        if (sel.y + h > imgDims.h) {
          h = imgDims.h - sel.y;
          w = h * ar;
        }
        setSel({ ...sel, w: Math.max(1, w), h: Math.max(1, h) });
      }
      // Free mode (ar === 0): don't touch the selection, keep whatever the user drew
    },
    [sel, imgDims]
  );

  // ── cancel selection ─────────────────────────────────

  const handleCancel = useCallback(() => {
    setSel({ x: 0, y: 0, w: 0, h: 0 });
  }, []);

  // ── crop action ──────────────────────────────────────

  const handleCropImage = useCallback(async () => {
    if (!file || !sel.w || !sel.h) return;
    setLoading(true);
    try {
      const res = await cropImage(
        file,
        Math.round(sel.x),
        Math.round(sel.y),
        Math.round(sel.w),
        Math.round(sel.h)
      );
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, sel]);

  const handleDownload = useCallback(() => {
    if (!result || !file) return;
    const name = file.name.replace(/\.[^.]+$/, "");
    const ext = getExtensionFromMime(result.blob.type);
    downloadBlob(result.blob, `${name}_cropped${ext}`);
  }, [result, file]);

  const handleBackToSettings = useCallback(() => setResult(null), []);
  const handleRemoveImage = useCallback(() => {
    setResult(null);
    setFile(null);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl("");
  }, [originalUrl]);

  // ── render ───────────────────────────────────────────

  return (
    <div>
      {!file && <UploadZone onFileSelect={handleFileSelect} />}

      {file && !result && (
        <div className="w-full max-w-xl mx-auto space-y-6">
          {/* File info */}
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
                {imgDims.w} x {imgDims.h}
              </p>
            </div>
          </div>

          {/* Aspect ratio buttons */}
          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIOS.map((r) => (
              <button
                key={r.label}
                onClick={() => handleRatioChange(r.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  ratio === r.value
                    ? "bg-[var(--color-primary-600)] text-white border-[var(--color-primary-600)]"
                    : "border-[var(--color-border)] hover:bg-gray-50"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Crop canvas */}
          <div
            ref={containerRef}
            className="relative bg-gray-100 rounded-xl overflow-hidden select-none"
            style={{ maxHeight: "400px", cursor: sel.w > 0 ? "move" : "crosshair" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              src={originalUrl}
              alt="Image to crop"
              className="w-full h-auto pointer-events-none"
              draggable={false}
            />
            {/* Selection overlay — dim everything outside */}
            {sel.w > 0 && sel.h > 0 && (
              <>
                {/* Dimmed overlay */}
                <div
                  className="absolute inset-0 bg-black/40 pointer-events-none"
                  style={{
                    clipPath: `polygon(
                      0% 0%,
                      100% 0%,
                      100% 100%,
                      0% 100%,
                      0% 0%,
                      ${(sel.x / imgDims.w) * 100}% ${(sel.y / imgDims.h) * 100}%,
                      ${(sel.x / imgDims.w) * 100}% ${((sel.y + sel.h) / imgDims.h) * 100}%,
                      ${((sel.x + sel.w) / imgDims.w) * 100}% ${((sel.y + sel.h) / imgDims.h) * 100}%,
                      ${((sel.x + sel.w) / imgDims.w) * 100}% ${(sel.y / imgDims.h) * 100}%,
                      ${(sel.x / imgDims.w) * 100}% ${(sel.y / imgDims.h) * 100}%
                    )`,
                  }}
                />
                {/* Bright selection border */}
                <div
                  className="absolute border-2 border-white pointer-events-none"
                  style={{
                    left: `${(sel.x / imgDims.w) * 100}%`,
                    top: `${(sel.y / imgDims.h) * 100}%`,
                    width: `${(sel.w / imgDims.w) * 100}%`,
                    height: `${(sel.h / imgDims.h) * 100}%`,
                    boxShadow: "0 0 0 1px rgba(59,130,246,0.5)",
                  }}
                />
                {/* Corner handles */}
                {[
                  { left: `${(sel.x / imgDims.w) * 100}%`, top: `${(sel.y / imgDims.h) * 100}%` },
                  { left: `${((sel.x + sel.w) / imgDims.w) * 100}%`, top: `${(sel.y / imgDims.h) * 100}%` },
                  { left: `${(sel.x / imgDims.w) * 100}%`, top: `${((sel.y + sel.h) / imgDims.h) * 100}%` },
                  { left: `${((sel.x + sel.w) / imgDims.w) * 100}%`, top: `${((sel.y + sel.h) / imgDims.h) * 100}%` },
                ].map((pos, i) => (
                  <div
                    key={i}
                    className="absolute w-4 h-4 bg-white border-2 border-[var(--color-primary-500)] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ left: pos.left, top: pos.top }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Info + actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-[var(--color-text-muted)]">
              {sel.w > 0 && sel.h > 0
                ? `${Math.round(sel.w)} × ${Math.round(sel.h)} px`
                : "Click and drag to select crop area"}
            </p>

            {(sel.w > 0 && sel.h > 0) && (
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-medium"
              >
                <X className="w-3.5 h-3.5" />
                Cancel selection
              </button>
            )}
          </div>

          {/* Crop button */}
          <button
            onClick={handleCropImage}
            disabled={loading || !sel.w || !sel.h}
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
          onBackToSettings={handleBackToSettings}
          onRemoveImage={handleRemoveImage}
          originalName={file.name}
        />
      )}
    </div>
  );
}
