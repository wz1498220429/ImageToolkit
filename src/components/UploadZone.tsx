"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, Image, FileWarning } from "lucide-react";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  label?: string;
}

export default function UploadZone({
  onFileSelect,
  accept = "image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif",
  label = "Upload an image",
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return false;
      }
      setError(null);
      return true;
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, validateFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        onFileSelect(file);
      }
    },
    [onFileSelect, validateFile]
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          drop-zone flex flex-col items-center justify-center gap-4 min-h-[240px]
          ${isDragging ? "active" : ""}
          ${error ? "border-red-400 bg-red-50" : ""}
        `}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        aria-label={label}
      >
        <div className="w-16 h-16 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
          {error ? (
            <FileWarning className="w-8 h-8 text-red-500" />
          ) : isDragging ? (
            <Image className="w-8 h-8 text-[var(--color-primary-600)]" />
          ) : (
            <Upload className="w-8 h-8 text-[var(--color-primary-600)]" />
          )}
        </div>

        <div className="text-center">
          {error ? (
            <p className="text-red-600 font-medium">{error}</p>
          ) : (
            <>
              <p className="text-lg font-semibold text-[var(--color-text)]">
                {isDragging ? "Drop your image here" : label}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] mt-1">
                or click to browse files
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Supports JPG, PNG, WebP, HEIC
              </p>
            </>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}
