import { z } from 'zod';

export const LogTimeFormValidation = z.object({
	estimate: z
		.string()
		.regex(/^\d+[hm]$/, 'Формат времени: 1h, 30m и т.д.')
		.optional(),
	loggedTime: z
		.string()
		.regex(/^\d+[hm]$/, 'Формат времени: 1h, 30m и т.д.')
		.optional(),
	logComment: z.string().optional(),
});
