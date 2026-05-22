"use client";

import { useState, useCallback } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import UploadZone from "./UploadZone";
import { loadImage, formatFileSize, downloadBlob } from "@/lib/image-utils";

type MergeMode = "horizontal" | "vertical" | "overlay";

export default function MergeImagesTool() {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [mode, setMode] = useState<MergeMode>("horizontal");
  const [loading, setLoading] = useState(false);

  const handleFile1 = useCallback((f: File) => {
    setFile1(f);
    URL.revokeObjectURL(url1);
    setUrl1(URL.createObjectURL(f));
  }, [url1]);

  const handleFile2 = useCallback((f: File) => {
    setFile2(f);
    URL.revokeObjectURL(url2);
    setUrl2(URL.createObjectURL(f));
  }, [url2]);

  const handleMerge = useCallback(async () => {
    if (!file1 || !file2) return;
    setLoading(true);
    try {
      const [img1, img2] = await Promise.all([loadImage(file1), loadImage(file2)]);
      const canvas = document.createElement("canvas");

      if (mode === "horizontal") {
        canvas.width = img1.width + img2.width;
        canvas.height = Math.max(img1.height, img2.height);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, img1.width, 0);
      } else if (mode === "vertical") {
        canvas.width = Math.max(img1.width, img2.width);
        canvas.height = img1.height + img2.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img1, 0, 0);
        ctx.drawImage(img2, 0, img1.height);
      } else {
        canvas.width = Math.max(img1.width, img2.width);
        canvas.height = Math.max(img1.height, img2.height);
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img1, 0, 0);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(img2, 0, 0);
      }

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.92));
      if (!blob) return;
      downloadBlob(blob, "merged_image.jpg");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file1, file2, mode]);

  const handleReset = useCallback(() => {
    setFile1(null); setFile2(null);
    URL.revokeObjectURL(url1); URL.revokeObjectURL(url2);
    setUrl1(""); setUrl2("");
  }, [url1, url2]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">First Image</p>
          {!file1 ? (
            <div className="h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:border-[var(--color-primary-400)] hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById("f1")?.click()}>
              <span className="text-xs text-[var(--color-text-muted)]">Click to upload</span>
            </div>
          ) : (
            <div className="border rounded-xl overflow-hidden">
              <img src={url1} alt="" className="w-full h-32 object-cover" />
            </div>
          )}
          <input id="f1" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile1(e.target.files[0])} />
        </div>
        <div>
          <p className="text-sm font-medium mb-2">Second Image</p>
          {!file2 ? (
            <div className="h-32 border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:border-[var(--color-primary-400)] hover:bg-gray-50 transition-colors"
              onClick={() => document.getElementById("f2")?.click()}>
              <span className="text-xs text-[var(--color-text-muted)]">Click to upload</span>
            </div>
          ) : (
            <div className="border rounded-xl overflow-hidden">
              <img src={url2} alt="" className="w-full h-32 object-cover" />
            </div>
          )}
          <input id="f2" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile2(e.target.files[0])} />
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {(["horizontal", "vertical", "overlay"] as const).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors capitalize ${mode === m ? "bg-[var(--color-primary-600)] text-white" : "hover:bg-gray-50"}`}>
            {m === "horizontal" ? "Side by Side" : m === "vertical" ? "Top to Bottom" : "Overlay"}
          </button>
        ))}
      </div>

      <button onClick={handleMerge} disabled={!file1 || !file2 || loading}
        className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50">
        {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Merging...</> : <><ArrowRight className="w-5 h-5" /> Merge Images</>}
      </button>

      {(file1 || file2) && (
        <button onClick={handleReset} className="w-full border border-[var(--color-border)] py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm">
          Start Over
        </button>
      )}
    </div>
  );
}
