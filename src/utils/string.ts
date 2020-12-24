export function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
