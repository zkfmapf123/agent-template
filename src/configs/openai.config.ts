import { ChatOpenAI } from '@langchain/openai'
import { env } from './env.config'

export class OpenAILLM {
  private llm!: ChatOpenAI

  constructor(
    private readonly apiKey: string,
    private readonly model: string,
    private readonly temperature = 0,
  ) {
    // llm
    this.llm = new ChatOpenAI({
      model: this.model,
      apiKey: this.apiKey,
      temperature: this.temperature,
    })
  }

  getType(): string {
    return 'openai-functions'
  }

  getLLM(): ChatOpenAI {
    return this.llm
  }
}

export const openaiAgent = new OpenAILLM(env.OPENAI_API_KEY, env.OPENAI_MODEL, env.TEMPERATURE)
