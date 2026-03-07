import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState } from './types.ts';

export const initialState: IInitialState = {
	isModalShown: false,
};

const taskSlice = createSlice({
	name: '@@task',
	initialState,
	reducers: {
		setIsModalShown: (state, action: PayloadAction<boolean>) => {
			state.isModalShown = action.payload;
		},
	},
});

export const { setIsModalShown } = taskSlice.actions;
export default taskSlice.reducer;
