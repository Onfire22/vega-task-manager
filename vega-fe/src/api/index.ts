import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, METHODS, ROUTES, TAG_TYPES } from './constants.ts';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type ZodType } from 'zod';
import type { RootState } from '@/store/reducer.ts';
import { setToken } from '@/store/authSlice.ts';
import { initSocket, socket } from '@/api/websocket.ts';
import { hasFileValues } from '@/api/utils.ts';

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
	const fetchArgs: FetchArgs = typeof args === 'string' ? { url: args } : args;
	const body = typeof fetchArgs.body !== 'string' ? fetchArgs.body : {};

	if (hasFileValues(body)) {
		const formData = new FormData();

		Object.keys(body).forEach((key) => {
			formData.append(key, body[key]);
		});

		fetchArgs.body = formData;
	}

	let result = await rawBaseQuery(fetchArgs, api, extraOptions);

	if (result.error?.status === 401) {
		const refreshResult = await rawBaseQuery({ url: ROUTES.refresh, method: METHODS.post }, api, extraOptions);

		if (refreshResult.error) {
			console.log('Refresh error:', refreshResult.error);
		}

		if (refreshResult.data) {
			const { accessToken } = refreshResult.data as { accessToken: string };
			api.dispatch(setToken(accessToken));
			initSocket(accessToken);

			socket.auth = { token: accessToken };
			socket.disconnect().connect();

			result = await rawBaseQuery(fetchArgs, api, extraOptions);
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
