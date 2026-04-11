import { createSlice } from '@reduxjs/toolkit';
import type { IInitialState } from '@/pages/chat/types.ts';

export const initialState: IInitialState = {
	isUsersControlsOpen: false,
};

const chatSlice = createSlice({
	name: '@@name',
	initialState,
	reducers: {
		setIsUsersControlsOpen: (state, action) => {
			state.isUsersControlsOpen = action.payload;
		},
	},
});

export const { setIsUsersControlsOpen } = chatSlice.actions;
export default chatSlice.reducer;
