import { ChatView } from '@/pages/chat/components/chat/chat.view.tsx';
import React, { type KeyboardEvent, useState } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelUuidSelector } from '@/pages/chat/selectors.ts';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';
import { useMessagesByChannelUuid } from '@/pages/chat/hooks.ts';

const Chat = () => {
	const [value, setValue] = useState('');

	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());

	const { isLoading, messages } = useMessagesByChannelUuid(activeChannelUuid!);
	const { data } = useGetCurrentUserQuery();

	const handleCreateMessage = () => {
		if (!activeChannelUuid || !data || !value) return;

		socket.emit('message:create', {
			text: value.trim(),
			channelUuid: activeChannelUuid,
			authorUuid: data.currentUser.id,
			// replyToUuid?: string;
			// isPinned?: boolean;
		});
		setValue('');
	};

	const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && e.ctrlKey) {
			e.preventDefault();
			setValue((prev) => prev + '\n');
			return;
		}
		if (e.key === 'Enter') {
			e.preventDefault();
			handleCreateMessage();
		}
	};

	console.log(messages);

	return (
		<ChatView
			onValueChange={handleValueChange}
			onCreateMessage={handleCreateMessage}
			onKeyDown={handleKeyDown}
			value={value}
			messages={messages}
			isLoading={isLoading}
			activeChannelUuid={activeChannelUuid}
			currentUserUuid={data?.currentUser.id}
		/>
	);
};

export { Chat };
