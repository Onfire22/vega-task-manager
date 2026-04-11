import { NewChatModalView } from '@/pages/chat/components/new-chat-modal/new-chat-modal.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getNewChatModalSelector } from '@/pages/chat/selectors.ts';
import { setNewChatModal } from '@/pages/chat/slice.ts';
import { socket } from '@/api/websocket.ts';
import React, { useState } from 'react';

const NewChatModal = () => {
	const dispatch = useAppDispatch();

	const [value, setValue] = useState('');

	const modalType = useAppSelector(getNewChatModalSelector());

	const handleCloseModal = () => {
		dispatch(setNewChatModal(null));
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleCreateChannel = () => {
		socket.emit('channel:create', {
			title: value,
			channelType: modalType,
			channelVisibility: 'PUBLIC',
		});
		handleCloseModal();
		setValue('');
	};

	return (
		<NewChatModalView
			modalType={modalType}
			value={value}
			onCloseModal={handleCloseModal}
			onCreateChannel={handleCreateChannel}
			onInputChange={handleInputChange}
		/>
	);
};

export { NewChatModal };
