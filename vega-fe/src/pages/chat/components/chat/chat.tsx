import { ChatView } from '@/pages/chat/components/chat/chat.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelUuidSelector, getReplyMessageSelector } from '@/pages/chat/selectors.ts';
import { useMessagesByChannelUuid } from '@/pages/chat/hooks.ts';
import type { IMappedMessage } from '@/pages/chat/types.ts';
import { socket } from '@/api/websocket.ts';
import { useEffect, useRef } from 'react';
import { setReplyMessage } from '@/pages/chat/slice.ts';
import { REPLY_MESSAGE_COLOR } from '@/pages/chat/constants.ts';

const Chat = () => {
	const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const startTimeoutId = useRef<number | null>(null);
	const endTimeoutId = useRef<number | null>(null);

	const dispatch = useAppDispatch();

	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());
	const replyMessage = useAppSelector(getReplyMessageSelector());

	const { isLoading, messages, pinnedMessages } = useMessagesByChannelUuid(activeChannelUuid!);

	useEffect(() => {
		return () => {
			if (startTimeoutId.current) {
				clearTimeout(startTimeoutId.current);
			}
			if (endTimeoutId.current) {
				clearTimeout(endTimeoutId.current);
			}
		};
	}, []);

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

	const handleReplyMessage = (message: IMappedMessage | null) => {
		dispatch(setReplyMessage(message));
	};

	const handleEditMessage = (action: string, message: IMappedMessage) => {
		if (action === 'pin') {
			handlePinMessage(message);
		}

		if (action === 'reply') {
			handleReplyMessage(message);
		}
	};

	const handlePinnedMessageClick = (id?: string) => {
		if (startTimeoutId.current) {
			clearTimeout(startTimeoutId.current);
		}
		if (endTimeoutId?.current) {
			clearTimeout(endTimeoutId.current);
		}

		if (!id) return;

		const element = itemRefs.current[id];

		if (!element) return;

		element.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
		});

		startTimeoutId.current = setTimeout(() => {
			element.style.borderRadius = '5px';
			element.style.backgroundColor = REPLY_MESSAGE_COLOR;
		}, 400);

		endTimeoutId.current = setTimeout(() => {
			element.style.backgroundColor = '';
			element.style.borderRadius = '';
		}, 1000);
	};

	console.log(messages);

	return (
		<ChatView
			messages={messages}
			isLoading={isLoading}
			activeChannelUuid={activeChannelUuid}
			pinnedMessages={pinnedMessages}
			itemRefs={itemRefs}
			replyMessage={replyMessage}
			onEditMessage={handleEditMessage}
			onPinnedMessageClick={handlePinnedMessageClick}
			onReplyMessage={handleReplyMessage}
		/>
	);
};

export { Chat };
