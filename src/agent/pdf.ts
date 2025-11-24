import type { BaseMessage } from 'langchain'
import type { ZodSchema } from 'zod'
import type { ModelType } from '../interface/model'
import { Agent } from './agent'

export class PDFAgent<T> extends Agent<T> {
  private chatHistory: BaseMessage[] = []

  constructor(id: ModelType, systemPrompt: string) {
    super(id, systemPrompt)
  }

  override createAgent(schema: ZodSchema): this {
    throw new Error('Not implemented')
  }
}
