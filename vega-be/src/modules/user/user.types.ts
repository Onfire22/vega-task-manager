import { UpdateUserBodySchema, UpdateUserPasswordBodySchema, UserListBodySchema } from './user.validation';
import { z } from 'zod';

export interface IUser {
	email: string;
	id: string;
	name: string;
	secondName: string | null;
}

export interface IUserResponse {
	currentUser: IUser;
}

export interface IGetUserListResponse {
	usersList: Array<Partial<Pick<IUser, 'id' | 'name' | 'secondName'>>>;
}

export type TUpdateUserData = TUpdateUserBody & { avatarUrl: string };

export type TUserListBody = z.infer<typeof UserListBodySchema>;

export type TUpdateUserBody = z.infer<typeof UpdateUserBodySchema>;

export type TUpdateUserPasswordBody = z.infer<typeof UpdateUserPasswordBodySchema>;
