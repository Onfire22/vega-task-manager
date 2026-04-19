import { ChatInputView } from '@/pages/chat/components/chat-input/chat-input.view.tsx';
import React, { type KeyboardEvent, useState } from 'react';
import { socket } from '@/api/websocket.ts';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelUuidSelector } from '@/pages/chat/selectors.ts';

const ChatInput = () => {
	const [value, setValue] = useState('');

	const { data } = useGetCurrentUserQuery();

	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());

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

	return (
		<ChatInputView
			value={value}
			onValueChange={handleValueChange}
			onCreateMessage={handleCreateMessage}
			onKeyDown={handleKeyDown}
		/>
	);
};

export { ChatInput };
