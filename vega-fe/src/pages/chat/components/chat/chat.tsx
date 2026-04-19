import { ChatView } from '@/pages/chat/components/chat/chat.view.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelUuidSelector } from '@/pages/chat/selectors.ts';
import { useMessagesByChannelUuid } from '@/pages/chat/hooks.ts';
import type { IMappedMessage } from '@/pages/chat/types.ts';
import { socket } from '@/api/websocket.ts';
import { useRef } from 'react';

const Chat = () => {
	const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());

	const { isLoading, messages, pinnedMessages } = useMessagesByChannelUuid(activeChannelUuid!);

	const handlePinMessage = (message: IMappedMessage) => {
		socket.emit('message:edit', {
			authorUuid: message.author.id,
			channelUuid: message.channelUuid,
			messageUuid: message.id,
			value: !message.isPinned,
			canEdit: message.canEdit,
			field: 'isPinned',
		});
	};

	const handleEditMessage = (action: string, message: IMappedMessage) => {
		if (action === 'pin') {
			handlePinMessage(message);
		}
	};

	const handlePinnedMessageClick = (id: string) => {
		if (!itemRefs?.current[id]) return;

		itemRefs.current[id].scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});
	};

	console.log(pinnedMessages);

	return (
		<ChatView
			messages={messages}
			isLoading={isLoading}
			activeChannelUuid={activeChannelUuid}
			pinnedMessages={pinnedMessages}
			itemRefs={itemRefs}
			onEditMessage={handleEditMessage}
			onPinnedMessageClick={handlePinnedMessageClick}
		/>
	);
};

export { Chat };
