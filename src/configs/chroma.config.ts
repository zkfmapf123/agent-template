import { ChromaClient } from 'chromadb'

export class VectorDBConfig {
  private client!: ChromaClient

  constructor(
    private readonly host: string = 'localhost',
    private readonly port: number = 8000,
  ) {
    this.client = new ChromaClient({
      path: `http://${this.host}:${this.port}`,
    })
  }

  getClient(): ChromaClient {
    return this.client
  }
}
