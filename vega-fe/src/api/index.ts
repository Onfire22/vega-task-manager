import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, METHODS, ROUTES, TAG_TYPES } from './constants.ts';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type ZodType } from 'zod';
import type { RootState } from '@/store/reducer.ts';
import { setToken } from '@/store/authSlice.ts';

const rawBaseQuery = fetchBaseQuery({
	baseUrl: BASE_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).authSlice.token;
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}
		return headers;
	},
});

const baseQuery: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError, { schema?: ZodType }> = async (
	args,
	api,
	extraOptions,
) => {
	let result = await rawBaseQuery(args, api, extraOptions);

	if (result.error?.status === 401) {
		const refreshResult = await rawBaseQuery({ url: ROUTES.refresh, method: METHODS.post }, api, extraOptions);

		if (refreshResult.error) {
			console.log('Refresh error:', refreshResult.error);
		}

		if (refreshResult.data) {
			const { accessToken } = refreshResult.data as { accessToken: string };
			api.dispatch(setToken(accessToken));
			result = await rawBaseQuery(args, api, extraOptions);
		}
	}

	if (extraOptions?.schema) {
		const parsed = extraOptions.schema.safeParse(result.data);
		if (!parsed.success) {
			console.warn('Validation failed:', parsed.error.issues);
		}
	}

	return result;
};

export const baseApi = createApi({
	reducerPath: '@@api/vega',
	baseQuery: baseQuery,
	tagTypes: TAG_TYPES,
	endpoints: () => ({}),
});
