import { FiltersMenuView } from './filters-menu-view';
import React, { type ReactNode } from 'react';
import type { IOptionType, TFilter } from '../types.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { setFilters } from '../slice.ts';
import { getFiltersStateSelector } from '../selectors.ts';

interface IProps {
	options: Array<IOptionType>;
	filter: TFilter;
	component: ReactNode;
}

const FiltersMenu: React.FC<IProps> = ({ component, options, filter }) => {
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
			component={component}
			options={options}
			filters={filters}
			filter={filter}
			onCheckboxClick={handleCheckboxClick}
			onResetFilters={handleResetFilters}
		/>
	);
};

export { FiltersMenu };
