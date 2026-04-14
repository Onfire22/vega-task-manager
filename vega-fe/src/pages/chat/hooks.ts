import { useEffect } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getChannelsSelector, getMessagesSelector } from '@/pages/chat/selectors.ts';
import { setActiveChannelUuid, setChannels, setMessages } from '@/pages/chat/slice.ts';
import { toast } from 'sonner';
import { useUsersOptions } from '@/api/users/users.hooks.ts';

export const useChatSocket = () => {
	const dispatch = useAppDispatch();
	const currentChannels = useAppSelector(getChannelsSelector());
	const messages = useAppSelector(getMessagesSelector());

	useEffect(() => {
		socket.on('channel:created', (data) => {
			if (data.success) {
				dispatch(setChannels([data.channel, ...currentChannels]));
				dispatch(setActiveChannelUuid(data.channel.id));
				toast.success('Канал успешно создан');
			}
		});

		socket.on('channel:edited', (data) => {
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
				dispatch(setMessages([...messages, data.message]));
			}
		});

		return () => {
			socket.off('channel:created');
			socket.off('channel:edited');
			socket.off('channel:deleted');
			socket.off('message:created');
			socket.off('channel:error');
			socket.off('message:error');
		};
	}, [currentChannels, dispatch, messages]);
};

export const useUsersWithFilters = (searchValue: string) => {
	const meta = {
		filters: {
			...(searchValue ? { search: searchValue } : {}),
		},
	};

	const { usersListOptions } = useUsersOptions(meta);

	return { usersListOptions };
};
