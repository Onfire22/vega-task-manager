import { SignInBodySchema, SignUpBodySchema, UserByEmailBodySchema } from './auth.validation';
import { z } from 'zod';

export interface IAuthRes {
	user: {
		email: string;
		id: string;
		name: string;
		secondName: string | null;
	};
}

export interface ICookie {
	token: string;
}

export type TSignUpBody = z.infer<typeof SignUpBodySchema>;

export type TSignInBody = z.infer<typeof SignInBodySchema>;

export type TUserByEmailBody = z.infer<typeof UserByEmailBodySchema>;
