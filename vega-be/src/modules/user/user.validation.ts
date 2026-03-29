import { z } from 'zod';

export const UserListBodySchema = z.object({
	filters: z.object({
		withOutProject: z.string().optional(),
		withProject: z.string().optional(),
		withoutUser: z.string().optional(),
		search: z.string().optional(),
	}),
});

export const UpdateUserBodySchema = z.object({
	name: z.string(),
	secondName: z.string(),
	userSpecialisationUuid: z.string(),
	userName: z.string(),
});

export const UpdateUserPasswordBodySchema = z.object({
	currentPassword: z.string(),
	newPassword: z.string(),
});
