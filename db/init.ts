// db/init.ts
import { sql } from 'kysely'
import { db } from './client'

export async function initDb() {
  await db.schema
    .createTable('image')
    .ifNotExists()
    .addColumn('uid', 'text', col => col.primaryKey())
    .addColumn(
      'timestamp',
      'text',
      col => col.defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .addColumn('imageUrl', 'text')
    .addColumn('imageBlob', 'blob')
    .addColumn('sourceFormat', 'text', col => col.notNull())
    .addColumn('targetFormat', 'text', col => col.notNull())
    .execute()
}
