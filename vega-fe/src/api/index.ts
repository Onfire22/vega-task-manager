import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './constants.ts';

export const baseApi = createApi({
	reducerPath: '@@api/vega',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
	}),
	tagTypes: ['CurrentUser', 'Tasks', 'Task', 'Users', 'Projects', 'Project'],
	endpoints: () => ({}),
});
