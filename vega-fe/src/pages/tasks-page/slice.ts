import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TActiveTab } from './types.ts';

export const initialState: IInitialState = {
	isModalShown: false,
	activeTab: 'table',
	isAssignee: false,
};

const tasksSlice = createSlice({
	name: '@@tasks',
	initialState,
	reducers: {
		setIsModalShown: (state, action: PayloadAction<boolean>) => {
			state.isModalShown = action.payload;
		},
		setActiveTab: (state, action: PayloadAction<TActiveTab>) => {
			state.activeTab = action.payload;
		},
		setIsAssignee: (state, action: PayloadAction<boolean>) => {
			state.isAssignee = action.payload;
		},
	},
});

export const { setIsModalShown, setActiveTab, setIsAssignee } = tasksSlice.actions;

export default tasksSlice.reducer;
