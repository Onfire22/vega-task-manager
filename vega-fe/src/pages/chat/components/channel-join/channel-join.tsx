import { ChannelJoinView } from '@/pages/chat/components/channel-join/channel-join.view.tsx';
import { useChannelsList } from '@/pages/chat/hooks.ts';

const ChannelJoin = () => {
	const { channels } = useChannelsList();

	return <ChannelJoinView channels={channels} />;
};

export { ChannelJoin };
