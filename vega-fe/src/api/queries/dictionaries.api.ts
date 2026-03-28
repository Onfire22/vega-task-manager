import { baseApi } from '../index.ts';
import { METHODS, ROUTES } from '../constants.ts';
import type { TDictionariesResponse, TDictionariesTypes } from '../types.ts';
import { DictionariesResponseSchema } from '@/api/validation.ts';

const dictionariesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getDictionaries: builder.query<TDictionariesResponse, TDictionariesTypes[]>({
			query: (filters) => ({
				method: METHODS.get,
				url: ROUTES.dictionaries,
				params: { filters },
			}),
			keepUnusedDataFor: Infinity,
			extraOptions: { schema: DictionariesResponseSchema },
		}),
	}),
});

export const { useGetDictionariesQuery } = dictionariesApi;
