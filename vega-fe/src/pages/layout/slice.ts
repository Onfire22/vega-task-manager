import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TActiveModal } from './types.ts';

export const initialState: IInitialState = {
	activeModal: null,
	isSidebarOpened: false,
};

const tasksSlice = createSlice({
	name: '@@layout',
	initialState,
	reducers: {
		setActiveModal: (state, action: PayloadAction<TActiveModal>) => {
			state.activeModal = action.payload;
		},
		setIsSidebarOpened: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpened = action.payload;
		},
	},
});

export const { setActiveModal, setIsSidebarOpened } = tasksSlice.actions;
export default tasksSlice.reducer;
