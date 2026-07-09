import type { KVNamespace } from "../types/cloudflare"

/**
 * Typed JSON wrapper around Cloudflare KV.
 */
export class KvJsonStore {
  private readonly kv: KVNamespace

  /**
   * Creates a KV JSON store.
   */
  constructor(kv: KVNamespace) {
    this.kv = kv
  }

  /**
   * Reads and parses a JSON value.
   */
  async getJson<T>(key: string): Promise<T | null> {
    const raw = await this.kv.get(key, { type: "text" })
    return raw ? (JSON.parse(raw) as T) : null
  }

  /**
   * Serializes and writes a JSON value.
   */
  async putJson(key: string, value: unknown, expirationTtl?: number): Promise<void> {
    await this.kv.put(key, JSON.stringify(value), expirationTtl ? { expirationTtl } : undefined)
  }

  /**
   * Deletes a JSON value.
   */
  async delete(key: string): Promise<void> {
    await this.kv.delete(key)
  }
}
