'use client'

import { db } from "@/db/client"
import type { ImageTable } from "@/types/table"

export const conversionService = {
    cacheConversion: async (data: ImageTable) => {
      return await db.transaction().execute(async (trx) => {
        return await trx
          .insertInto('image')
          .values(data)
          .executeTakeFirst()
      })
    },
    getConversion: async () => {
      return await db
        .selectFrom('image')
        .select(['imageBlob', 'targetFormat', "uid", "imageUrl", "timestamp", "sourceFormat"])
        .execute()
    }
}