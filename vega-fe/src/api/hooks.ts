import {
	useGetStackListQuery,
	useGetTaskPrioritiesQuery,
	useGetTaskStatusesQuery,
} from './queries/dictionaries.api.ts';
import type { IRequestOptions } from './types.ts';

export const useGetDictionariesHook = (requestOptions: IRequestOptions) => {
	useGetStackListQuery(undefined, requestOptions);
	useGetTaskPrioritiesQuery(undefined, requestOptions);
	useGetTaskStatusesQuery(undefined, requestOptions);
};
