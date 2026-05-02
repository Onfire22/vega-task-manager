import type { RootState } from '@/store/reducer.ts';
import { initialState } from './slice.ts';

export const getIsSidebarOpenedSelector = () => (state: RootState) =>
	state.layoutReducer?.isSidebarOpened || initialState.isSidebarOpened;

export const getSearchValueSelector = () => (state: RootState) =>
	state.layoutReducer?.searchValue || initialState.searchValue;
