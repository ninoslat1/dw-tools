import { REQUIRED_FIELDS, REQUIRED_TABLE } from './format'

export const validateDatabase = async (sql: any) => {
  try {
    // Check if 'image' table exists
    const tables =
      await sql`SELECT name FROM sqlite_master WHERE type='table' AND name=${REQUIRED_TABLE}`

    if (tables.length === 0) {
      throw new Error(`Database must contain a table named '${REQUIRED_TABLE}'`)
    }

    // Check table structure
    const tableInfo = await sql`PRAGMA table_info(${REQUIRED_TABLE})`
    const existingFields = tableInfo.map((col: any) => col.name)

    // Check if all required fields exist
    const missingFields = REQUIRED_FIELDS.filter(
      (field) => !existingFields.includes(field),
    )

    if (missingFields.length > 0) {
      throw new Error(
        `Table '${REQUIRED_TABLE}' is missing required fields: ${missingFields.join(', ')}`,
      )
    }

    // Validate field types (optional but recommended)
    const fieldTypes: { [key: string]: string } = {
      uid: 'text',
      timestamp: 'text',
      imageUrl: 'text',
      imageBlob: 'blob',
      sourceFormat: 'text',
      targetFormat: 'text',
    }

    for (const field of tableInfo) {
      if (REQUIRED_FIELDS.includes(field.name)) {
        const expectedType = fieldTypes[field.name]
        if (field.type.toLowerCase() !== expectedType) {
          console.warn(
            `Field '${field.name}' has type '${field.type}' but expected '${expectedType}'`,
          )
        }
      }
    }

    return true
  } catch (error) {
    throw error
  }
}
