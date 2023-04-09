import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

const CLIENT_ID = "anthropic-typescript/0.4.3";
const DEFAULT_API_URL = "https://api.anthropic.com";

export async function OpenAIStream(payload: any) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const res = await fetch(`${DEFAULT_API_URL}/v1/complete`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Client: CLIENT_ID,
      "X-API-Key": process.env.ANTHROPIC_API_KEY ?? "",
    },
    body: JSON.stringify({
      ...payload,
      stream: true,
    }),
  });

  const stream = new ReadableStream({
    async start(controller) {
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          if (data === '[DONE]') {
            controller.close();
            return;
          }

          try {
            const json = JSON.parse(data);

            const text = json.completion;

            const queue = encoder.encode(text);
            controller.enqueue(queue);

          } catch (e) {
            controller.error(e);
          }
        }
      }

     // stream response (SSE) from OpenAI may be fragmented into multiple chunks
     // this ensures we properly read chunks & invoke an event for each SSE event stream
     const parser = createParser(onParse);

      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return stream;
}