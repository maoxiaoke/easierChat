import { OpenAIStream } from "../../helpers/openStream";
import { HUMAN_PROMPT } from '../../services/claude';

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { text } = (await req.json()) as {
    text?: string;
  };

  const payload = {
    prompt: text,
    stop_sequences: [HUMAN_PROMPT],
    max_tokens_to_sample: 500,
    model: "claude-instant-v1",
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;