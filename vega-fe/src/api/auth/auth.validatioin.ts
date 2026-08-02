import { z } from 'zod';

export const BaseResponseSchema = z.object({
	success: z.boolean(),
});

export const SignUpUserResponseSchema = z.object({
	accessToken: z.string().nullable(),
});

export const SigInUserResponseSchema = z.object({
	accessToken: z.string().nullable(),
});

export const CurrentUserResponseSchema = z.object({
	currentUser: z.object({
		uuid: z.string(),
		email: z.string(),
		name: z.string(),
		secondName: z.string(),
		userName: z.string(),
		avatarUrl: z.string().nullable(),
		isSuperUser: z.boolean(),
	}),
});
