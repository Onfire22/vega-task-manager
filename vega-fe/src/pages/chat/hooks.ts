import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelUuidSelector, getSidebarSearchValueSelector } from '@/pages/chat/selectors.ts';
import { useUsersOptions } from '@/api/users/users.hooks.ts';
import { useGetChannelsQuery, useGetUserChannelsQuery } from '@/api/channels/channels.api.ts';
import type { IChannel, IMappedMessage, IMessage, TChannelsGroups } from '@/pages/chat/types.ts';
import { useGetMessagesQuery } from '@/api/messages/messages.api.ts';
import { format } from 'date-fns';
import { CHANNEL_HEADER_VISIBILITY, DATE_FORMAT, TIME_FORMAT } from '@/pages/chat/constants.ts';
import { getAvatarColor, useDebounce } from '@/app/utils.ts';
import { getChannelWithNormalizeUsers } from '@/pages/chat/utils.ts';

export const useUsersWithFilters = (searchValue?: string) => {
	const meta = {
		filters: {
			...(searchValue ? { search: searchValue } : {}),
		},
	};

	const { usersListOptions } = useUsersOptions(meta);

	return { usersListOptions };
};

export const useChannelsList = () => {
	const { data, isLoading } = useGetChannelsQuery();

	if (!data) return { channels: [], isLoading };

	const channels = data.channels.map((channel) => {
		const { users, ...rest } = channel;
		const channelAdminData = users.find((user) => user.role.key === 'chat_admin');

		return {
			...rest,
			usersLength: users.length,
			...(channelAdminData
				? {
						channelAdmin: {
							uuid: channelAdminData.uuid,
							name: `${channelAdminData.name} ${channelAdminData.secondName}`,
						},
					}
				: {}),
		};
	});

	return {
		channels,
		isLoading,
	};
};

export const useMessagesData = (messagesData?: Array<IMessage>) => {
	return useMemo(() => {
		if (!messagesData) return { messages: [], pinnedMessages: [] };

		const messages = messagesData.reduce<Array<IMappedMessage>>((acc, message) => {
			const { createdAt, replyToUuid, ...rest } = message;

			const replyMessage = replyToUuid ? messagesData.find((message) => message.uuid === replyToUuid) : null;

			acc.push({
				...rest,
				...(replyMessage ? { replyMessage } : {}),
				createdAtDate: format(createdAt, DATE_FORMAT),
				createdAtTime: format(createdAt, TIME_FORMAT),
				author: {
					uuid: message.author.uuid,
					name: `${message.author.name} ${message.author.secondName}`,
					...(message.author.avatarUrl
						? { avatarUrl: message.author.avatarUrl }
						: {
								avatar: {
									initials: `${message.author.name[0]} ${message.author.secondName[0]}`,
									color: getAvatarColor(message.author.uuid),
								},
							}),
				},
			});

			return acc;
		}, []);

		const pinnedMessages = messagesData.filter((message) => message.isPinned);

		return {
			messages,
			pinnedMessages,
		};
	}, [messagesData]);
};

export const useMessagesByChannelUuid = (channelUuid?: string) => {
	const { isLoading, data } = useGetMessagesQuery(channelUuid!, { skip: !channelUuid });

	const { messages, pinnedMessages } = useMessagesData(data?.messages);

	return { isLoading, messages, pinnedMessages };
};

export const useHeaderData = (activeChannel: IChannel | null) => {
	return useMemo(() => {
		if (!activeChannel) {
			return {
				headerData: {
					membersCount: 0,
					channelTitle: '',
				},
				activeChannelUsers: [],
			};
		}

		const channelVisibility =
			activeChannel.channelType === 'channel' ? CHANNEL_HEADER_VISIBILITY[activeChannel.channelVisibility] : null;

		const headerData = {
			membersCount: activeChannel.users.length,
			channelTitle: activeChannel.title,
			...(channelVisibility ? { channelVisibility } : {}),
		};

		const activeChannelUsers = getChannelWithNormalizeUsers(activeChannel.users);

		return { headerData, activeChannelUsers };
	}, [activeChannel]);
};

export const useUserChannelsData = (channels?: Array<IChannel>) => {
	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());

	return useMemo(() => {
		if (!channels)
			return {
				channelGroups: { channel: [], pm: [] },
				channelsUuids: [],
				activeChannel: null,
			};

		const channelGroups = channels.reduce((acc, channel) => {
			const channelType = channel.channelType;

			let channelAvatar = null;

			if (channelType === 'pm') {
				const user = channel.users.find((user) => user.role.key === 'chat_member');
				channelAvatar = {
					color: getAvatarColor(user?.uuid),
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

		const channelsUuids = channels.map((channel) => channel.uuid);

		const activeChannel = channels.find((channel) => channel.uuid === activeChannelUuid) || null;

		return {
			channelGroups,
			channelsUuids,
			activeChannel,
		};
	}, [activeChannelUuid, channels]);
};

export const useUserChannels = () => {
	const sidebarSearchValue = useAppSelector(getSidebarSearchValueSelector());

	const debouncedValue = useDebounce(sidebarSearchValue, 1000);

	const filters = {
		...(debouncedValue ? { searchValue: debouncedValue } : {}),
	};

	const { data, isLoading } = useGetUserChannelsQuery(filters);

	const { activeChannel, channelsUuids, channelGroups } = useUserChannelsData(data?.channels);

	const { headerData, activeChannelUsers } = useHeaderData(activeChannel);

	return {
		channelGroups,
		channelsUuids,
		activeChannel,
		headerData,
		activeChannelUsers,
		isLoading,
	};
};
