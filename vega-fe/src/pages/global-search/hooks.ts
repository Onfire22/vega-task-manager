import { useLocation } from 'react-router-dom';
import { useGetGlobalSearchResultsQuery } from '@/api/global-search/gobal-search.api.ts';
import { typedEntries } from '@/app/utils.ts';
import { useMemo } from 'react';
import type { SearchResults } from '@/pages/global-search/types.ts';

export const useSearchResults = () => {
	const location = useLocation();
	const searchQuery = new URLSearchParams(location.search).get('search');

	const { data, isLoading } = useGetGlobalSearchResultsQuery(searchQuery!, { skip: !searchQuery });

	const results = useMemo(() => {
		if (!data) return {};

		return typedEntries(data?.results ?? {}).reduce((acc, [key, values]) => {
			if (!values.length) {
				return acc;
			}

			(acc as SearchResults)[key] = values as never;
			return acc;
		}, {} as Partial<SearchResults>);
	}, [data]);

	return { searchResults: results, isLoading };
};
