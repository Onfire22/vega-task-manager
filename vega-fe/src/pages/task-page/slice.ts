import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, TField, TModalType } from './types.ts';
import { INITIAL_FIELD_VALUES } from '@/pages/task-page/constants.ts';

export const initialState: IInitialState = {
	modalType: null,
	taskField: INITIAL_FIELD_VALUES,
};

const taskSlice = createSlice({
	name: '@@task',
	initialState,
	reducers: {
		setModalType: (state, action: PayloadAction<TModalType>) => {
			state.modalType = action.payload;
		},
		setTaskField: (state, action: PayloadAction<TField>) => {
			state.taskField = action.payload;
		},
	},
});

export const { setModalType, setTaskField } = taskSlice.actions;
export default taskSlice.reducer;
