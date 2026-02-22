import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { IBaseDictionary, IDictionaryItem, IServerResponse, IStack } from '../types.ts';

const dictionariesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getTaskPriorities: builder.query<{ success: boolean; payload: IDictionaryItem[] }, void>({
			query: () => ({
				url: ROUTES.priorities,
				method: METHODS.get,
			}),
			transformResponse: (response: IServerResponse<IBaseDictionary>) => {
				return {
					...response,
					payload: response.payload.map((item) => ({
						label: item.name,
						value: item.id,
					})),
				};
			},
		}),
		getStackList: builder.query<{ success: boolean; payload: IDictionaryItem[] }, void>({
			query: () => ({
				url: ROUTES.stack,
				method: METHODS.get,
			}),
			transformResponse: (response: IServerResponse<IStack>) => {
				return {
					...response,
					payload: response.payload.map((item) => ({
						...item,
						label: item.fullName,
						value: item.id,
					})),
				};
			},
		}),
	}),
});

export const { useGetStackListQuery, useGetTaskPrioritiesQuery } = dictionariesApi;
