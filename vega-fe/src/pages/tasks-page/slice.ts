import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TActiveTab } from './types.ts';

export const initialState: IInitialState = {
	activeTab: 'table',
	isAssignee: false,
	sorting: {
		column: 'taskPriorityUuid',
		direction: 'desc',
	},
};

const tasksSlice = createSlice({
	name: '@@tasks',
	initialState,
	reducers: {
		setActiveTab: (state, action: PayloadAction<TActiveTab>) => {
			state.activeTab = action.payload;
		},
		setIsAssignee: (state, action: PayloadAction<boolean>) => {
			state.isAssignee = action.payload;
		},
		setSorting: (state, action: PayloadAction<{ column: string; direction: 'asc' | 'desc' }>) => {
			state.sorting = action.payload;
		},
	},
});

export const { setActiveTab, setIsAssignee, setSorting } = tasksSlice.actions;

export default tasksSlice.reducer;
