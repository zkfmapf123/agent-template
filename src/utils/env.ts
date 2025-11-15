import dotenv from 'dotenv'

dotenv.config()

interface envParams {
  OPENAI_API_KEY?: string
  OPENAI_MODEL?: string
}

export const env: envParams = {
  OPENAI_API_KEY: process.env.OPENAPI_KEY ?? '',
  OPENAI_MODEL: process.env.OPENAI_MODEL ?? '',
}
