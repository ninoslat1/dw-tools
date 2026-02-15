export const EXPECTED_STRUCTURE = {
  database: 'dwimgconv',
  table: 'image',
  fields: {
    uid: { type: 'TEXT', pk: true, notnull: false },
    timestamp: { type: 'TEXT', pk: false, notnull: true },
    imageUrl: { type: 'TEXT', pk: false, notnull: false },
    imageBlob: { type: 'BLOB', pk: false, notnull: false },
    sourceFormat: { type: 'TEXT', pk: false, notnull: true },
    targetFormat: { type: 'TEXT', pk: false, notnull: true }
  }
};

export const TOAST_DURATION = 2000