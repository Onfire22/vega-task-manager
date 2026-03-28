import { PasswordSchema, type PersonalSchema } from '@/pages/user-profile-page/validation.ts';
import { z } from 'zod';

export interface IOption {
	value: string;
	label: string;
	description?: string | null;
	color?: string | undefined;
}

export type IPersonalForm = z.infer<typeof PersonalSchema>;

export type IPasswordForm = z.infer<typeof PasswordSchema>;
