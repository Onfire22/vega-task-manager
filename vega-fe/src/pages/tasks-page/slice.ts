import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IFilters, IInitialState } from './types.ts';

export const initialState: IInitialState = {
	activeTab: 'table',
	isAssignee: false,
	sorting: {
		column: 'taskPriorityUuid',
		direction: 'desc',
	},
	filters: {
		taskPriorityUuid: {},
		taskStatusUuid: {},
		taskStackUuid: {},
	},
};

const tasksSlice = createSlice({
	name: '@@tasks',
	initialState,
	reducers: {
		setActiveTab: (state, action: PayloadAction<string>) => {
			state.activeTab = action.payload;
		},
		setIsAssignee: (state, action: PayloadAction<boolean>) => {
			state.isAssignee = action.payload;
		},
		setSorting: (state, action: PayloadAction<{ column: string; direction: 'asc' | 'desc' }>) => {
			state.sorting = action.payload;
		},
		setFilters: (state, action: PayloadAction<IFilters>) => {
			state.filters = action.payload;
		},
	},
});

export const { setActiveTab, setIsAssignee, setSorting, setFilters } = tasksSlice.actions;

export default tasksSlice.reducer;
