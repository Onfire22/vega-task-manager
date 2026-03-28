import { METHODS, ROUTES } from '../constants.ts';
import type {
	ISignInUserData,
	IUserData,
	TSignUpResponse,
	TSignInResponse,
	TCurrentUserResponse,
	TBaseResponse,
} from '../types.ts';
import { baseApi } from '@/api';
import {
	BaseResponseSchema,
	CurrentUserResponseSchema,
	SigInUserResponseSchema,
	SignUpUserResponseSchema,
} from '@/api/validation.ts';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		signUpUser: builder.mutation<TSignUpResponse, IUserData>({
			query: ({ email, name, password, secondName, userSpecialisationUuid }) => {
				const fieldsForRequest = {
					email,
					name,
					password,
					secondName,
					userSpecialisationUuid,
				};

				return {
					url: ROUTES.signUp,
					method: METHODS.post,
					body: fieldsForRequest,
				};
			},
			invalidatesTags: ['CurrentUser'],
			extraOptions: { schema: SignUpUserResponseSchema },
		}),
		signInUser: builder.mutation<TSignInResponse, ISignInUserData>({
			query: (userData) => ({
				url: ROUTES.signIn,
				method: METHODS.post,
				body: userData,
			}),
			invalidatesTags: ['CurrentUser'],
			extraOptions: { schema: SigInUserResponseSchema },
		}),
		getCurrentUser: builder.query<TCurrentUserResponse, void>({
			query: () => ({
				url: ROUTES.currentUser,
				method: METHODS.get,
			}),
			providesTags: ['CurrentUser'],
			extraOptions: { schema: CurrentUserResponseSchema },
		}),
		checkIsEmailFree: builder.mutation<TBaseResponse, string>({
			query: (email) => ({
				url: ROUTES.userByEmail,
				method: METHODS.post,
				body: { email },
			}),
		}),
		logOutUser: builder.mutation<TBaseResponse, void>({
			query: () => ({
				url: ROUTES.logout,
				method: METHODS.post,
			}),
			invalidatesTags: ['CurrentUser'],
			extraOptions: { schema: BaseResponseSchema },
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
