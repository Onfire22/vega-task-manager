import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ICreateTask, ITask } from '../types.ts';

export const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation<{ success: boolean; payload: ITask }, ICreateTask>({
			query: (taskData) => ({
				url: ROUTES.createTask,
				method: METHODS.post,
				body: taskData,
			}),
			invalidatesTags: ['Tasks'],
		}),
		getTasks: builder.query<{ success: boolean; payload: ITask[] }, { filters: { withAssignee: boolean } }>({
			query: ({ filters }) => ({
				url: ROUTES.getTasks,
				method: METHODS.get,
				params: {
					...filters,
				},
			}),
			providesTags: ['Tasks'],
		}),
	}),
});

export const { useCreateTaskMutation, useGetTasksQuery } = tasksApi;
