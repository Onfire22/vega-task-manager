import { useEffect, useMemo } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelUuidSelector } from '@/pages/chat/selectors.ts';
import { toast } from 'sonner';
import { useUsersOptions } from '@/api/users/users.hooks.ts';
import { useGetChannelsQuery, useGetUserChannelsQuery } from '@/api/channels/channels.api.ts';
import type { IChannel, IMappedMessage, TChannelsGroups } from '@/pages/chat/types.ts';
import { useGetMessagesQuery } from '@/api/messages/messages.api.ts';
import { format } from 'date-fns';
import { CHANNEL_HEADER_VISIBILITY, DATE_FORMAT, TIME_FORMAT } from '@/pages/chat/constants.ts';
import { getAvatarColor } from '@/app/utils.ts';
import { getChannelWithNormalizeUsers } from '@/pages/chat/utils.ts';

export const useChatSocket = () => {
	const dispatch = useAppDispatch();

	// const setChannelsState = useCallback(
	// 	(channel: IChannel) => {
	// 		dispatch(setChannels([channel, ...currentChannels]));
	// 		dispatch(setActiveChannelUuid(channel.id));
	// 	},
	// 	[currentChannels, dispatch],
	// );
	//
	// const setMessagesState = useCallback(
	// 	(message: IMessage) => {
	// 		dispatch(setMessages([...messages, message]));
	// 	},
	// 	[dispatch, messages],
	// );

	useEffect(() => {
		socket.on('channel:created', (data) => {
			if (data.success) {
				// setChannelsState(data.channel);
				toast.success('Канал успешно создан');
			}
		});

		socket.on('channel:edited', (data) => {
			console.log(data);
		});

		socket.on('channel:user_joined', (data) => {
			if (data.success) {
				// setMessagesState(data.message);
			}
		});

		socket.on('channel:deleted', (data) => {
			console.log(data);
		});

		socket.on('channel:error', (data) => {
			toast.error(data.message);
		});

		socket.on('message:created', (data) => {
			if (data.success) {
				// setMessagesState(data.message);
			}
		});

		return () => {
			socket.off('channel:created');
			socket.off('channel:edited');
			socket.off('channel:deleted');
			socket.off('channel:user_joined');
			socket.off('message:created');
			socket.off('channel:error');
			socket.off('message:error');
		};
	}, [dispatch]);
};

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
							id: channelAdminData.id,
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

export const useMessagesByChannelUuid = (channelUuid?: string) => {
	const { isLoading, data } = useGetMessagesQuery(channelUuid!, { skip: !channelUuid });
	if (!data) return { messages: [], isLoading };

	const messages = data.messages.reduce<Array<IMappedMessage>>((acc, message) => {
		const { createdAt, ...rest } = message;

		acc.push({
			...rest,
			createdAtDate: format(createdAt, DATE_FORMAT),
			createdAtTime: format(createdAt, TIME_FORMAT),
			author: {
				id: message.author.id,
				name: `${message.author.name} ${message.author.secondName}`,
				avatar: {
					initials: `${message.author.name[0]} ${message.author.secondName[0]}`,
					color: getAvatarColor(message.author.id),
				},
			},
		});

		return acc;
	}, []);

	return { isLoading, messages };
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

		const channelsUuids = channels.map((channel) => channel.id);

		const activeChannel = channels.find((channel) => channel.id === activeChannelUuid) || null;

		return {
			channelGroups,
			channelsUuids,
			activeChannel,
		};
	}, [activeChannelUuid, channels]);
};

export const useUserChannels = () => {
	const { data, isLoading } = useGetUserChannelsQuery();

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
