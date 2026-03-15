import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getActiveTabSelector = () => (state: RootState) => state.tasksReducer?.activeTab || initialState.activeTab;

export const getIsAssigneeSelector = () => (state: RootState) =>
	state.tasksReducer?.isAssignee || initialState.isAssignee;

export const getSortingSelector = () => (state: RootState) => state.tasksReducer?.sorting || initialState.sorting;

export const getFiltersStateSelector = () => (state: RootState) => state.tasksReducer?.filters || initialState.filters;

export const getFiltersSelector = () =>
	createSelector(
		getSortingSelector(),
		getIsAssigneeSelector(),
		getFiltersStateSelector(),
		(sorting, isAssignee, filters) => {
			const filtersData = Object.keys(filters).reduce((acc, filter) => {}, {});

			return {
				sorting,
				isAssignee,
			};
		},
	);
