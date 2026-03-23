import { FiltersTriggerView } from './filters-trigger.view';
import React, { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks.ts';
import { getActiveFilters } from '@/pages/tasks-page/selectors.ts';
import { FILTERS_COLORS } from '@/pages/tasks-page/constants.ts';

interface IProps {
	text: string;
	filter: string;
}

const FiltersTrigger: React.FC<IProps> = ({ text, filter }) => {
	const activeFilters = useAppSelector(getActiveFilters());

	const filtersCount = useMemo(() => activeFilters[filter].length, [activeFilters, filter]);

	const activeFilterColor = useMemo(() => {
		const activeFilter = activeFilters[filter];

		if (activeFilter.length > 0) {
			return `${FILTERS_COLORS[filter as keyof typeof FILTERS_COLORS]}80`;
		}

		return '';
	}, [filter, activeFilters]);

	return <FiltersTriggerView text={text} filtersCount={filtersCount} activeFilterColor={activeFilterColor} />;
};

export { FiltersTrigger };
