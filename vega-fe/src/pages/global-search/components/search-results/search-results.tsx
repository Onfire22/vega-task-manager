import { SearchResultsView } from '@/pages/global-search/components/search-results/search-results.view.tsx';
import { useNavigate } from 'react-router-dom';
import type { TSearchResultsValues } from '@/pages/global-search/types.ts';
import { useSearchResults } from '@/pages/global-search/hooks.ts';

const SearchResults = () => {
	const navigate = useNavigate();

	const { searchResults } = useSearchResults();

	const handleRowDoubleClick = (items: TSearchResultsValues, uuid: string) => {
		const link = items.find((item) => item.uuid === uuid)?.link;
		if (link) {
			navigate(link);
		}
	};

	return <SearchResultsView results={searchResults} onRowDoubleClick={handleRowDoubleClick} />;
};

export { SearchResults };
