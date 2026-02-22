import { baseApi } from '../index.ts';
import { METHODS } from '../constants.ts';
import type { IBaseDictionary, IStack } from '../types.ts';

const dictionariesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTaskPriorities: builder.query<{ success: boolean; payload: IBaseDictionary[] }, void>({
			query: () => ({
				url: '/priorities',
				method: METHODS.get,
			}),
		}),
		getStackList: builder.query<{ success: boolean; payload: IStack[] }, void>({
			query: () => ({
				url: '/stack',
				method: METHODS.get,
			}),
		}),
	}),
});

export const { useGetStackListQuery, useGetTaskPrioritiesQuery } = dictionariesApi;
