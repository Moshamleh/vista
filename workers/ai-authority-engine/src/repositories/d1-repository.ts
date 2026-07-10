import type { D1Database } from "../types/cloudflare"
import type { EntityRecord, Repository } from "./repository"

/**
 * D1-backed generic repository for JSON document tables.
 */
export class D1JsonRepository<T extends EntityRecord> implements Repository<T> {
  private readonly db: D1Database
  private readonly table: string

  /**
   * Creates a repository for a table with id and document columns.
   */
  constructor(db: D1Database, table: string) {
    this.db = db
    this.table = table
  }

  /**
   * Finds one record by ID.
   */
  async findById(id: string): Promise<T | null> {
    const row = await this.db
      .prepare(`select document from ${this.table} where id = ?`)
      .bind(id)
      .first<{ document: string }>()
    return row ? (JSON.parse(row.document) as T) : null
  }

  /**
   * Saves one JSON document record.
   */
  async save(record: T): Promise<void> {
    const result = await this.db
      .prepare(
        `insert into ${this.table} (id, document, updated_at) values (?, ?, ?) on conflict(id) do update set document = excluded.document, updated_at = excluded.updated_at`
      )
      .bind(record.id, JSON.stringify(record), record.updatedAt)
      .run()
    if (!result.success) throw new Error(result.error ?? "D1 save failed")
  }

  /**
   * Deletes one record by ID.
   */
  async delete(id: string): Promise<void> {
    const result = await this.db.prepare(`delete from ${this.table} where id = ?`).bind(id).run()
    if (!result.success) throw new Error(result.error ?? "D1 delete failed")
  }
}
