import { baseApi } from '@/api';
import { METHODS, ROUTES } from '../constants.ts';
import type {
	ICreateTask,
	IGetUserTasksRequest,
	IUpdateTaskEstimate,
	TBaseResponse,
	TCreateTaskResponse,
	TTaskResponse,
	TTasksResponse,
	TUpdateTaskRequest,
	UpdateTaskResponse,
} from './tasks.types';
import {
	BaseResponseSchema,
	TaskResponseSchema,
	TasksResponseSchema,
	UpdateTaskResponseSchema,
} from './tasks.validation';

const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation<TCreateTaskResponse, ICreateTask>({
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
		getTask: builder.query<TTaskResponse, string>({
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
				body: rest.fields,
			}),
			invalidatesTags: ['Task'],
			extraOptions: { schema: UpdateTaskResponseSchema },
		}),
		updateTaskEstimate: builder.mutation<TBaseResponse, IUpdateTaskEstimate>({
			query: (data) => ({
				url: `${ROUTES.updateTaskEstimate}${data.uuid}/estimate`,
				method: METHODS.post,
				body: data,
			}),
			invalidatesTags: ['Task'],
		}),
	}),
});

export const {
	useCreateTaskMutation,
	useGetTasksQuery,
	useGetTaskQuery,
	useUpdateTaskMutation,
	useUpdateTaskEstimateMutation,
} = tasksApi;
