import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export const initialState: { token: string | null } = {
	token: null,
};

const authSlice = createSlice({
	name: '@@auth',
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string | null>) => {
			state.token = action.payload;
		},
	},
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
