import { z } from 'zod';

export const CompanyCreateValidationSchema = z.object({
	companyTitle: z.string().min(3),
	companyAvatar: z.file(),
	inn: z.string(),
	address: z.string(),
	main_color: z.string().optional(),
	accent_color: z.string().optional(),
});
