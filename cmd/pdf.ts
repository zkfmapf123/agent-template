import path from 'path'
import { fileURLToPath } from 'url'
import { PDFAgent } from '../src/agent/pdf'
import { inputText } from '../src/utils/cli'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const start = async () => {
  const pdfPath = path.join(__dirname, '..', 'docs', 'resume.pdf')

  const agent = new PDFAgent('openai', '너는 사용자의 편의성을 높여주는 Assistant 역힐이야', pdfPath)
  await agent.pipeToPDFRag()

  while (true) {
    const input = await inputText('Enter a message : ')

    const response = await agent.invoke(input)
    console.log(response)

    if (!input || input === 'exit') {
      console.log('\n대화 종료...')
      process.exit(0)
    }
  }
}

start()
