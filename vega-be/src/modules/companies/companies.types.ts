import { z } from 'zod';
import { CompanyCreateValidationSchema } from './companies.validation';

export type TCompanyCreateRequestSchema = z.infer<typeof CompanyCreateValidationSchema>;

export interface ICompanyCreate {
	companyTitle: string;
	companyAvatar: string;
	inn: string;
	address: string;
	main_color?: string;
	accent_color?: string;
}
