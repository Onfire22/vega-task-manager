import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState } from './types.ts';

export const initialState: IInitialState = {
	isModalShown: false,
};

const tasksSlice = createSlice({
	name: '@@tasks',
	initialState,
	reducers: {
		setIsModalShown: (state, action: PayloadAction<boolean>) => {
			state.isModalShown = action.payload;
		},
	},
});

export const { setIsModalShown } = tasksSlice.actions;

export default tasksSlice.reducer;
