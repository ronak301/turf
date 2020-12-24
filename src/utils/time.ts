/**
 * Convert seconds to a more user friendly format
 *
 * @param seconds
 */
export function secondsToTime(seconds: number): string {
  const h = Math.floor(seconds / 3600).toString();
  const m = Math.floor((seconds % 3600) / 60).toString();
  const s = Math.floor(seconds % 60).toString();

  return `${h}h ${m}m ${s}s`;
}
