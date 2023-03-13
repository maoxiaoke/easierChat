// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChatGPTAPI } from 'chatgpt';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('req', req.body)
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY ?? '',
  })
  // const chatRes = await api.sendMessage('Hello World!')
  // console.log('fsfsf', chatRes)

  // res.status(200).json(chatRes)
  // console.log('chatRes', chatRes)f
  // res.status(200).json({ name: 'John Doe' })
}
