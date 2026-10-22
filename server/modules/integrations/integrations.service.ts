import type { Config } from '../../config/env.js';
import type { Booking, Quote } from './integrations.schemas.js';
import { SYSTEM_PROMPT } from './prompt.js';
import { z } from 'zod';

export class IntegrationError extends Error {}
const responseSchema = z.object({ choices: z.array(z.object({ message: z.object({ content: z.string().min(1) }) })).min(1) });

/** Owns upstream requests. Browser input cannot choose providers, models or headers. */
export function createIntegrationService(config: Config, fetcher: typeof fetch = fetch) {
  async function post(url: string, payload: unknown, headers: Record<string, string> = {}) {
    try {
      const response = await fetcher(url, {
        method: 'POST', redirect: 'error',
        headers: { 'Content-Type': 'application/json', ...headers },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(config.REQUEST_TIMEOUT_MS),
      });
      if (!response.ok) throw new IntegrationError('Upstream request failed');
      return response;
    } catch { throw new IntegrationError('Upstream unavailable'); }
  }
  // Prevent spreadsheet formulas while preserving the booking/quote payload contract.
  function sheetSafe(payload: Quote | Booking) {
    return Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, /^[\s]*[=+\-@\t\r]/.test(value) ? `'${value}` : value]));
  }
  return {
    async booking(payload: Booking) { await post(config.N8N_BOOKING_WEBHOOK_URL, sheetSafe(payload)); },
    async quote(payload: Quote) { await post(config.N8N_QUOTE_WEBHOOK_URL, sheetSafe(payload)); },
    async chat(text: string) {
      const response = await post(config.OPENROUTER_API_URL, {
        model: config.OPENROUTER_MODEL_ID, stream: false,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, { role: 'user', content: text }],
      }, { Authorization: `Bearer ${config.OPENROUTER_API_KEY}`, 'HTTP-Referer': config.SITE_URL, 'X-Title': 'PestLord Solutions Chatbot' });
      try { return responseSchema.parse(await response.json()).choices[0].message.content; }
      catch { throw new IntegrationError('Invalid upstream response'); }
    },
  };
}
export type IntegrationService = ReturnType<typeof createIntegrationService>;
