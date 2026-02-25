import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';

const taskApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTask: builder.query<object, string>({
			query: (uuid) => ({
				url: ROUTES.getTask,
				method: METHODS.get,
				params: { uuid },
			}),
		}),
	}),
});

export const { useGetTaskQuery } = taskApi;
