// import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, ToolLLaMaStream } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const result = await fetch('http://127.0.0.1:5000/log/?' + req.url.split('?')[1], {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log("url",'http://127.0.0.1:5000/log/?' + req.url.split('?')[1])
    console.log("forward from", result);
    const json = await result.json();
    console.log("json", json);

    return new Response(JSON.stringify(json));
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
