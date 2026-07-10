/**
 * Base entity shape for repository-managed records.
 */
export interface EntityRecord {
  id: string
  createdAt: string
  updatedAt: string
}

/**
 * Generic repository contract used by future business modules.
 */
export interface Repository<T extends EntityRecord> {
  findById(id: string): Promise<T | null>
  save(record: T): Promise<void>
  delete(id: string): Promise<void>
}
