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
  getConversionCount: () => {
    const db = getSQLocal()

    return db.sql`
      SELECT COUNT(*) as total FROM image;
    `
  },

  getConversions: async ({
    pageIndex,
    pageSize,
    sortColumn,
    sortDirection,
    nameFilter,
  }: {
    pageIndex: number
    pageSize: number
    sortDirection: string
    sortColumn: string
    nameFilter: string
  }) => {
    const db = getSQLocal()

    const offset = pageIndex * pageSize

    const filterValue = nameFilter ? `%${nameFilter}%` : null

    const baseQuery = `
        SELECT
          uid,
          timestamp,
          imageUrl,
          imageBlob,
          sourceFormat,
          targetFormat
        FROM image
        ${nameFilter ? 'WHERE imageUrl LIKE ?' : ''}
        ORDER BY ${sortColumn} ${sortDirection}
        LIMIT ?
        OFFSET ?;
        `

    const rows = nameFilter
      ? await db.sql(baseQuery, filterValue, pageSize, offset)
      : await db.sql(baseQuery, pageSize, offset)

    const countResult = nameFilter
      ? await db.sql`
          SELECT COUNT(*) as total
          FROM image
          WHERE imageUrl LIKE ${filterValue};
        `
      : await db.sql`
          SELECT COUNT(*) as total
          FROM image;
        `

    return {
      rows,
      total: countResult[0]?.total ?? 0,
    }
  },

  deleteConversion: (uid: string) => {
    const db = getSQLocal()

    return db.transaction(async (tx) => {
      return tx.sql`
        DELETE FROM
        image WHERE uid = ${uid}
      `
    })
  },
}
