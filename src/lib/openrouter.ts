import { api } from './api';

/** Only user text crosses the browser boundary; provider credentials stay on Hono. */
export async function sendMessage(options: { text: string; stream?: boolean }): Promise<string> {
  const response = await api.api.chat.$post({ json: { text: options.text } });
  if (!response.ok) throw new Error('Unable to reach PestPal. Please try again shortly.');
  return (await response.json()).content;
}
