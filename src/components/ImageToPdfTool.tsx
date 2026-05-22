"use client";

import { useState, useCallback } from "react";
import { Loader2, FileText } from "lucide-react";
import UploadZone from "./UploadZone";
import { loadImage, formatFileSize } from "@/lib/image-utils";
import { jsPDF } from "jspdf";

interface ImageToPdfProps {
  fromFormat: string;
  accept?: string;
}

export default function ImageToPdfTool({ fromFormat, accept }: ImageToPdfProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));
    },
    [originalUrl]
  );

  const handleConvert = useCallback(async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = await loadImage(file);
      const pdf = new jsPDF({
        orientation: img.width > img.height ? "landscape" : "portrait",
        unit: "px",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const ratio = Math.min(pageWidth / img.width, pageHeight / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      const x = (pageWidth - w) / 2;
      const y = (pageHeight - h) / 2;

      const dataUrl = await new Promise<string>((resolve) => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.95));
      });

      pdf.addImage(dataUrl, "JPEG", x, y, w, h);
      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.[^.]+$/, "") + ".pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [file]);

  const handleReset = useCallback(() => {
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

      {file && (
        <div className="w-full max-w-xl mx-auto space-y-6">
          <div className="flex items-center gap-4 p-4 border border-[var(--color-border)] rounded-xl">
            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
              <img src={originalUrl} alt="Original" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{file.name}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{formatFileSize(file.size)}</p>
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Generating PDF...</>
            ) : (
              <><FileText className="w-5 h-5" /> Convert to PDF</>
            )}
          </button>

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Choose Another Image
          </button>
        </div>
      )}
    </div>
  );
}
