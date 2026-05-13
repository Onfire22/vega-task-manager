import { baseApi } from '@/api';
import { METHODS, ROUTES } from '../constants.ts';
import type {
	IDeleteUserAvatar,
	IFiltersRequest,
	IUpdatePasswordRequest,
	IUpdateUserRequest,
	TBaseResponse,
	TUpdateUser,
	TUsersResponse,
} from './users.types';
import { BaseResponseSchema, UpdateUserResponseSchema, UsersResponseSchema } from './users.validation';

export const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<TUsersResponse, IFiltersRequest>({
			query: (filters) => ({
				url: ROUTES.getUsers,
				method: METHODS.post,
				body: filters,
			}),
			providesTags: ['Users'],
			extraOptions: { schema: UsersResponseSchema },
		}),
		updateUser: builder.mutation<TUpdateUser, IUpdateUserRequest>({
			query: (payload) => ({
				url: ROUTES.currentUser,
				method: METHODS.post,
				body: payload,
			}),
			extraOptions: { schema: UpdateUserResponseSchema },
			invalidatesTags: ['CurrentUser'],
		}),
		updateUserPassword: builder.mutation<TBaseResponse, IUpdatePasswordRequest>({
			query: (payload) => ({
				url: ROUTES.currentUserPassword,
				method: METHODS.post,
				body: payload,
			}),
			extraOptions: { schema: BaseResponseSchema },
		}),
		deleteUserAvatar: builder.mutation<TBaseResponse, IDeleteUserAvatar>({
			query: (url) => ({
				url: ROUTES.deleteAvatar,
				method: METHODS.delete,
				body: url,
			}),
			invalidatesTags: ['CurrentUser'],
		}),
	}),
});

export const { useGetUsersQuery, useUpdateUserMutation, useUpdateUserPasswordMutation, useDeleteUserAvatarMutation } =
	usersApi;
