export function getBaseUri(): string {
  const parts = [window.location.protocol, '//', window.location.hostname];

  if (window.location.port !== '') {
    parts.push(':', window.location.port);
  }

  return parts.join('');
}
