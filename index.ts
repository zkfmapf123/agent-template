import { z } from 'zod'
import { VectorConfig } from './confis/vector'
import { CEOSearchAgent } from './src/agent/search_ceo'
import { inputText } from './src/utils/cli'

const schema = z.object({
  name: z.string().describe('사용자의 이름, 찾지 못할 시 null'),
  age: z.number().describe('사용자의 나이, 찾지 못할 시 null'),
  birthDay: z.number().describe('사용자의 생년월일, 찾지 못할 시 null'),
})

const start = async () => {
  const db = new VectorConfig().connect('localhost', 8000)
  if (!(await db.ping())) {
    throw new Error('VectorDB 연결 실패')
  }

  const agent = new CEOSearchAgent<z.infer<typeof schema>>('openai', '너는 사용자의 말을 output 형식에 맞게 변환해주는 역할을 합니다.').createAgent(
    schema
  )

  while (true) {
    const input = await inputText('Enter a message : ')

    // exit
    if (!input || input === 'exit') {
      console.log('\n대화 종료...')
      process.exit(0)
    }

    const repsonse = await agent.invoke(input)

    console.log(repsonse)
  }
}

start()
