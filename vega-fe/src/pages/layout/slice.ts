import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TActiveModal } from './types.ts';

export const initialState: IInitialState = {
	activeModal: null,
};

const tasksSlice = createSlice({
	name: '@@layout',
	initialState,
	reducers: {
		setActiveModal: (state, action: PayloadAction<TActiveModal>) => {
			state.activeModal = action.payload;
		},
	},
});

export const { setActiveModal } = tasksSlice.actions;
export default tasksSlice.reducer;
