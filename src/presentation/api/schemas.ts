import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const amountSchema = z.object({
	amount: z.number().int().positive(),
});

export type AmountDto = z.infer<typeof amountSchema>;
