import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState } from './types.ts';

export const initialState: IInitialState = {
	isSidebarOpened: false,
};

const tasksSlice = createSlice({
	name: '@@layout',
	initialState,
	reducers: {
		setIsSidebarOpened: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpened = action.payload;
		},
	},
});

export const { setIsSidebarOpened } = tasksSlice.actions;
export default tasksSlice.reducer;
