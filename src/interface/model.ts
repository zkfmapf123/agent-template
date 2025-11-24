export type ModelType = 'openai' | 'aws'

export interface ModelParmas<T> {
  createModel(predeteced?: number): this
  getType(): string
  getLLM(): T
}
