export const generateDummyData = (): TConversionRecord[] => {
  const now = Date.now()
  return [
    {
      id: "1",
      timestamp: now - 3600000,
     
      sourceFormat: "WebP",
      targetFormat: "PNG",
      imageBlob: new Blob(),
      imageUrl: "/converted-image-thumbnail.jpg",
    },
    {
      id: "2",
      timestamp: now - 7200000,

      sourceFormat: "WebP",
      targetFormat: "PNG",
      imageBlob: new Blob(),
      imageUrl: "/converted-image-thumbnail.jpg",
    },
    {
      id: "3",
      timestamp: now - 10800000,
      sourceFormat: "WebP",
      targetFormat: "PNG",
      imageBlob: new Blob(),
      imageUrl: "/converted-image-thumbnail.jpg",
    },
    {
      id: "4",
      timestamp: now - 14400000,
      sourceFormat: "WebP",
      targetFormat: "PNG",
      imageBlob: new Blob(),
      imageUrl: "/converted-image-thumbnail.jpg",
    },
    {
      id: "5",
      timestamp: now - 18000000,
      sourceFormat: "WebP",
      targetFormat: "PNG",
      imageBlob: new Blob(),
      imageUrl: "/converted-image-thumbnail.jpg",
    },
  ]
}