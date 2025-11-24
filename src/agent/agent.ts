import { OpenAIEmbeddings } from '@langchain/openai'
import type { ModelType } from '../interface/model'
import { OpenAI } from '../model/openai'
import { env } from '../utils/env'

export class Agent<T> {
  protected agent!: any
  protected model!: any
  protected embeddings!: any

  constructor(protected readonly id: ModelType, protected readonly systemPrompt: string) {
    const keySet = {
      apiKey: env.OPENAI_API_KEY ?? '',
      model: env.OPENAI_MODEL ?? '',
    }

    switch (this.id) {
      case 'openai':
        this.model = new OpenAI(keySet.apiKey, keySet.model).createModel()
        break

      default:
        throw new Error(`Unsupported model: ${this.id}`)
    }

    this.embeddings = new OpenAIEmbeddings({
      apiKey: env.OPENAI_API_KEY ?? '',
    })
  }

  protected createAgent(schema?: unknown): this {
    throw new Error('Not implemented')
  }

  protected pipeToPDFRag() {}

  // protected pipeTextSplitter() {}

  // protected pipeEmbeddings() {}

  protected async invoke(input: string): Promise<T> {
    throw new Error('Not implemented')
  }
}
