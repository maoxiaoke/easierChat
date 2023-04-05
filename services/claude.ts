import { Client, AI_PROMPT, HUMAN_PROMPT } from '@anthropic-ai/sdk';

export {
  AI_PROMPT,
  HUMAN_PROMPT,
}

const apiKey = process.env.ANTHROPIC_API_KEY as string;

export const client = new Client(apiKey);