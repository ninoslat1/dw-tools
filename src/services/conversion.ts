// services/conversionService.ts
import { getSQLocal } from '@/db/sqlocal'

export const conversionService = {
  cacheConversion: (data: ImageTable) => {
    const db = getSQLocal()

    return db.transaction(async (tx) => {
      return tx.sql`
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
    })
  },

  getConversion: () => {
    const db = getSQLocal()

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

  deleteConversion: (uid: string) => {
    const db = getSQLocal()

    return db.transaction(async (tx) => {
      return tx.sql`
        DELETE FROM
        image WHERE uid = ${uid}
      `
    })
    
  } 
}
