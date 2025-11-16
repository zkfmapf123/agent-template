import { StructuredOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts'
import { AIMessage, HumanMessage, type BaseMessage } from 'langchain'
import type { ZodSchema } from 'zod'
import type { ModelType } from '../interface/model'
import { Agent } from './agent'

export class CEOSearchAgent<T> extends Agent<T> {
  private chatHistory: BaseMessage[] = []

  constructor(id: ModelType, systemPrompt: string) {
    super(id, systemPrompt)
  }

  override createAgent(schema: ZodSchema): this {
    const parser = StructuredOutputParser.fromZodSchema(schema)
    const system = `${this.systemPrompt}\n\n${parser.getFormatInstructions()}`.replace(/{/g, '{{').replace(/}/g, '}}')
    const fromMessages = ChatPromptTemplate.fromMessages([['system', system], new MessagesPlaceholder('history'), ['human', '{input}']])
    const chainAgent = fromMessages.pipe(this.model.getLLM()).pipe(parser)

    this.agent = chainAgent

    return this
  }

  override async invoke(input: string): Promise<T> {
    const result = await this.agent.invoke({
      history: this.chatHistory,
      input,
    })

    this.chatHistory.push(new HumanMessage(input), new AIMessage(JSON.stringify(result)))
    return result as T
  }
}
