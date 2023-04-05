// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ChatGPTAPI } from 'chatgpt';
import { builtinPrompts } from '../../data/prompts';

import { client as claudeClient, AI_PROMPT, HUMAN_PROMPT } from '../../services/claude';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatMessage>
) {
  const { text, id } = req.body;
  const prompt = builtinPrompts.find((p) => p.id === id)?.prompt;

  console.log('----kaishi---')

  // const officialApi = new ChatGPTAPI({
  //   apiKey: process.env.OPENAI_API_KEY ?? '',
  //   apiBaseUrl: 'https://easierchat.com/'
  // });

  // const api = new ChatGPTUnofficialProxyAPI({
  //   accessToken: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1UaEVOVUpHTkVNMVFURTRNMEZCTWpkQ05UZzVNRFUxUlRVd1FVSkRNRU13UmtGRVFrRXpSZyJ9.eyJodHRwczovL2FwaS5vcGVuYWkuY29tL3Byb2ZpbGUiOnsiZW1haWwiOiJ0aGViaWd5ZWxsb3diZWVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJodHRwczovL2FwaS5vcGVuYWkuY29tL2F1dGgiOnsidXNlcl9pZCI6InVzZXItN2plOVRPcW5LZWMzd2FqVkRscUNzZEU3In0sImlzcyI6Imh0dHBzOi8vYXV0aDAub3BlbmFpLmNvbS8iLCJzdWIiOiJhdXRoMHw2MzhkNzljYzNlMTFmZTAwOGYzY2M2ZDMiLCJhdWQiOlsiaHR0cHM6Ly9hcGkub3BlbmFpLmNvbS92MSIsImh0dHBzOi8vb3BlbmFpLm9wZW5haS5hdXRoMGFwcC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNjc4NzE0ODg0LCJleHAiOjE2Nzk5MjQ0ODQsImF6cCI6IlRkSkljYmUxNldvVEh0Tjk1bnl5d2g1RTR5T282SXRHIiwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCBtb2RlbC5yZWFkIG1vZGVsLnJlcXVlc3Qgb3JnYW5pemF0aW9uLnJlYWQgb2ZmbGluZV9hY2Nlc3MifQ.ldTzw-tmi2rKualBqifxOr0YYcY_5gty-0d8TMLV4kqKww_7Fw-AK-P7RO2YioaakDGFRsjfND_O17Ao7MCcUM-wQRvz-G4AeAFhMh80H5gK33abglZvloA4yOsxGrYxmlkvXhVpMs-qb4ooa_Ctn3jxCQK6fQYqIBD-9Q2OUwNaTnZFDb3po8j-sgHI4g_9ofN-XnZocc43vBwg3jcm-d7jtmJ0-boRg8MsRqs58wJN1ujdSd3C0SnHfz2dWJzTK8jHboEeM-fKcoYfyR1JKOrlGWKpUbGJ89vilv_89-CxVwvk6qEhKwMkOrYd5zvsKw4JTsslVwbhkUsIIvGiig',
  //   apiReverseProxyUrl: 'https://bypass.duti.tech/api/conversation',
  //   // debug: true,
  // })
  // const chatRes = await officialApi.sendMessage(prompt + text, {
  //   parentMessageId,
  //   // systemMessage: prompt,
  // })
  // console.log('chatRes---', chatRes, prompt + text)
  console.log('text', text)
  try {
    const claudeResponse = await claudeClient.complete({
      prompt: text,
      stop_sequences: [HUMAN_PROMPT],
      max_tokens_to_sample: 200,
      model: "claude-v1",
    });

    return res.status(200).json({
      date: new Date(),
      role: 'assistant',
      text: claudeResponse.completion,
    })
  } catch (e: any) {
    // res.status(500).json({
    //   error: e.message,
    // })
  }

    // .then((completion) => {
    //   console.log(completion);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    
  //   const mockRes = {
  //     id: '123434',
  //     "role": "assistant" as any,
  //     "text": "Hey there, Mr. Yo! Is that some sort of new yoghurt brand or are you just excited to see me?"
  //   }
  // res.status(200).json(mockRes)
}
