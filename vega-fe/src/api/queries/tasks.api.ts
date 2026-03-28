import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type {
	ICreateTask,
	IGetUserTasksRequest,
	TBaseResponse,
	TTaskResponse,
	TTasksResponse,
	TUpdateTaskRequest,
	UpdateTaskResponse,
} from '../types.ts';
import {
	BaseResponseSchema,
	TaskResponseSchema,
	TasksResponseSchema,
	UpdateTaskResponseSchema,
} from '@/api/validation.ts';

const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation<TBaseResponse, ICreateTask>({
			query: (taskData) => ({
				url: ROUTES.createTask,
				method: METHODS.post,
				body: taskData,
			}),
			invalidatesTags: ['Tasks'],
			extraOptions: { schema: BaseResponseSchema },
		}),
		getTasks: builder.query<TTasksResponse, IGetUserTasksRequest>({
			query: (filters) => ({
				url: ROUTES.getTasks,
				method: METHODS.post,
				body: filters,
			}),
			providesTags: ['Tasks'],
			extraOptions: { schema: TasksResponseSchema },
		}),
		getTask: builder.query<{ task: TTaskResponse }, string>({
			query: (uuid) => {
				return {
					url: `${ROUTES.getTask}${uuid}`,
					method: METHODS.get,
				};
			},
			providesTags: ['Task'],
			extraOptions: { schema: TaskResponseSchema },
		}),
		updateTask: builder.mutation<UpdateTaskResponse, TUpdateTaskRequest>({
			query: ({ uuid, ...rest }) => ({
				url: `${ROUTES.updateTask}${uuid}`,
				method: METHODS.patch,
				body: rest,
			}),
			invalidatesTags: ['Task'],
			extraOptions: { schema: UpdateTaskResponseSchema },
		}),
	}),
});

export const { useCreateTaskMutation, useGetTasksQuery, useGetTaskQuery, useUpdateTaskMutation } = tasksApi;
