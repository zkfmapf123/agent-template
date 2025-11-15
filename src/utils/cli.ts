import prompts from 'prompts'

export const inputText = async (header: string): Promise<string> => {
  const response = await prompts({
    type: 'text',
    name: 'text',
    message: header,
  })

  return response.text
}
