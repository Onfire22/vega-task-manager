import type { RootState } from '@/store/reducer.ts';
import { initialState } from '@/pages/chat/slice.ts';
import { createSelector } from '@reduxjs/toolkit';
import type { IChannelsGroups } from '@/pages/chat/types.ts';

export const getIsUsersControlsOpenSelector = () => (state: RootState) =>
	state.chatReducer?.isUsersControlsOpen || initialState.isUsersControlsOpen;

export const getNewChatModalSelector = () => (state: RootState) =>
	state.chatReducer?.newChatModal || initialState.newChatModal;

export const getActiveChannelUuidSelector = () => (state: RootState) =>
	state.chatReducer?.activeChannelUuid || initialState.activeChannelUuid;

export const getChannelsSelector = () => (state: RootState) => state.chatReducer?.channels || initialState.channels;

export const getChannelsGroupsSelector = () =>
	createSelector(getChannelsSelector(), (channels) => {
		if (!channels.length) return { channel: [], pm: [] };

		return channels.reduce((acc, channel) => {
			const channelType = channel.channelType.toLowerCase() as 'channel' | 'pm';
			if (!acc[channelType]) {
				acc[channelType] = [channel];
			} else {
				acc[channelType].push(channel);
			}

			return acc;
		}, {} as IChannelsGroups);
	});
