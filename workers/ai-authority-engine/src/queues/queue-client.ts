import type { Queue } from "../types/cloudflare"

export interface AuthorityQueueMessage {
  type: string
  id: string
  timestamp: string
  payload: Record<string, unknown>
}

/**
 * Type-safe queue producer for authority engine messages.
 */
export class QueueClient {
  private readonly queue: Queue<AuthorityQueueMessage>

  /**
   * Creates a queue client.
   */
  constructor(queue: Queue<AuthorityQueueMessage>) {
    this.queue = queue
  }

  /**
   * Sends a structured message to the configured queue.
   */
  async send(message: Omit<AuthorityQueueMessage, "timestamp">): Promise<void> {
    await this.queue.send({ ...message, timestamp: new Date().toISOString() })
  }
}
