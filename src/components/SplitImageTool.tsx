"use client";

import { useState, useCallback } from "react";
import { Loader2, Download } from "lucide-react";
import UploadZone from "./UploadZone";
import { loadImage, formatFileSize, downloadBlob } from "@/lib/image-utils";

export default function SplitImageTool() {
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileSelect = useCallback((f: File) => {
    setFile(f);
    setPreviews([]);
    URL.revokeObjectURL(originalUrl);
    setOriginalUrl(URL.createObjectURL(f));
  }, [originalUrl]);

  const handleSplit = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = await loadImage(file);
      const pieceW = img.width / cols;
      const pieceH = img.height / rows;
      const urls: string[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const canvas = document.createElement("canvas");
          canvas.width = pieceW;
          canvas.height = pieceH;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, c * pieceW, r * pieceH, pieceW, pieceH, 0, 0, pieceW, pieceH);
          const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
          if (blob) urls.push(URL.createObjectURL(blob));
        }
      }
      setPreviews(urls);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file, rows, cols]);

  const handleDownloadAll = useCallback(() => {
    previews.forEach((url, i) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = `split_${Math.floor(i / cols) + 1}_${(i % cols) + 1}.jpg`;
      a.click();
    });
  }, [previews, cols]);

  const handleReset = useCallback(() => {
    setFile(null); setPreviews([]);
    previews.forEach(URL.revokeObjectURL);
    URL.revokeObjectURL(originalUrl); setOriginalUrl("");
  }, [originalUrl, previews]);

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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rows</label>
              <input type="number" min={1} max={10} value={rows} onChange={(e) => setRows(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Columns</label>
              <input type="number" min={1} max={10} value={cols} onChange={(e) => setCols(Math.max(1, Math.min(10, Number(e.target.value) || 1)))}
                className="w-full px-3 py-2 border rounded-xl text-sm" />
            </div>
          </div>

          <p className="text-xs text-[var(--color-text-muted)] text-center">Result: {rows * cols} pieces ({rows} × {cols} grid)</p>

          <button onClick={handleSplit} disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] disabled:opacity-50">
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Splitting...</> : `Split into ${rows} × ${cols}`}
          </button>

          {previews.length > 0 && (
            <div className="space-y-4">
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
                {previews.map((url, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <img src={url} alt={`Piece ${i + 1}`} className="w-full h-auto" />
                    <p className="text-xs text-center py-1 text-[var(--color-text-muted)]">Row {Math.floor(i / cols) + 1}-{i % cols + 1}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleDownloadAll}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700">
                <Download className="w-5 h-5" /> Download All ({previews.length} files)
              </button>
            </div>
          )}

          <button onClick={handleReset} className="w-full border border-[var(--color-border)] py-3 rounded-xl font-medium hover:bg-gray-50 text-sm">
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
