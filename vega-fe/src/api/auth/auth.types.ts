import {
	BaseResponseSchema,
	CurrentUserResponseSchema,
	SigInUserResponseSchema,
	SignUpUserResponseSchema,
} from './auth.validatioin';
import { z } from 'zod';

export interface ISignInUserData {
	email: string;
	password: string;
}

export interface IUserData {
	email: string;
	password: string;
	name: string;
	secondName: string;
}

export type TBaseResponse = z.infer<typeof BaseResponseSchema>;

export type TSignUpResponse = z.infer<typeof SignUpUserResponseSchema>;

export type TSignInResponse = z.infer<typeof SigInUserResponseSchema>;

export type TCurrentUserResponse = z.infer<typeof CurrentUserResponseSchema>;
