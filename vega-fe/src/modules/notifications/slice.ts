import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitialState, INotification } from '@/modules/notifications/types.ts';
import { notificationsApi } from '@/api/notifiactions/notifiactions.api.ts';

export const initialState: IInitialState = {
	notifications: [],
};

const notificationsSlice = createSlice({
	name: '@@notifications',
	initialState,
	reducers: {
		setNotifications: (state, action: PayloadAction<Array<INotification>>) => {
			state.notifications = [action.payload, ...state.notifications] as Array<INotification>;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(notificationsApi.endpoints.getNotifications.matchFulfilled, (state, action) => {
			state.notifications = action.payload;
		});
		builder.addMatcher(notificationsApi.endpoints.setNotificationsRead.matchFulfilled, (state, action) => {
			state.notifications = action.payload;
		});
	},
});

export default notificationsSlice.reducer;
export const { setNotifications } = notificationsSlice.actions;
