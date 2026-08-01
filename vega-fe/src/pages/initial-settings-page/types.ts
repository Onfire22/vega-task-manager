import { z } from 'zod';
import {
	InitialCompanySettingsValidationSchema,
	InitialTeamsValidationSchema,
} from '@/pages/initial-settings-page/validation.ts';

export type CompanySettingsFormValues = z.infer<typeof InitialCompanySettingsValidationSchema>;

export type TeamsSettingsFormValues = z.infer<typeof InitialTeamsValidationSchema>;

export interface ITeamsPreset {
	id: string;
	avatarPath: string;
	fullName: string;
	isSelected: boolean;
}

export type TTeamsPresets = Array<ITeamsPreset>;

export type TScreenTypes = 'greet' | 'company' | 'teams';
