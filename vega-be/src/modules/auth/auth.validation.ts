import { z } from 'zod';

export const SignUpBodySchema = z.object({
	email: z.email(),
	name: z.string(),
	password: z.string(),
	secondName: z.string(),
});

export const SignInBodySchema = z.object({
	email: z.email(),
	password: z.string(),
});

export const UserByEmailBodySchema = z.object({
	email: z.email(),
});
