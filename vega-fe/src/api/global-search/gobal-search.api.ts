import { baseApi } from '@/api';
import { METHODS, ROUTES } from '@/api/constants.ts';
import type { TGlobalSearchResponse } from '@/api/global-search/global-search.types.ts';

const globalSearchApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getGlobalSearchResults: builder.query<TGlobalSearchResponse, string>({
			query: (searchQuery) => ({
				method: METHODS.get,
				url: `${ROUTES.search}${searchQuery}`,
			}),
		}),
	}),
});

export const { useGetGlobalSearchResultsQuery } = globalSearchApi;
