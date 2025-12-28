// services/conversionService.ts
import { getSQLocal } from '@/db/sqlocal'
import type { ImageTable } from '@/types/table'

export const conversionService = {
  cacheConversion: async (data: ImageTable) => {
    const db = await getSQLocal()

    db.sql`
      INSERT INTO image (
        uid,
        timestamp,
        imageUrl,
        imageBlob,
        sourceFormat,
        targetFormat
      ) VALUES (
        ${data.uid},
        ${data.timestamp},
        ${data.imageUrl},
        ${data.imageBlob},
        ${data.sourceFormat},
        ${data.targetFormat}
      );
    `
  },

  getConversion: async () => {
    const db = await getSQLocal()

    return db.sql`
      SELECT
        uid,
        timestamp,
        imageUrl,
        imageBlob,
        sourceFormat,
        targetFormat
      FROM image
      ORDER BY timestamp DESC;
    `
  },
}
