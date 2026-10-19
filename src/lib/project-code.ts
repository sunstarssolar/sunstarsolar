export function makeProjectCode() {
  const time = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `PRJ-${time}-${random}`;
}