import { SQLocal } from 'sqlocal'
import { EXPECTED_STRUCTURE } from './format'

/**
 * Load and initialize the SQLite database from file
 */
export const loadDatabase = async (file: File): Promise<SQLocal> => {
  if (!file.name.match(/\.(sqlite3)$/i)) {
    throw new Error('Invalid SQLite file format')
  }

  const db = new SQLocal('dwimgconv.sqlite3')

  console.log('✅ Database loaded successfully')
  return db
}

export const validateDatabaseName = async (db: SQLocal): Promise<void> => {
  // @ts-expect-error
  const dbName = db?.config?.databasePath || ''

  if (!dbName.includes(EXPECTED_STRUCTURE.database)) {
    throw new Error('Database name does not match expected structure')
  }
}

export const validateTableExists = async (db: SQLocal): Promise<void> => {
  const result = await db.sql`
    SELECT name FROM sqlite_master 
    WHERE type='table' AND name=${EXPECTED_STRUCTURE.table}
  `

  if (result.length === 0) {
    throw new Error(`Table "${EXPECTED_STRUCTURE.table}" does not exist`)
  }
}

export const validateTableStructure = async (db: SQLocal): Promise<void> => {
  const tableName = EXPECTED_STRUCTURE.table.replace(/[^a-zA-Z0-9_]/g, '')

  // @ts-expect-error
  const schema = await db.exec(`PRAGMA table_info(${tableName});`)

  const issues: Array<string> = []
  const foundFields: Record<
    string,
    { type: string; pk: boolean; notnull: boolean }
  > = {}
  const { rows } = schema
  const typedRows = rows as Array<TableInfoRow>
  typedRows.forEach((field) => {
    const [, name, type, notnull, pk] = field

    foundFields[name] = {
      type,
      notnull: notnull === 1,
      pk: pk === 1,
    }
  })

  Object.entries(EXPECTED_STRUCTURE.fields).forEach(
    ([fieldName, expectedProps]) => {
      const found = foundFields[fieldName]

      if (!found) {
        issues.push(`❌ Missing field: "${fieldName}"`)
      } else {
        if (found.type !== expectedProps.type) {
          issues.push(
            `⚠️  Field "${fieldName}": type mismatch (expected ${expectedProps.type}, got ${found.type})`,
          )
        }
      }
    },
  )

  Object.keys(foundFields).forEach((fieldName) => {
    if (!(fieldName in EXPECTED_STRUCTURE.fields)) {
      issues.push(`⚠️  Unexpected field: "${fieldName}"`)
    }
  })

  if (issues.length > 0) {
    throw new Error(
      `Table structure validation failed:\n\n${issues.join('\n')}`,
    )
  }
}

export const runFullValidation = async (db: SQLocal): Promise<void> => {
  console.log('🚀 Starting SQLite Validation...\n')

  await validateDatabaseName(db)
  await validateTableExists(db)
  await validateTableStructure(db)

  console.log('\n✅ All validations passed!')
}
