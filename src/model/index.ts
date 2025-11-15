import { createAgent } from 'langchain'
import { env } from '../utils/env'
import { OpenAI } from './openai'

export interface ModelParmas<T> {
  createModel: () => this
  // invoke: (msg: string) => Promise<void> 이건 모델 Prompt에서만 활용
  getType: () => string
  getLLM: () => T
}

type MessageParams = {
  id: string
  content: string
}

export type ModelTypeParams = {
  id: 'openai' | 'aws'
  systemPrompt: string
}

class Model {
  private agent!: any
  private chatHistory: Array<{ role: string; content: string }> = []

  getAgent({ id, systemPrompt }: ModelTypeParams): this {
    const KeySet = {
      apiKey: env.OPENAI_API_KEY ?? '',
      model: (env.OPENAI_MODEL ?? 'gpt-4o-mini') as any,
    }

    if (!KeySet.apiKey) {
      throw new Error('OPENAI_API_KEY is required')
    }

    let m: ModelParmas<any>

    switch (id) {
      case 'openai':
        m = new OpenAI(KeySet.apiKey, KeySet.model).createModel()
        break

      // case 'aws':
      //   throw new Error('AWS model is not supported yet')

      default:
        throw new Error(`Unsupported model: ${id}`)
    }

    this.agent = createAgent({
      model: m.getLLM(),
      tools: [],
      systemPrompt: systemPrompt,
    })

    return this
  }

  async invoke(input: string): Promise<string> {
    const result = await this.agent.invoke({
      messages: [
        ...this.chatHistory, // ← 이전 대화 포함
        { role: 'user', content: input },
      ],
    })

    // 응답 추출
    const response = result.content || result.messages[result.messages.length - 1].content

    // 히스토리 업데이트
    this.chatHistory.push({ role: 'user', content: input }, { role: 'assistant', content: response })

    return response
  }

  clear() {
    this.chatHistory = []
  }
}

export const model = new Model()
