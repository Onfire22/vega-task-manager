import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import type { TGetTaskLogsResponse } from './task-logs.types';
import { GetTaskLogsResponseSchema } from './task-logs.validation';

const taskLogsApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTaskLogs: builder.query<TGetTaskLogsResponse, string>({
			query: (uuid) => ({
				url: `${ROUTES.getTask}${uuid}/logs`,
				method: METHODS.get,
			}),
			extraOptions: { schema: GetTaskLogsResponseSchema },
			providesTags: ['TaskLogs'],
		}),
		createTaskLog: builder.mutation({
			query: (body) => ({
				url: ROUTES.createTaskLog,
				method: METHODS.post,
				body,
			}),
			invalidatesTags: ['Task', 'TaskLogs'],
		}),
	}),
});

export const { useCreateTaskLogMutation, useGetTaskLogsQuery } = taskLogsApi;
