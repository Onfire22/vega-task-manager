import { useCallback, useEffect } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getChannelsSelector, getMessagesSelector } from '@/pages/chat/selectors.ts';
import { setActiveChannelUuid, setChannels, setMessages } from '@/pages/chat/slice.ts';
import { toast } from 'sonner';
import { useUsersOptions } from '@/api/users/users.hooks.ts';
import { useGetChannelsQuery } from '@/api/channels/channels.api.ts';
import type { IChannel, IMessage } from '@/pages/chat/types.ts';

export const useChatSocket = () => {
	const dispatch = useAppDispatch();
	const currentChannels = useAppSelector(getChannelsSelector());
	const messages = useAppSelector(getMessagesSelector());

	const setChannelsState = useCallback(
		(channel: IChannel) => {
			dispatch(setChannels([channel, ...currentChannels]));
			dispatch(setActiveChannelUuid(channel.id));
		},
		[currentChannels, dispatch],
	);

	const setMessagesState = useCallback(
		(message: IMessage) => {
			dispatch(setMessages([...messages, message]));
		},
		[dispatch, messages],
	);

	useEffect(() => {
		socket.on('channel:created', (data) => {
			if (data.success) {
				setChannelsState(data.channel);
				toast.success('Канал успешно создан');
			}
		});

		socket.on('channel:edited', (data) => {
			console.log(data);
		});

		socket.on('channel:user_joined', (data) => {
			console.log(data);
		});

		socket.on('channel:deleted', (data) => {
			console.log(data);
		});

		socket.on('channel:error', (data) => {
			toast.error(data.message);
		});

		socket.on('message:created', (data) => {
			if (data.success) {
				setMessagesState(data.message);
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
	}, [currentChannels, dispatch, messages, setMessagesState, setChannelsState]);
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
