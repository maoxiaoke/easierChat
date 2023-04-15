// import { Client, AI_PROMPT, HUMAN_PROMPT } from '@anthropic-ai/sdk';

export const HUMAN_PROMPT = "\n\nHuman:";
export const AI_PROMPT = "\n\nAssistant:";

export type SamplingParameters = {
  prompt: string;
  temperature?: number;
  max_tokens_to_sample: number;
  stop_sequences: string[];
  top_k?: number;
  top_p?: number;
  model: string;
  tags?: { [key: string]: string };
};

export type CompletionResponse = {
  completion: string;
  stop: string | null;
  stop_reason: "stop_sequence" | "max_tokens";
  truncated: boolean;
  exception: string | null;
  log_id: string;
};

const DEFAULT_API_URL = "https://api.anthropic.com";


const apiKey = process.env.ANTHROPIC_API_KEY as string;

// export const client = new Client(apiKey);

export async function complete(
  params: SamplingParameters,
  options?: { signal?: AbortSignal }
): Promise<CompletionResponse> {
  const response = await fetch(`${DEFAULT_API_URL}/v1/complete`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Client: "anthropic-typescript/0.4.3",
      "X-API-Key": apiKey,
    },
    body: JSON.stringify({ ...params, stream: false }),
    signal: options?.signal,
  });

  if (!response.ok) {
    const error = new Error(
      `Sampling error: ${response.status} ${response.statusText}`
    );
    console.error(error);
    throw error;
  }

  const completion = (await response.json()) as CompletionResponse;
  return completion;
}

export default {
  complete,
}
