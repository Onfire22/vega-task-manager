import { ChatInputView } from '@/pages/chat/components/chat-input/chat-input.view.tsx';
import React, { type KeyboardEvent, useState } from 'react';
import { socket } from '@/api/websocket.ts';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelUuidSelector, getReplyMessageSelector } from '@/pages/chat/selectors.ts';
import { setReplyMessage } from '@/pages/chat/slice.ts';
import type { ICreateMessage } from '@/pages/chat/types.ts';

const ChatInput = () => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState('');

	const { data } = useGetCurrentUserQuery();

	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());
	const replyMessage = useAppSelector(getReplyMessageSelector());

	const handleCreateMessage = () => {
		if (!activeChannelUuid || !data || !value) return;

		const message: ICreateMessage = {
			text: value.trim(),
			channelUuid: activeChannelUuid,
			authorUuid: data.currentUser.id,
		};

		if (replyMessage) {
			message.replyToUuid = replyMessage.id;
		}

		socket.emit('message:create', message);
		setValue('');
		dispatch(setReplyMessage(null));
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
