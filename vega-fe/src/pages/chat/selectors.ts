import type { RootState } from '@/store/reducer.ts';
import { initialState } from '@/pages/chat/slice.ts';
import { createSelector } from '@reduxjs/toolkit';
import type { IChannelsGroups } from '@/pages/chat/types.ts';
import { getChannelWithNormalizeUsers } from '@/pages/chat/utils.ts';

export const getIsUsersControlsOpenSelector = () => (state: RootState) =>
	state.chatReducer?.isUsersControlsOpen || initialState.isUsersControlsOpen;

export const getNewChatModalSelector = () => (state: RootState) =>
	state.chatReducer?.newChatModal || initialState.newChatModal;

export const getActiveChannelSelector = () => (state: RootState) =>
	state.chatReducer?.activeChannel || initialState.activeChannel;

export const getChannelsSelector = () => (state: RootState) => state.chatReducer?.channels || initialState.channels;

export const getChannelsGroupsSelector = () =>
	createSelector(getChannelsSelector(), (channels) => {
		if (!channels.length) return { channel: [], pm: [] };

		return channels.reduce((acc, channel) => {
			const channelType = channel.channelType.toLowerCase() as 'channel' | 'pm';

			const channelData = { ...channel, users: getChannelWithNormalizeUsers(channel.users) };

			if (!acc[channelType]) {
				acc[channelType] = [channelData];
			} else {
				acc[channelType].push(channelData);
			}

			return acc;
		}, {} as IChannelsGroups);
	});

export const getActiveChannelUsers = () =>
	createSelector(getActiveChannelSelector(), (activeChannel) => activeChannel?.users ?? []);
