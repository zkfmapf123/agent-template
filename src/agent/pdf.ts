import { formatDocumentsAsString } from '@langchain/classic/util/document'
import { MemoryVectorStore } from '@langchain/classic/vectorstores/memory'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { RunnableSequence } from '@langchain/core/runnables'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import type { BaseMessage } from 'langchain'
import type { ZodSchema } from 'zod'
import type { ModelType } from '../interface/model'
import { Agent } from './agent'

export class PDFAgent<T> extends Agent<T> {
  private chatHistory: BaseMessage[] = []

  private pdfLoader: PDFLoader

  constructor(id: ModelType, systemPrompt: string, pdfPath: string) {
    super(id, systemPrompt)

    this.pdfLoader = new PDFLoader(pdfPath, {
      splitPages: true, // 페이지 별 분리
    })
  }

  override createAgent(schema: ZodSchema): this {
    throw new Error('Not implemented')
  }

  override async pipeToPDFRag() {
    const docs = await this.pdfLoader.load()

    // console.log('총 페이지 : ', docs.length)
    // console.log(`첫 페이지 메타데이터 : ${JSON.stringify(docs[0]?.metadata)}`)

    // text splitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, // 청크 크기
      chunkOverlap: 200, // 청크 중복 크기
    })

    const splitDocs = await splitter.splitDocuments(docs)

    const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, this.embeddings)

    console.log('vector db 생성...')

    /**
     * k : 사용자 질문을 임베딩으로 변환해서 벡터 DB에서 가장 유사한 문서 4개로 찾는다
     * 그 4개를 LLM에게 전달한다...
     *
     * 1-2 : 빠르고 비용이 저렴하나, 정보가 부족할 수 있음 - 간단한 질문
     * 3-5 : 균형
     * 10+ : 정보가 풍부하나 느리고 비용이증가...
     */
    const retriever = vectorStore.asRetriever({ k: 4 })

    const chain = RunnableSequence.from([
      {
        context: (input: { question: string }) => retriever.pipe(formatDocumentsAsString).invoke(input.question),
        question: (input: { question: string }) => input.question,
      },
      ChatPromptTemplate.fromTemplate(this.systemPrompt),
      this.model.getLLM(),
      new StringOutputParser(),
    ])

    this.agent = chain
  }

  override invoke(input: string): Promise<T> {
    return this.agent.invoke({
      question: input,
    })
  }
}
