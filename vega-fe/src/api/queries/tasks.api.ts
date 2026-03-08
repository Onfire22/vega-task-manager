import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ICreateTask, IDefaultResponse, IExpTaskResponse, IGetUserTasksRequest, TTaskList } from '../types.ts';

const tasksApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		createTask: builder.mutation<IDefaultResponse, ICreateTask>({
			query: (taskData) => ({
				url: ROUTES.createTask,
				method: METHODS.post,
				body: taskData,
			}),
			invalidatesTags: ['Tasks'],
		}),
		getTasks: builder.query<TTaskList, IGetUserTasksRequest>({
			query: ({ filters }) => ({
				url: ROUTES.getTasks,
				method: METHODS.post,
				body: filters,
			}),
			providesTags: ['Tasks'],
		}),
		getTask: builder.query<{ task: IExpTaskResponse }, string>({
			query: (uuid) => {
				return {
					url: `${ROUTES.getTask}${uuid}`,
					method: METHODS.get,
				};
			},
			providesTags: ['Task'],
		}),
		updateTask: builder.mutation({
			query: ({ uuid, ...rest }) => ({
				url: `${ROUTES.updateTask}${uuid}`,
				method: METHODS.patch,
				body: rest,
			}),
			invalidatesTags: ['Task'],
		}),
	}),
});

export const { useCreateTaskMutation, useGetTasksQuery, useGetTaskQuery, useUpdateTaskMutation } = tasksApi;
