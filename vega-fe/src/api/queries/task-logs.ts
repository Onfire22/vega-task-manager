import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';

const taskLogsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTaskLog: builder.mutation({
			query: (body) => ({
				url: ROUTES.createTaskLog,
				method: METHODS.post,
				body,
			}),
			invalidatesTags: ['Task'],
		}),
	}),
});

export const { useCreateTaskLogMutation } = taskLogsApi;
