import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TActiveModal } from './types.ts';

export const initialState: IInitialState = {
	activeModal: null,
};

const modalsSlice = createSlice({
	name: '@@modals',
	initialState,
	reducers: {
		setActiveModal: (state, action: PayloadAction<TActiveModal>) => {
			state.activeModal = action.payload;
		},
	},
});

export const { setActiveModal } = modalsSlice.actions;
export default modalsSlice.reducer;
