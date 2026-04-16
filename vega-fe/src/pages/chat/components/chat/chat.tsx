import { ChatView } from '@/pages/chat/components/chat/chat.view.tsx';
import React, { useState } from 'react';
import { socket } from '@/api/websocket.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelSelector, getMessagesByChannelSelector } from '@/pages/chat/selectors.ts';
import { useGetCurrentUserQuery } from '@/api/auth/auth.api.ts';
import { useGetMessagesQuery } from '@/api/messages/messages.api.ts';

const Chat = () => {
	const [value, setValue] = useState('');

	const handleValueChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	const activeChannel = useAppSelector(getActiveChannelSelector());
	const messages = useAppSelector(getMessagesByChannelSelector());

	const { isLoading } = useGetMessagesQuery(activeChannel?.id);
	const { data } = useGetCurrentUserQuery();

	const handleCreateMessage = () => {
		if (!activeChannel || !data || !value) return;

		socket.emit('message:create', {
			text: value,
			channelUuid: activeChannel.id,
			authorUuid: data.currentUser.id,
			// replyToUuid?: string;
			// isPinned?: boolean;
		});
		setValue('');
	};

	return (
		<ChatView
			onValueChange={handleValueChange}
			onCreateMessage={handleCreateMessage}
			value={value}
			messages={messages}
			isLoading={isLoading}
			activeChannelUuid={activeChannel?.id}
		/>
	);
};

export { Chat };
