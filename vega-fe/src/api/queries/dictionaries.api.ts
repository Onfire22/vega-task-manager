import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { IDictionariesResponse, TDictionariesTypes } from '../types.ts';

const dictionariesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getDictionaries: builder.query<IDictionariesResponse, TDictionariesTypes[]>({
			query: (filters) => ({
				method: METHODS.get,
				url: ROUTES.dictionaries,
				params: { filters },
			}),
			keepUnusedDataFor: Infinity,
		}),
	}),
});

export const { useGetDictionariesQuery } = dictionariesApi;
