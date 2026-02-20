import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, METHODS } from '../../api/constants.ts';
import type { IUserData } from './types.ts';

export const signUpApi = createApi({
	reducerPath: '@@api/sign-up',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	endpoints: (builder) => ({
		signUpUser: builder.mutation<object, IUserData>({
			query: (userData) => {
				const fieldsForRequest = Object.keys(userData).reduce<
					Partial<IUserData>
				>((acc, key) => {
					if (key !== 'passwordRepeat') {
						acc[key as keyof IUserData] =
							userData[key as keyof IUserData];
					}

					return acc;
				}, {});

				return {
					url: 'sign-up',
					method: METHODS.post,
					body: fieldsForRequest,
				};
			},
		}),
	}),
});

export const { useSignUpUserMutation } = signUpApi;
