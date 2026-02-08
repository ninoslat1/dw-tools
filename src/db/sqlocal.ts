// db/sqlocal.ts
'use client'

import { SQLocal } from 'sqlocal'

let sqlocalPromise: SQLocal | null = null

export function getSQLocal(): SQLocal {
  if (sqlocalPromise) return sqlocalPromise

  sqlocalPromise = (() => {
    const db = new SQLocal({
      databasePath: 'dwimgconv.sqlite3',
      verbose: false,
    })

    db.sql`
      CREATE TABLE IF NOT EXISTS image (
        uid TEXT PRIMARY KEY,
        timestamp TEXT NOT NULL,
        imageUrl TEXT,
        imageBlob BLOB,
        sourceFormat TEXT NOT NULL,
        targetFormat TEXT NOT NULL
      );
    `

    return db
  })()

  return sqlocalPromise
}
