import { z } from 'zod';

const timeField = z.union([z.string().regex(/^\d+[hm]$/, 'Формат времени: 1h, 30m и т.д.'), z.literal('')]);

export const LogTimeFormValidation = z.object({
	estimate: timeField.optional(),
	loggedTime: timeField.optional(),
	description: z.string().optional(),
});
