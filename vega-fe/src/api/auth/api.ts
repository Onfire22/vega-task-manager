import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, METHODS, ROUTES } from '../constants.ts';
import type { IUserData } from '../../pages/sign-up-page/types.ts';

export const authApi = createApi({
	reducerPath: '@@api/auth',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => ({
		signUpUser: builder.mutation<object, IUserData>({
			query: ({ email, name, password, secondName }) => {
				const fieldsForRequest = {
					email,
					name,
					password,
					secondName,
				};

				return {
					url: ROUTES.signUp,
					method: METHODS.post,
					body: fieldsForRequest,
				};
			},
		}),
	}),
});

export const { useSignUpUserMutation } = authApi;
