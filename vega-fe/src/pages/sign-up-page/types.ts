import { z } from 'zod';
import type { SignUpSchema } from '@/pages/sign-up-page/validation.ts';

export interface InitialState {
	activeStep: number;
}

export interface IRequirement {
	regex: RegExp;
	label: string;
}

export type DictionaryKey = 'lowerCaseLetters' | 'upperCaseLetters' | 'symbols' | 'numbers';

export interface IFormValues {
	email: string;
	password: string;
	passwordRepeat: string;
	name: string;
	secondName: string;
}

export interface IOptions {
	label: string;
	value: string;
}

export type TSignUpFormValues = z.infer<typeof SignUpSchema>;
