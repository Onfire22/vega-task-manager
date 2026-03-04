import { METHODS, ROUTES } from '../constants.ts';
import type { ISignInUserData, IUserData, IAuthUserResponse, IDefaultResponse } from '../types.ts';
import { baseApi } from '../index.ts';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signUpUser: builder.mutation<IAuthUserResponse, IUserData>({
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
			invalidatesTags: ['CurrentUser'],
		}),
		signInUser: builder.mutation<IAuthUserResponse, ISignInUserData>({
			query: (userData) => ({
				url: ROUTES.signIn,
				method: METHODS.post,
				body: userData,
			}),
			invalidatesTags: ['CurrentUser'],
		}),
		getCurrentUser: builder.query<IUserData, void>({
			query: () => ({
				url: ROUTES.currentUser,
				method: METHODS.get,
			}),
			providesTags: ['CurrentUser'],
		}),
		logOutUser: builder.mutation<IDefaultResponse, void>({
			query: () => ({
				url: ROUTES.logout,
				method: METHODS.post,
			}),
			invalidatesTags: ['CurrentUser'],
		}),
	}),
});

export const { useSignUpUserMutation, useSignInUserMutation, useLogOutUserMutation, useGetCurrentUserQuery } = authApi;
