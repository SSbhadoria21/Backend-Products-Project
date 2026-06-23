export const encodeCursor = (data) => {
  return Buffer.from(JSON.stringify(data)).toString('base64');
};

export const decodeCursor = (cursor) => {
  try {
    const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    if (!parsed.createdAt || !parsed.id) return null;
    return parsed;
  } catch (error) {
    return null;
  }
};
