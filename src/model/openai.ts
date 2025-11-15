import { ChatOpenAI, type OpenAIChatModelId } from '@langchain/openai'
import type { ModelParmas } from './index'

/**
 * @reference https://docs.langchain.com/oss/javascript/integrations/chat#openai
 */
export class OpenAI implements ModelParmas<ChatOpenAI> {
  private llm!: ChatOpenAI

  constructor(private readonly apiKey: string, private readonly model: OpenAIChatModelId) {
    this.apiKey = apiKey
    this.model = model
  }

  createModel(): this {
    this.llm = new ChatOpenAI({
      model: this.model,
      apiKey: this.apiKey,
      temperature: 0, // 0 이면 예측 값, 1 이면 랜덤 값
    })
    return this
  }

  getType(): string {
    return 'openai-functions'
  }

  getLLM(): ChatOpenAI {
    return this.llm
  }
}
