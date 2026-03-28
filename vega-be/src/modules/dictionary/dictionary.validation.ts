import { z } from 'zod';

export const DictionariesQuerySchema = z.object({
	filters: z.string(),
});
