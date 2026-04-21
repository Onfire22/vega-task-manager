import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TModalType } from './types.ts';

export const initialState: IInitialState = {
	modalType: null,
};

const taskSlice = createSlice({
	name: '@@task',
	initialState,
	reducers: {
		setModalType: (state, action: PayloadAction<TModalType>) => {
			state.modalType = action.payload;
		},
	},
});

export const { setModalType } = taskSlice.actions;
export default taskSlice.reducer;
