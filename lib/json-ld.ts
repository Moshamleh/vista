export function jsonLd(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c")
}
