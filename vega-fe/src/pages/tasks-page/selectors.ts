import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getIsModalShownSelector = () => (state: RootState) =>
	state.tasksReducer?.isModalShown || initialState.isModalShown;

export const getActiveTabSelector = () => (state: RootState) => state.tasksReducer?.activeTab || initialState.activeTab;

export const getIsAssigneeSelector = () => (state: RootState) =>
	state.tasksReducer?.isAssignee || initialState.isAssignee;

export const getSortingSelector = () => (state: RootState) => state.tasksReducer?.sorting || initialState.sorting;

export const getActiveModalSelector = () => (state: RootState) =>
	state.tasksReducer?.activeModal || initialState.activeModal;

export const getFiltersSelector = () =>
	createSelector(getSortingSelector(), getIsAssigneeSelector(), (sorting, isAssignee) => {
		return {
			sorting,
			isAssignee,
		};
	});
