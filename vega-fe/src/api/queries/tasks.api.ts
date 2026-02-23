import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ICreateTask, ICreateTaskResponse } from '../types.ts';

const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation<{ success: boolean; payload: ICreateTaskResponse }, ICreateTask>({
			query: (taskData) => ({
				url: ROUTES.createTask,
				method: METHODS.post,
				body: taskData,
			}),
		}),
	}),
});

export const { useCreateTaskMutation } = tasksApi;
