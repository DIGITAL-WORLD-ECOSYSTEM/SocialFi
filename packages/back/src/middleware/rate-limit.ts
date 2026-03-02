import { Context, Next } from 'hono';

export const rateLimit = (options: { limit: number; window: number }) => {
  return async (c: Context, next: Next) => {
    await next();
  };
};
