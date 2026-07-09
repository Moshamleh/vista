/**
 * Creates a URL-safe slug.
 */
export function slugify(value: string): string {
  return value
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff]+/giu, "-")
    .replace(/^-+|-+$/gu, "")
}

/**
 * Creates a SHA-256 checksum.
 */
export async function checksum(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

/**
 * Counts words in content.
 */
export function wordCount(value: string): number {
  return value.split(/\s+/u).filter(Boolean).length
}
