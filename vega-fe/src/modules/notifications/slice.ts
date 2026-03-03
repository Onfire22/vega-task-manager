import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, INotification } from './types.ts';

export const initialState: IInitialState = {
	notification: null,
};

const notificationsSlice = createSlice({
	name: '@@notifications',
	initialState,
	reducers: {
		setNotification: (state, action: PayloadAction<INotification | null>) => {
			state.notification = action.payload;
		},
	},
});

export const { setNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;
