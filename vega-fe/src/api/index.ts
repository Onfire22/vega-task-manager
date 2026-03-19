import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, TAG_TYPES } from './constants.ts';

export const baseApi = createApi({
	reducerPath: '@@api/vega',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	tagTypes: TAG_TYPES,
	endpoints: () => ({}),
});
