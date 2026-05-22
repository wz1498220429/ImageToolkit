"use client";

import { useState, useCallback } from "react";
import { Download, AlertCircle, Image } from "lucide-react";
import { formatFileSize } from "@/lib/image-utils";

export default function Base64ToImageTool() {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [fileInfo, setFileInfo] = useState({ name: "", size: 0, sizeFormatted: "" });

  const handleDecode = useCallback(() => {
    setError("");
    setImageUrl("");
    if (!input.trim()) {
      setError("Please paste a Base64 string or data URI.");
      return;
    }
    try {
      // Support both raw base64 and data URIs
      let data = input.trim();
      if (!data.startsWith("data:")) {
        // Try to detect format from header or default to png
        data = `data:image/png;base64,${data}`;
      }
      // Verify it decodes
      const response = fetch(data);
      // We can't actually fetch a data URI with error handling this way.
      // Let's just set the URL directly and let the img tag handle errors
      setImageUrl(data);

      // Extract format
      const format = data.match(/data:image\/(\w+)/)?.[1] || "png";
      const cleanBase64 = data.split(",")[1] || data;
      const byteLength = Math.ceil((cleanBase64.length * 3) / 4);
      setFileInfo({
        name: `decoded_image.${format}`,
        size: byteLength,
        sizeFormatted: formatFileSize(byteLength),
      });
    } catch {
      setError("Invalid Base64 string. Please check your input.");
    }
  }, [input]);

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = fileInfo.name || "decoded_image.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [imageUrl, fileInfo.name]);

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Paste Base64 string or data URI
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANS..."
          rows={6}
          className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] resize-none"
        />
      </div>

      <button
        onClick={handleDecode}
        disabled={!input.trim()}
        className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Image className="w-5 h-5" />
        Decode Image
      </button>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {imageUrl && (
        <div className="space-y-4">
          <div className="border border-[var(--color-border)] rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-gray-100 flex items-center justify-center p-4">
              <img
                src={imageUrl}
                alt="Decoded image"
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={() => {
                  setError("Invalid image data. The Base64 string may be corrupted.");
                  setImageUrl("");
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)]">
            <span>Format: {fileInfo.name.split(".").pop()?.toUpperCase()}</span>
            <span>Size: {fileInfo.sizeFormatted}</span>
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary-600)] text-white px-6 py-3 rounded-xl font-medium hover:bg-[var(--color-primary-700)] transition-colors"
          >
            <Download className="w-5 h-5" />
            Download {fileInfo.name}
          </button>
        </div>
      )}
    </div>
  );
}
