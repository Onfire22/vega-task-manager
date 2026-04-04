import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getActiveTabSelector = () => (state: RootState) => state.tasksReducer?.activeTab || initialState.activeTab;

export const getIsAssigneeSelector = () => (state: RootState) =>
	state.tasksReducer?.isAssignee || initialState.isAssignee;

export const getSortingSelector = () => (state: RootState) => state.tasksReducer?.sorting || initialState.sorting;

export const getFiltersStateSelector = () => (state: RootState) => state.tasksReducer?.filters || initialState.filters;

export const getPaginationSelector = () => (state: RootState) =>
	state.tasksReducer?.pagination || initialState.pagination;

export const getActiveFilters = () =>
	createSelector(getFiltersStateSelector(), (filters) => {
		return Object.entries(filters).reduce<Record<string, Array<string>>>((acc, [key, value]) => {
			acc[key] = Object.keys(value).reduce<Array<string>>((acc, item) => {
				if (value[item]) {
					acc.push(item);
				}

				return acc;
			}, []);

			return acc;
		}, {});
	});

export const getFiltersSelector = () =>
	createSelector(
		getSortingSelector(),
		getIsAssigneeSelector(),
		getActiveFilters(),
		getPaginationSelector(),
		(sorting, isAssignee, filters, pagination) => {
			const activeFilters = Object.entries(filters).reduce<Record<string, Array<string>>>((acc, [key, value]) => {
				if (value?.length > 0) {
					acc[key] = value;
				}

				return acc;
			}, {});

			return {
				sorting,
				isAssignee,
				filters: activeFilters,
				meta: { pagination },
			};
		},
	);

export const isAllFiltersButtonDisabled = () =>
	createSelector(getActiveFilters(), (activeFilters) => {
		return Object.values(activeFilters).reduce((acc, item) => (acc += item.length), 0) === 0;
	});
