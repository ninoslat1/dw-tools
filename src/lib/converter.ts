
const allowed = ["png", "jpg", "jpeg", "webp", "avif"] as const;
type ImageFormat = typeof allowed[number];

export const convertImage = async (
  file: File,
  format: ImageFormat
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const mimeType = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : `image/${format}`;
      const qualityMap: Partial<Record<ImageFormat, number>> = {
        jpg: 0.9,
        jpeg: 0.9,
        webp: 0.85,
        avif: 0.8,
      }
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Conversion failed'));
          }
        },
        mimeType,
        qualityMap[format]
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
};

export const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const detectMimeType = (bytes: Uint8Array) => {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return "image/png"
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "image/jpeg"
  if (bytes[0] === 0x52 && bytes[1] === 0x49) return "image/webp"
  return "application/octet-stream"
}