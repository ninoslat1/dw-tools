// app/db-init.tsx
'use client'

import { useEffect } from 'react'
import { initDb } from '@/db/init'

export function DatabaseInitialization() {
  useEffect(() => {
    initDb()
  }, [])

  return null
}
