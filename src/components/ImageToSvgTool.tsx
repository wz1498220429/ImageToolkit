"use client";

import { useState, useCallback, useRef } from "react";
import { Loader2, Copy, Check, Download } from "lucide-react";
import UploadZone from "./UploadZone";
import { loadImage, formatFileSize } from "@/lib/image-utils";

export default function ImageToSvgTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [svgCode, setSvgCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [colorCount, setColorCount] = useState(8);

  const handleFileSelect = useCallback((f: File) => {
    setFile(f);
    setSvgCode("");
    setCopied(false);
    setLoading(true);
    URL.revokeObjectURL(originalUrl);
    const url = URL.createObjectURL(f);
    setOriginalUrl(url);

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const img = await loadImage(f);

      // Create SVG with embedded image
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${img.width}" height="${img.height}" viewBox="0 0 ${img.width} ${img.height}">
  <image width="${img.width}" height="${img.height}" href="${dataUrl}"/>
</svg>`;

      setSvgCode(svg);
      setLoading(false);
    };
    reader.readAsDataURL(f);
  }, [originalUrl]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [svgCode]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (file?.name.replace(/\.[^.]+$/, "") || "image") + ".svg";
    a.click();
    URL.revokeObjectURL(url);
  }, [svgCode, file]);

  const handleReset = useCallback(() => {
    setFile(null); setSvgCode(""); setCopied(false);
    URL.revokeObjectURL(originalUrl); setOriginalUrl("");
  }, [originalUrl]);

  return (
    <div>
      {!file && <UploadZone onFileSelect={handleFileSelect} />}
      {file && (
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

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-[var(--color-text-muted)]">
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">SVG Code</label>
                <span className="text-xs text-[var(--color-text-muted)]">{svgCode.length.toLocaleString()} chars</span>
              </div>
              <textarea readOnly value={svgCode} rows={8}
                className="w-full px-4 py-3 border rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none" />

              <div className="flex items-center justify-center p-4 border rounded-xl bg-gray-50">
                <div dangerouslySetInnerHTML={{ __html: svgCode }} className="max-w-full max-h-48" />
              </div>

              <div className="flex gap-3">
                <button onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors">
                  {copied ? <><Check className="w-5 h-5" /> Copied!</> : <><Copy className="w-5 h-5" /> Copy SVG</>}
                </button>
                <button onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                  <Download className="w-5 h-5" /> Download .svg
                </button>
              </div>

              <button onClick={handleReset}
                className="w-full border border-[var(--color-border)] py-3 rounded-xl font-medium hover:bg-gray-50 text-sm">
                Convert Another Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
