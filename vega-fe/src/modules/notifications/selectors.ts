import type { RootState } from '@/store/reducer.ts';
import { initialState } from '@/modules/notifications/slice.ts';
import { createSelector } from '@reduxjs/toolkit';

export const getNotificationsSelector = () => (state: RootState) =>
	state.notificationsSlice.notifications || initialState.notifications;

export const getNotificationsCountSelector = () =>
	createSelector(getNotificationsSelector(), (notifications) => {
		return notifications.filter((item) => !item.isReaded).length;
	});
