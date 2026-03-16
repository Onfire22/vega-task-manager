import { FiltersMenuView } from './filters-menu-view';
import React, { useMemo } from 'react';
import type { IOptionType, TFilter } from '../types.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { setFilters } from '../slice.ts';
import { getActiveFilters, getFiltersStateSelector } from '../selectors.ts';
import { FILTERS_COLORS } from '../constants.ts';

interface IProps {
	options: Array<IOptionType>;
	placeholder: string;
	size?: string;
	filter: TFilter;
	component: React.ComponentType<{
		children: string;
		size: string;
		leftSection: React.ReactNode;
	}>;
}

const FiltersMenu: React.FC<IProps> = ({ component, options, placeholder, size, filter }) => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(getFiltersStateSelector());
	const activeFilters = useAppSelector(getActiveFilters());

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

	const filtersCount = useMemo(() => activeFilters[filter].length, [activeFilters, filter]);

	const activeFilterColor = useMemo(() => {
		const activeFilter = activeFilters[filter];

		if (activeFilter.length > 0) {
			return `${FILTERS_COLORS[filter]}80`;
		}
	}, [filter, activeFilters]);

	return (
		<FiltersMenuView
			component={component}
			options={options}
			placeholder={placeholder}
			size={size}
			filters={filters}
			filter={filter}
			filtersCount={filtersCount}
			activeFilterColor={activeFilterColor}
			onCheckboxClick={handleCheckboxClick}
			onResetFilters={handleResetFilters}
		/>
	);
};

export { FiltersMenu };
