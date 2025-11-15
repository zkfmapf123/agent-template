import { v4 as uuidv4 } from 'uuid'
import { model } from './src/model'
import { inputText } from './src/utils/cli'

const start = async () => {
  const uuid = uuidv4()

  const openaiModel = model.getAgent({ id: 'openai', systemPrompt: '너는 조언가 입니다. 사용자의 질문에 대해 적절한 조언을 제시해주세요.' })

  while (true) {
    const input = await inputText('Enter a message : ')

    // exit
    if (!input || input === 'exit') {
      console.log('\n대화 종료...')
      process.exit(0)
    }

    const response = await openaiModel.invoke(input)
    console.log(response)
  }
}

start()
