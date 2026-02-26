import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { ITask } from '../types.ts';

const taskApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTask: builder.query<{ task: ITask }, string>({
			query: (uuid) => {
				return {
					url: ROUTES.getTask,
					method: METHODS.get,
					params: { uuid },
				};
			},
		}),
	}),
});

export const { useGetTaskQuery } = taskApi;
