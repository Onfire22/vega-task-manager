import { SignInBodySchema, SignUpBodySchema, UserByEmailBodySchema } from './auth.validation';
import { z } from 'zod';
import type { JwtPayload } from 'jsonwebtoken';

export interface IAuthRes {
	accessToken: string;
}

export interface TokenPayload extends JwtPayload {
	id: string;
}

export type TSignUpBody = z.infer<typeof SignUpBodySchema>;

export type TSignInBody = z.infer<typeof SignInBodySchema>;

export type TUserByEmailBody = z.infer<typeof UserByEmailBodySchema>;
