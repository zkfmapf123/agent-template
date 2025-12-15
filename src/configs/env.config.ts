import dotenv from 'dotenv'

dotenv.config()

export const env = {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
  OPENAI_MODEL: process.env.OPENAI_MODEL as string,
  TEMPERATURE: Number(process.env.TEMPERATURE) || 0,
}
