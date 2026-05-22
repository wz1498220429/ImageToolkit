export interface CompressResult {
  blob: Blob;
  size: number;
  sizeFormatted: string;
  url: string;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + units[i];
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };
    img.src = url;
  });
}

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => resolve(blob),
      type,
      quality
    );
  });
}

/**
 * Determine the output MIME type for lossy compression.
 * - PNG → JPEG (because PNG ignores the quality parameter)
 * - Everything else → keep original (JPEG/WebP both support quality)
 */
export function getCompressionMime(fileType: string): string {
  // PNG's canvas.toBlob ignores the quality parameter — use JPEG instead
  if (fileType === "image/png") {
    return "image/jpeg";
  }
  // HEIC/HEIF can't be re-encoded by canvas as HEIC — fall back to JPEG
  if (fileType === "image/heic" || fileType === "image/heif") {
    return "image/jpeg";
  }
  return fileType;
}

export function compressImage(
  file: File,
  quality: number,
  outputType?: string
): Promise<CompressResult> {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);

      // Use a lossy output format so the quality slider actually works
      const type = getCompressionMime(outputType || file.type);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to compress image"));
            return;
          }
          resolve({
            blob,
            size: blob.size,
            sizeFormatted: formatFileSize(blob.size),
            url: URL.createObjectURL(blob),
          });
        },
        type,
        quality
      );
    } catch (err) {
      reject(err);
    }
  });
}

export function compressToTargetSize(
  file: File,
  targetBytes: number,
  tolerance: number = 0.1,
  maxAttempts: number = 20
): Promise<CompressResult> {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);

      // Use a lossy output format so quality adjustments actually change file size
      const outputMime = getCompressionMime(file.type);

      // First attempt at highest quality to get baseline
      const firstBlob = await canvasToBlob(
        (() => {
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          const ctx = c.getContext("2d");
          if (ctx) ctx.drawImage(img, 0, 0);
          return c;
        })(),
        outputMime,
        0.95
      );

      if (firstBlob && firstBlob.size < targetBytes) {
        // Already under target, return as-is
        resolve({
          blob: firstBlob,
          size: firstBlob.size,
          sizeFormatted: formatFileSize(firstBlob.size),
          url: URL.createObjectURL(firstBlob),
        });
        return;
      }

      // Binary search: find highest quality that keeps result ≤ target bytes
      let minQuality = 0.05;
      let maxQuality = 0.95;

      // Track best result(s).  We guarantee exactly ONE live blob URL at
      // resolution time — any previous URLs are revoked before the next
      // iteration creates a new one.
      let bestUnder: CompressResult | null = null;
      let smallest: CompressResult | null = null;

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const quality = (minQuality + maxQuality) / 2;
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        ctx.drawImage(img, 0, 0);

        const blob = await canvasToBlob(canvas, outputMime, quality);
        if (!blob) continue;

        const result: CompressResult = {
          blob,
          size: blob.size,
          sizeFormatted: formatFileSize(blob.size),
          url: URL.createObjectURL(blob),
        };

        const isUnder = blob.size <= targetBytes;

        if (isUnder) {
          // Revoke previous bestUnder (if any) before replacing
          if (bestUnder) URL.revokeObjectURL(bestUnder.url);
          bestUnder = result;
          minQuality = quality;

          // Check tolerance
          const pctUnder = (targetBytes - blob.size) / targetBytes;
          if (pctUnder <= tolerance) {
            resolve(result);
            return;
          }
        } else {
          // Over target — revoke this attempt's URL immediately
          // (unless it also becomes smallest)
          const isSmaller = !smallest || blob.size < smallest.size;
          if (isSmaller) {
            if (smallest) URL.revokeObjectURL(smallest.url);
            smallest = result;
          } else {
            URL.revokeObjectURL(result.url);
          }
          maxQuality = quality;
        }
      }

      // Resolve: bestUnder has a live URL.  If smallest != bestUnder,
      // smallest also has a live URL that we must revoke.
      if (bestUnder) {
        if (smallest && smallest !== bestUnder) {
          URL.revokeObjectURL(smallest.url);
        }
        resolve(bestUnder);
      } else if (smallest) {
        resolve(smallest);
      } else {
        reject(new Error("Could not compress to target size"));
      }
    } catch (err) {
      reject(err);
    }
  });
}

export function resizeImage(
  file: File,
  width: number,
  height: number,
  maintainAspect: boolean = true
): Promise<CompressResult> {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);

      let newWidth = width;
      let newHeight = height;

      if (maintainAspect) {
        const aspectRatio = img.width / img.height;
        if (width && !height) {
          newHeight = Math.round(width / aspectRatio);
        } else if (height && !width) {
          newWidth = Math.round(height * aspectRatio);
        } else if (width && height) {
          if (width / height > aspectRatio) {
            newWidth = Math.round(height * aspectRatio);
          } else {
            newHeight = Math.round(width / aspectRatio);
          }
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      const outputMime = getCompressionMime(file.type);
      const blob = await canvasToBlob(canvas, outputMime, 0.92);
      if (!blob) {
        reject(new Error("Failed to resize image"));
        return;
      }

      resolve({
        blob,
        size: blob.size,
        sizeFormatted: formatFileSize(blob.size),
        url: URL.createObjectURL(blob),
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function convertImage(
  file: File,
  outputType: string
): Promise<CompressResult> {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to convert image"));
            return;
          }
          resolve({
            blob,
            size: blob.size,
            sizeFormatted: formatFileSize(blob.size),
            url: URL.createObjectURL(blob),
          });
        },
        outputType,
        0.92
      );
    } catch (err) {
      reject(err);
    }
  });
}

export function cropImage(
  file: File,
  x: number,
  y: number,
  width: number,
  height: number
): Promise<CompressResult> {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      const outputMime = getCompressionMime(file.type);
      const blob = await canvasToBlob(canvas, outputMime, 0.92);
      if (!blob) {
        reject(new Error("Failed to crop image"));
        return;
      }

      resolve({
        blob,
        size: blob.size,
        sizeFormatted: formatFileSize(blob.size),
        url: URL.createObjectURL(blob),
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function rotateImage(
  file: File,
  angle: number
): Promise<CompressResult> {
  return new Promise(async (resolve, reject) => {
    try {
      const img = await loadImage(file);
      const canvas = document.createElement("canvas");

      const radians = (angle * Math.PI) / 180;
      const cos = Math.abs(Math.cos(radians));
      const sin = Math.abs(Math.sin(radians));

      canvas.width = Math.round(img.width * cos + img.height * sin);
      canvas.height = Math.round(img.width * sin + img.height * cos);

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);

      const outputMime = getCompressionMime(file.type);
      const blob = await canvasToBlob(canvas, outputMime, 0.92);
      if (!blob) {
        reject(new Error("Failed to rotate image"));
        return;
      }

      resolve({
        blob,
        size: blob.size,
        sizeFormatted: formatFileSize(blob.size),
        url: URL.createObjectURL(blob),
      });
    } catch (err) {
      reject(err);
    }
  });
}

export function heicToJpg(file: File): Promise<CompressResult> {
  // For HEIC, we attempt to read it as image (browser may support it)
  // Otherwise, we show an error
  return convertImage(file, "image/jpeg");
}

export function getExtensionFromMime(mime: string): string {
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "image/avif": ".avif",
  };
  return map[mime] || ".jpg";
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
