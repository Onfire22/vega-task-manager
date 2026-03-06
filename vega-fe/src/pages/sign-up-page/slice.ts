import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { InitialState } from './types.ts';

export const initialState: InitialState = {
	activeStep: 0,
};

const signUpSlice = createSlice({
	name: '@@sign-up',
	initialState,
	reducers: {
		setActiveStep: (state, action: PayloadAction<number>) => {
			state.activeStep = action.payload;
		},
	},
});

export const { setActiveStep } = signUpSlice.actions;
export default signUpSlice.reducer;
