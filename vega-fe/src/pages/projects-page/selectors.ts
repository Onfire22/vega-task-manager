import type { RootState } from '@/store/reducer.ts';
import { initialState } from '@/pages/projects-page/slice.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getPaginationSelector = () => (state: RootState) =>
	state.projectsReducer?.pagination || initialState.pagination;

export const getProjectsMetaSelector = () =>
	createSelector(getPaginationSelector(), (pagination) => {
		return {
			meta: { pagination },
		};
	});
