// db/client.ts
'use client'

import type { Kysely } from 'kysely'
import type { Database } from '@/types/table'

let dbInstance: Kysely<Database> | null = null

export async function getDb(): Promise<Kysely<Database>> {
  if (dbInstance) {
    return dbInstance
  }

  // Dynamic import ONLY when needed
  const { SQLocalKysely } = await import('sqlocal/kysely')
  const { Kysely } = await import('kysely')

  // Configure sqlocal to use WASM from public folder
  const { dialect } = new SQLocalKysely({
    databasePath: 'dwimgconv.sqlite3',
    readOnly: false,
    verbose: true,
  })
  
  dbInstance = new Kysely<Database>({ dialect })

  return dbInstance
}

// For backwards compatibility
export let db: Kysely<Database>

// Initialize db only on client-side
if (typeof window !== 'undefined') {
  getDb().then(instance => {
    db = instance
  })
}