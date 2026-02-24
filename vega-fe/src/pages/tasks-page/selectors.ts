import type { RootState } from '../../store/reducer.ts';
import { initialState } from './slice.ts';

export const getIsModalShownSelector = () => (state: RootState) =>
	state.tasksReducer?.isModalShown || initialState.isModalShown;

export const getActiveTabSelector = () => (state: RootState) => state.tasksReducer?.activeTab || initialState.activeTab;

export const getIsAssigneeSelector = () => (state: RootState) =>
	state.tasksReducer?.isAssignee || initialState.isAssignee;
