import { hc } from 'hono/client';
import type { ApiType } from '../../server/app';

export const api = hc<ApiType>(window.location.origin);
