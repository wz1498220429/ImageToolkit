"use client";

import { useState, useCallback, useRef } from "react";
import { Loader2, Copy, Check, Download } from "lucide-react";
import UploadZone from "./UploadZone";
import { formatFileSize } from "@/lib/image-utils";

export default function ImageToBase64Tool() {
  const [file, setFile] = useState<File | null>(null);
  const [base64, setBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleFileSelect = useCallback(
    (f: File) => {
      setFile(f);
      setBase64("");
      setCopied(false);
      setLoading(true);
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(URL.createObjectURL(f));

      const reader = new FileReader();
      reader.onload = () => {
        setBase64(reader.result as string);
        setLoading(false);
      };
      reader.onerror = () => setLoading(false);
      reader.readAsDataURL(f);
    },
    [originalUrl]
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(base64);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: select text
      textRef.current?.select();
    }
  }, [base64]);

  const handleReset = useCallback(() => {
    setFile(null);
    setBase64("");
    setCopied(false);
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

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-[var(--color-text-muted)]">
              <Loader2 className="w-5 h-5 animate-spin" />
              Encoding...
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Base64 Data URI</label>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {base64.length.toLocaleString()} characters
                </span>
              </div>
              <textarea
                ref={textRef}
                readOnly
                value={base64}
                className="w-full h-40 px-4 py-3 border border-[var(--color-border)] rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none"
              />
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copy to Clipboard
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 border border-[var(--color-border)] text-[var(--color-text)] px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  New Image
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
