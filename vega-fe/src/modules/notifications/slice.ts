import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, INotification } from '@/modules/notifications/types.ts';

export const initialState: IInitialState = {
	notifications: [],
};

const notificationsSlice = createSlice({
	name: '@@notifications',
	initialState,
	reducers: {
		setNotifications: (state, action: PayloadAction<Array<INotification>>) => {
			state.notifications = [...state.notifications, action.payload] as Array<INotification>;
		},
	},
});

export default notificationsSlice.reducer;
export const { setNotifications } = notificationsSlice.actions;
