import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TActiveTab } from './types.ts';

export const initialState: IInitialState = {
	isModalShown: false,
	activeTab: 'table',
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
	},
});

export const { setIsModalShown, setActiveTab } = tasksSlice.actions;

export default tasksSlice.reducer;
