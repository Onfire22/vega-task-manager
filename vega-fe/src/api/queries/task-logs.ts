import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import type { TGetTaskLogsResponse } from '@/api/types.ts';
import { GetTaskLogsResponseSchema } from '@/api/validation.ts';

const taskLogsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTaskLogs: builder.query<TGetTaskLogsResponse, string>({
			query: (uuid) => ({
				url: `${ROUTES.getTask}${uuid}/logs`,
				method: METHODS.get,
			}),
			extraOptions: { schema: GetTaskLogsResponseSchema },
		}),
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

export const { useCreateTaskLogMutation, useGetTaskLogsQuery } = taskLogsApi;
