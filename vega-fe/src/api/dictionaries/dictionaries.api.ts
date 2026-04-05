import { baseApi } from '@/api';
import { METHODS, ROUTES } from '../constants.ts';
import { DictionariesResponseSchema } from './dictionaries.validation';
import type { TDictionariesRequest, TDictionariesResponse } from './dictionaries.types.ts';

const dictionariesApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getDictionaries: builder.query<TDictionariesResponse, TDictionariesRequest>({
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
