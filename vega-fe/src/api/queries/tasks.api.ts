import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ICreateTask, ITask, ITaskResponse } from '../types.ts';

const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation<{ newTask: ITask }, ICreateTask>({
			query: (taskData) => ({
				url: ROUTES.createTask,
				method: METHODS.post,
				body: taskData,
			}),
			invalidatesTags: ['Tasks'],
		}),
		getTasks: builder.query<
			ITaskResponse,
			{ filters: { isAssignee: boolean; sorting: { column: string; direction: 'asc' | 'desc' } } }
		>({
			query: ({ filters }) => ({
				url: ROUTES.getTasks,
				method: METHODS.post,
				body: filters,
			}),
			providesTags: ['Tasks'],
		}),
	}),
});

export const { useCreateTaskMutation, useGetTasksQuery } = tasksApi;
