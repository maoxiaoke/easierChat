// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';
import { builtinPrompts } from '../../data/prompts';

import type { NextApiRequest, NextApiResponse } from 'next'
import type { ChatMessage } from 'chatgpt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatMessage>
) {
  const { text, parentMessageId, id } = req.body;
  const prompt = builtinPrompts.find((p) => p.id === id)?.prompt;

  console.log('----kaishi---')


  const api = new ChatGPTUnofficialProxyAPI({
    accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ0aGViaWd5ZWxsb3diZWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItN2plOVRPcW5LZWMzd2FqVkRscUNzZEU3In0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzhkNzljYzNlMTFmZTAwOGYzY2M2ZDMiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc4NzE0ODg0LCJleHAiOjE2Nzk5MjQ0ODQsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb2ZmbGluZV9hY2Nlc3MifQ.ldTzw-tmi2rKualBqifxOr0YYcY_5gty-0d8TMLV4kqKww_7Fw-AK-P7RO2YioaakDGFRsjfND_O17Ao7MCcUM-wQRvz-G4AeAFhMh80H5gK33abglZvloA4yOsxGrYxmlkvXhVpMs-qb4ooa_Ctn3jxCQK6fQYqIBD-9Q2OUwNaTnZFDb3po8j-sgHI4g_9ofN-XnZocc43vBwg3jcm-d7jtmJ0-boRg8MsRqs58wJN1ujdSd3C0SnHfz2dWJzTK8jHboEeM-fKcoYfyR1JKOrlGWKpUbGJ89vilv_89-CxVwvk6qEhKwMkOrYd5zvsKw4JTsslVwbhkUsIIvGiig',
    apiReverseProxyUrl: 'https://bypass.duti.tech/api/conversation',
    // debug: true,
  })
  const chatRes = await api.sendMessage(prompt + text, {
    parentMessageId,
    // systemMessage: prompt,
  })
  console.log('chatRes---', chatRes, prompt + text)

  res.status(200).json(chatRes)
}