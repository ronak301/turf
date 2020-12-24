/**
 * Resize image
 *
 * @param image
 * @param operation
 *
 * @returns {*}
 */
export function getImageUrl(image: string, operation: string = '250x') {
  return image.replace(
    /(.*\.tigerhall\.\w+)\/(.*)/g,
    `$1/resize/${operation}/$2`
  );
}
