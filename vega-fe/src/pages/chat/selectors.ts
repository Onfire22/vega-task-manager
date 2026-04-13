import type { RootState } from '@/store/reducer.ts';
import { initialState } from '@/pages/chat/slice.ts';
import { createSelector } from '@reduxjs/toolkit';
import type { TChannelsGroups } from '@/pages/chat/types.ts';
import { getChannelWithNormalizeUsers } from '@/pages/chat/utils.ts';
import { CHANNEL_HEADER_VISIBILITY } from '@/pages/chat/constants.ts';
import { getAvatarColor } from '@/app/utils.ts';

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
			const channelType = channel.channelType;

			let channelAvatar = null;

			if (channelType === 'pm') {
				const user = channel.users.find((user) => user.role.key === 'chat_member');
				channelAvatar = {
					color: getAvatarColor(user?.id),
					initials: `${user?.name[0]}. ${user?.secondName[0]}.`.toUpperCase(),
				};
			}

			const channelData = {
				...channel,
				...(channelAvatar ? { channelAvatar } : {}),
				users: getChannelWithNormalizeUsers(channel.users),
			};

			if (!acc[channelType]) {
				acc[channelType] = [];
			}

			acc[channelType].push(channelData);

			return acc;
		}, {} as TChannelsGroups);
	});

export const getActiveChannelUsersSelector = () =>
	createSelector(getActiveChannelSelector(), (activeChannel) => activeChannel?.users ?? []);

export const getChannelHeaderDataSelector = () =>
	createSelector(getActiveChannelSelector(), (activeChannel) => {
		if (!activeChannel) return null;

		const channelVisibility =
			activeChannel.channelType === 'channel' ? CHANNEL_HEADER_VISIBILITY[activeChannel.channelVisibility] : null;

		return {
			membersCount: activeChannel.users.length,
			channelTitle: activeChannel.title,
			...(channelVisibility ? { channelVisibility } : {}),
		};
	});

export const getIsUsersButtonDisabledSelector = () =>
	createSelector(getActiveChannelSelector(), (activeChannel) => !activeChannel || activeChannel.channelType === 'pm');
