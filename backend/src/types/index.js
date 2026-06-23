import { z } from 'zod';

export const productQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
  category: z.string().optional(),
});
