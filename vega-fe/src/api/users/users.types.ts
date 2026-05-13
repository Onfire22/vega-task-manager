import { z } from 'zod';
import {
	type BaseResponseSchema,
	UpdateUserResponseSchema,
	UsersResponseSchema,
} from '@/api/users/users.validation.ts';

export interface IFiltersRequest {
	filters: Partial<{
		withOutProject: string;
		withProject: string;
		withoutUser: string;
		search: string;
	}>;
}

export interface IUpdatePasswordRequest {
	currentPassword: string;
	newPassword: string;
}

export interface IUpdateUserRequest {
	name?: string;
	secondName?: string;
	userSpecialisationUuid?: string;
	avatarUrl?: string | null;
}

export interface IDeleteUserAvatar {
	avatarUrl?: string;
}

export type TBaseResponse = z.infer<typeof BaseResponseSchema>;

export type TUpdateUser = z.infer<typeof UpdateUserResponseSchema>;

export type TUsersResponse = z.infer<typeof UsersResponseSchema>;
