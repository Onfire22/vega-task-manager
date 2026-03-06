import { METHODS, ROUTES } from '../constants.ts';
import type { ISignInUserData, IUserData, IAuthUserResponse, IDefaultResponse, IUserResponse } from '../types.ts';
import { baseApi } from '../index.ts';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signUpUser: builder.mutation<IAuthUserResponse, IUserData>({
			query: ({ email, name, password, secondName, userStackUUid }) => {
				const fieldsForRequest = {
					email,
					name,
					password,
					secondName,
					userStackUUid,
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
		getCurrentUser: builder.query<IUserResponse, void>({
			query: () => ({
				url: ROUTES.currentUser,
				method: METHODS.get,
			}),
			providesTags: ['CurrentUser'],
		}),
		checkIsEmailFree: builder.mutation<{ success: true }, string>({
			query: (email) => ({
				url: ROUTES.userByEmail,
				method: METHODS.post,
				body: { email },
			}),
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

export const {
	useSignUpUserMutation,
	useSignInUserMutation,
	useLogOutUserMutation,
	useGetCurrentUserQuery,
	useCheckIsEmailFreeMutation,
} = authApi;
