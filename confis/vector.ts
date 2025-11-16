import { ChromaClient } from 'chromadb'

export class VectorConfig {
  private client!: ChromaClient

  constructor() {}

  connect(host: string, port: number): this {
    this.client = new ChromaClient({
      path: `http://${host}:${port}`,
    })

    return this
  }

  async ping(): Promise<boolean> {
    const hb = await this.client.heartbeat()
    if (hb) {
      return true
    }

    return false
  }
}
