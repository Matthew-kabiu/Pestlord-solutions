import { z } from '@hono/zod-openapi';

const text = (max: number) => z.string().trim().min(1).max(max);
export const quoteSchema = z.object({
  name: text(100), email: z.email().max(254), phone: text(30),
  service_type: text(100), location: text(200),
  additional_notes: z.string().max(2000),
  submitted_at: z.iso.datetime(), source: z.literal('website-quote'),
}).strict();
export const bookingSchema = quoteSchema.omit({ source: true }).extend({
  preferred_date: z.iso.date(), preferred_time: text(100), source: z.literal('website-booking'),
}).strict();
export const chatSchema = z.object({ text: text(2000) }).strict();
export const successSchema = z.object({ success: z.literal(true) });
export const chatResponseSchema = z.object({ content: z.string() });
export const errorSchema = z.object({ success: z.literal(false), error: z.string(), requestId: z.string() });
export type Quote = z.infer<typeof quoteSchema>;
export type Booking = z.infer<typeof bookingSchema>;
