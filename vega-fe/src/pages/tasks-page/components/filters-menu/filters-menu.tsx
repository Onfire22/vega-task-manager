import { FiltersMenuView } from './filters-menu.view.tsx';
import React, { useMemo } from 'react';
import type { IOptionType, TFilter } from '../../types.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { setFilters } from '../../slice.ts';
import { getActiveFilters, getFiltersStateSelector } from '../../selectors.ts';
import { FILTERS_COLORS } from '@/pages/tasks-page/constants.ts';

interface IProps {
	options: Array<IOptionType>;
	filter: TFilter;
	text: string;
}

const FiltersMenu: React.FC<IProps> = ({ options, filter, text }) => {
	const dispatch = useAppDispatch();

	const filters = useAppSelector(getFiltersStateSelector());
	const activeFilters = useAppSelector(getActiveFilters());

	const filtersCount = useMemo(() => activeFilters[filter].length, [activeFilters, filter]);

	const activeFilterColor = useMemo(() => {
		const activeFilter = activeFilters[filter];

		if (activeFilter.length > 0) {
			return `${FILTERS_COLORS[filter as keyof typeof FILTERS_COLORS]}80`;
		}

		return '';
	}, [filter, activeFilters]);

	const handleCheckboxClick = (value: string) => {
		const currentValue = filters[filter][value];

		dispatch(
			setFilters({
				...filters,
				[filter]: {
					...filters[filter],
					[value]: !currentValue,
				},
			}),
		);
	};

	const handleResetFilters = () => {
		dispatch(
			setFilters({
				...filters,
				[filter]: {},
			}),
		);
	};

	return (
		<FiltersMenuView
			options={options}
			filters={filters}
			filter={filter}
			text={text}
			filtersCount={filtersCount}
			activeFilterColor={activeFilterColor}
			onCheckboxClick={handleCheckboxClick}
			onResetFilters={handleResetFilters}
		/>
	);
};

export { FiltersMenu };
