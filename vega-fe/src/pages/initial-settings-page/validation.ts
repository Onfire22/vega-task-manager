import { z } from 'zod';

export const InitialCompanySettingsValidationSchema = z.object({
	companyTitle: z.string().min(1, 'Это обязательное поле'),
	companyAvatar: z.instanceof(File).optional(),
	inn: z.string(),
	address: z.string(),
	mainColor: z.string(),
	accentColor: z.string(),
});

export const InitialTeamsValidationSchema = z.object({
	items: z.array(
		z.object({
			id: z.string(),
			teamTitle: z.string().min(3, 'Это обязательное поле'),
			teamAvatar: z.instanceof(File).optional(),
		}),
	),
});
