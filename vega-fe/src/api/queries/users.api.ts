import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { IUsers } from '../types.ts';

const usersApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<IUsers, void>({
			query: () => ({
				url: ROUTES.getUsers,
				method: METHODS.get,
			}),
		}),
	}),
});

export const { useGetUsersQuery } = usersApi;
