"use client";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ResizeOptions {
  /** Lebar target (px). Jika hanya width diberikan, height dihitung otomatis. */
  width?: number;
  /** Tinggi target (px). Jika hanya height diberikan, width dihitung otomatis. */
  height?: number;
  /** Pertahankan aspect ratio (default: true) */
  maintainAspectRatio?: boolean;
  /** Format output: 'image/jpeg' | 'image/png' | 'image/webp' (default: sama dengan input) */
  outputFormat?: "image/jpeg" | "image/png" | "image/webp";
  /** Kualitas kompresi 0–1, hanya untuk jpeg/webp (default: 0.85) */
  quality?: number;
  /** Kembalikan sebagai 'file' | 'base64' | 'blob' (default: 'file') */
  returnAs?: "file" | "base64" | "blob";
  /** Nama file output (default: pakai nama asli) */
  fileName?: string;
  /** Ukuran file maksimal dalam bytes — resize ulang otomatis jika terlampaui */
  maxFileSizeBytes?: number;
}

export interface ResizeResult {
  /** File hasil resize (jika returnAs === 'file') */
  file?: File;
  /** Blob hasil resize (jika returnAs === 'blob') */
  blob?: Blob;
  /** String base64 dengan data URL prefix (jika returnAs === 'base64') */
  base64?: string;
  /** Dimensi akhir gambar */
  width: number;
  height: number;
  /** Ukuran file dalam bytes */
  sizeBytes: number;
  /** MIME type output */
  mimeType: string;
}

// ─── Helper: load image dari File/Blob/URL ────────────────────────────────────

function loadImage(source: File | Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url =
      typeof source === "string" ? source : URL.createObjectURL(source);
    const isObjectUrl = typeof source !== "string";

    img.onload = () => {
      if (isObjectUrl) URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      if (isObjectUrl) URL.revokeObjectURL(url);
      reject(new Error("Gagal memuat gambar"));
    };
    img.src = url;
  });
}

// ─── Helper: hitung dimensi target ───────────────────────────────────────────

function computeDimensions(
  srcW: number,
  srcH: number,
  opts: ResizeOptions
): { w: number; h: number } {
  const maintain = opts.maintainAspectRatio !== false;
  let w = opts.width ?? 0;
  let h = opts.height ?? 0;

  if (!w && !h) return { w: srcW, h: srcH }; // tidak ada target → kembalikan ukuran asli

  if (maintain) {
    if (w && !h) h = Math.round((srcH / srcW) * w);
    else if (h && !w) w = Math.round((srcW / srcH) * h);
    else {
      // Keduanya ada → fit ke dalam kotak, jaga rasio
      const ratio = Math.min(w / srcW, h / srcH);
      w = Math.round(srcW * ratio);
      h = Math.round(srcH * ratio);
    }
  } else {
    w = w || srcW;
    h = h || srcH;
  }

  return { w, h };
}

// ─── Core: resize satu gambar ─────────────────────────────────────────────────

/**
 * Resize sebuah gambar di sisi client menggunakan Canvas API.
 *
 * @example
 * const { file, width, height } = await resizeImage(inputFile, { width: 800 });
 */
export async function resizeImage(
  source: File | Blob | string,
  options: ResizeOptions = {}
): Promise<ResizeResult> {
  const {
    outputFormat,
    quality = 0.85,
    returnAs = "file",
    fileName,
    maxFileSizeBytes,
  } = options;

  const img = await loadImage(source);
  const { w, h } = computeDimensions(img.naturalWidth, img.naturalHeight, options);

  const mime =
    outputFormat ??
    (source instanceof File ? (source.type as ResizeResult["mimeType"]) : "image/jpeg");

  // Buat canvas dan gambar ke sana
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Tidak bisa membuat canvas 2D context");
  ctx.drawImage(img, 0, 0, w, h);

  // Konversi ke Blob
  const toBlob = (q: number): Promise<Blob> =>
    new Promise((res, rej) =>
      canvas.toBlob(
        (b) => (b ? res(b) : rej(new Error("Canvas toBlob gagal"))),
        mime,
        q
      )
    );

  let blob = await toBlob(quality);

  // Jika ada batas ukuran file, kurangi kualitas secara iteratif
  if (maxFileSizeBytes && blob.size > maxFileSizeBytes) {
    let q = quality;
    while (blob.size > maxFileSizeBytes && q > 0.1) {
      q = Math.max(q - 0.1, 0.1);
      blob = await toBlob(q);
    }
  }

  const sizeBytes = blob.size;
  const outName =
    fileName ??
    (source instanceof File
      ? source.name.replace(/\.[^.]+$/, `.${mime.split("/")[1]}`)
      : `resized.${mime.split("/")[1]}`);

  if (returnAs === "blob") {
    return { blob, width: w, height: h, sizeBytes, mimeType: mime };
  }

  if (returnAs === "base64") {
    const base64 = await new Promise<string>((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result as string);
      reader.onerror = rej;
      reader.readAsDataURL(blob);
    });
    return { base64, width: w, height: h, sizeBytes, mimeType: mime };
  }

  // default → File
  const file = new File([blob], outName, { type: mime });
  return { file, width: w, height: h, sizeBytes, mimeType: mime };
}

// ─── Batch resize ─────────────────────────────────────────────────────────────

/**
 * Resize banyak gambar sekaligus dengan opsi yang sama.
 *
 * @example
 * const results = await resizeImages(fileList, { width: 1200, quality: 0.8 });
 */
export async function resizeImages(
  sources: Array<File | Blob | string>,
  options: ResizeOptions = {}
): Promise<ResizeResult[]> {
  return Promise.all(sources.map((src) => resizeImage(src, options)));
}

// ─── Convenience: resize lalu langsung upload via fetch ──────────────────────

export interface ResizeAndUploadOptions extends ResizeOptions {
  uploadUrl: string;
  fieldName?: string;
  extraFields?: Record<string, string>;
  fetchOptions?: Omit<RequestInit, "method" | "body">;
}

/**
 * Resize gambar lalu langsung kirim ke endpoint via multipart/form-data.
 *
 * @example
 * const res = await resizeAndUpload(file, {
 *   width: 800,
 *   uploadUrl: "/api/upload",
 * });
 */
export async function resizeAndUpload(
  source: File | Blob | string,
  options: ResizeAndUploadOptions
): Promise<Response> {
  const {
    uploadUrl,
    fieldName = "file",
    extraFields = {},
    fetchOptions = {},
    ...resizeOpts
  } = options;

  const { file } = await resizeImage(source, {
    ...resizeOpts,
    returnAs: "file",
  });

  if (!file) throw new Error("Resize gagal menghasilkan File");

  const formData = new FormData();
  formData.append(fieldName, file);
  Object.entries(extraFields).forEach(([k, v]) => formData.append(k, v));

  return fetch(uploadUrl, { method: "POST", body: formData, ...fetchOptions });
}