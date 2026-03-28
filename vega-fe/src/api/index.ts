import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, TAG_TYPES } from './constants.ts';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { type ZodType } from 'zod';

const rawBaseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

const baseQuery: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError, { schema?: ZodType }> = async (
	args,
	api,
	extraOptions,
) => {
	const result = await rawBaseQuery(args, api, extraOptions);

	if (result.error) return result;

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
