import { ChannelJoinView } from '@/pages/chat/components/channel-join/channel-join.view.tsx';
import { useChannelsList } from '@/pages/chat/hooks.ts';
import { socket } from '@/api/websocket.ts';
import { useAppDispatch } from '@/store/hooks.ts';
import { setNewChatModal } from '@/pages/chat/slice.ts';
import { channelsApi } from '@/api/channels/channels.api.ts';

const ChannelJoin = () => {
	const dispatch = useAppDispatch();

	const { channels } = useChannelsList();

	const handleJoinChannel = (channelUuid: string) => {
		socket.emit('channel:user_join', { channelUuid });
		dispatch(setNewChatModal(null));
		dispatch(channelsApi.util.invalidateTags(['Channels']));
	};

	return <ChannelJoinView onJoinChannel={handleJoinChannel} channels={channels} />;
};

export { ChannelJoin };
