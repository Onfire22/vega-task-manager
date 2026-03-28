import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { IFiltersRequest, TUsersResponse } from '../types.ts';
import { UsersResponseSchema } from '@/api/validation.ts';

const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<TUsersResponse, IFiltersRequest>({
			query: (filters) => ({
				url: ROUTES.getUsers,
				method: METHODS.post,
				body: filters,
			}),
			extraOptions: { schema: UsersResponseSchema },
		}),
	}),
});

export const { useGetUsersQuery } = usersApi;
