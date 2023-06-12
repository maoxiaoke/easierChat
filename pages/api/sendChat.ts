// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { ChatGPTAPI } from 'chatgpt';

import getIP from "../../helpers/getIp";
import claudeClient, { HUMAN_PROMPT } from "../../services/claude";

import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  const {
    text,
    model = "claude-instant-v1",
    temperature = 0.7,
    hasFile = false,
    maxTokens = 400,
  } = await req.json();

  const ip = getIP(req);

  console.log(
    ip,
    model,
    hasFile,
    temperature,
    maxTokens,
    text ? text.slice(0, 2000) : ""
  );

  const blockIpsList = process.env.BLOCK_IPS?.split(",") || [];

  if (blockIpsList.includes(ip) && text.includes("角色扮演")) {
    return new Response(
      JSON.stringify({
        error: "You are blocked",
      }),
      {
        status: 403,
      }
    );
  }

  try {
    const claudeResponse = await claudeClient.complete({
      prompt: text,
      stop_sequences: [HUMAN_PROMPT],
      max_tokens_to_sample: maxTokens,
      temperature,
      model: hasFile ? `${model}-100k` : model,
    });

    return new Response(
      JSON.stringify({
        date: Date.now(),
        role: "assistant",
        text: claudeResponse.completion,
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(
      JSON.stringify({
        error: e.message,
      }),
      {
        status: 500,
      }
    );
  }
}
