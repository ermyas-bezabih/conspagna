export function safeOrderingUrl(value: string | undefined): string | null {
  if (!value) return null;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : null; } catch { return null; }
}
export const providers = [
  {name: 'DoorDash', logo: '/images/doordash-logo.svg', url: safeOrderingUrl(import.meta.env.VITE_DOORDASH_URL)},
  {name: 'Uber Eats', logo: '/images/uber-eats-logo.svg', url: safeOrderingUrl(import.meta.env.VITE_UBEREATS_URL)},
];
