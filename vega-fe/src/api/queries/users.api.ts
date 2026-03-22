import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { IFiltersRequest, IUsers } from '../types.ts';

const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<IUsers, IFiltersRequest>({
			query: (filters) => ({
				url: ROUTES.getUsers,
				method: METHODS.post,
				body: filters,
			}),
		}),
	}),
});

export const { useGetUsersQuery } = usersApi;
