import { z } from 'zod';

export const BaseResponseSchema = z.object({
	success: z.boolean(),
});

export const UpdateUserResponseSchema = z.object({
	newUser: z.object({
		uuid: z.string(),
		name: z.string(),
		secondName: z.string(),
		email: z.string(),
		userName: z.string(),
		userSpecialisationUuid: z.string(),
		createdAt: z.string(),
		updatedAt: z.string(),
	}),
});

export const UsersResponseSchema = z.object({
	usersList: z.array(
		z.object({
			uuid: z.string(),
			name: z.string(),
			secondName: z.string(),
		}),
	),
});
