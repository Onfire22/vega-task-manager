import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type {
	IFiltersRequest,
	IUpdatePasswordRequest,
	IUpdateUserRequest,
	TBaseResponse,
	TUpdateUser,
	TUsersResponse,
} from '../types.ts';
import { BaseResponseSchema, UpdateUserResponseSchema, UsersResponseSchema } from '@/api/validation.ts';

const usersApi = baseApi.injectEndpoints({
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
		}),
		updateUserPassword: builder.mutation<TBaseResponse, IUpdatePasswordRequest>({
			query: (payload) => ({
				url: ROUTES.currentUserPassword,
				method: METHODS.post,
				body: payload,
			}),
			extraOptions: { schema: BaseResponseSchema },
		}),
	}),
});

export const { useGetUsersQuery, useUpdateUserMutation, useUpdateUserPasswordMutation } = usersApi;
