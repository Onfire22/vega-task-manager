import { FiltersMenuView } from './filters-menu-view';
import React, { useMemo } from 'react';
import type { IOptionType, TFilter } from '../types.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { setFilters } from '../slice.ts';
import { getFiltersStateSelector } from '../selectors.ts';

interface IProps {
	options: Array<IOptionType>;
	placeholder: string;
	size?: string;
	filter: TFilter;
	component: React.ComponentType<{
		children: string;
		size: string;
	}>;
}

const FiltersMenu: React.FC<IProps> = ({ component, options, placeholder, size, filter }) => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(getFiltersStateSelector());

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

	const filtersCount = useMemo(() => Object.keys(filters[filter]).length, [filters, filter]);

	console.log(filtersCount);

	return (
		<FiltersMenuView
			component={component}
			options={options}
			placeholder={placeholder}
			size={size}
			filters={filters}
			filter={filter}
			onCheckboxClick={handleCheckboxClick}
		/>
	);
};

export { FiltersMenu };
