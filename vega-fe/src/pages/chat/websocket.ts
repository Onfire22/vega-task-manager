import { useAppDispatch } from '@/store/hooks.ts';
import { useCallback, useEffect } from 'react';
import { socket } from '@/api/websocket.ts';
import { toast } from 'sonner';
import { messagesApi } from '@/api/messages/messages.api.ts';
import { channelsApi } from '@/api/channels/channels.api.ts';
import type { IChannel, IMessage } from '@/pages/chat/types.ts';

export const useChatSocket = () => {
	const dispatch = useAppDispatch();

	const updateMessages = useCallback(
		(messageData: IMessage) => {
			dispatch(
				messagesApi.util.updateQueryData('getMessages', messageData.channelUuid, (draft) => {
					const index = draft.messages.findIndex((m) => m.id === messageData.id);

					if (index !== -1) {
						draft.messages[index] = messageData;
					} else {
						draft.messages.push(messageData);
					}
				}),
			);
		},
		[dispatch],
	);

	const updateChannels = useCallback(
		(channelData: IChannel) => {
			dispatch(
				channelsApi.util.updateQueryData('getUserChannels', undefined, (draft) => {
					const index = draft.channels.findIndex((channel) => channel.id === channelData.id);

					if (index !== -1) {
						draft.channels[index] = channelData;
					} else {
						draft.channels.push(channelData);
					}
				}),
			);
		},
		[dispatch],
	);

	useEffect(() => {
		socket.on('channel:created', (data) => {
			if (data.success) {
				updateChannels(data.channel);
				toast.success('Канал успешно создан');
			}
		});

		socket.on('channel:edited', (data) => {
			console.log(data);
		});

		socket.on('channel:user_joined', (data) => {
			if (data.success) {
				updateMessages(data.message);
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
				updateMessages(data.message);
			}
		});

		socket.on('message:edited', (data) => {
			if (data.success) {
				updateMessages(data.message);
			}
		});

		socket.on('channel:error', (data) => {
			toast.error(data.message);
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
	}, [dispatch, updateMessages, updateChannels]);
};
