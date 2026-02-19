import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormType, InitialState } from './types.ts';

export const initialState: InitialState = {
	activeForm: 'signup',
};

const signUpSlice = createSlice({
	name: '@@sign-up',
	initialState,
	reducers: {
		setActiveForm: (state, action: PayloadAction<FormType>) => {
			state.activeForm = action.payload;
		},
	},
});

export const { setActiveForm } = signUpSlice.actions;
export default signUpSlice.reducer;
