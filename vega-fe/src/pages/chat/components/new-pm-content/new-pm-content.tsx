import { NewPmContentView } from '@/pages/chat/components/new-pm-content/new-pm-content.view.tsx';
import React, { useEffect, useState } from 'react';
import { useDebounce } from '@/app/utils.ts';
import { useUsersWithFilters } from '@/pages/chat/hooks.ts';
import type { IUserOption } from '@/pages/chat/types.ts';
import { socket } from '@/api/websocket.ts';
import { setNewChatModal } from '@/pages/chat/slice.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getNewChatModalSelector } from '@/pages/chat/selectors.ts';

const NewPmContent = () => {
	const dispatch = useAppDispatch();
	const [value, setValue] = useState('');

	const modalType = useAppSelector(getNewChatModalSelector());

	const debauncedValue = useDebounce(value, 1000);

	const { usersListOptions } = useUsersWithFilters(debauncedValue);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handlePmChatStart = (user: IUserOption) => {
		socket.emit('channel:create', {
			channelType: modalType?.toUpperCase(),
			title: user.label,
			channelVisibility: 'PRIVATE',
			usersList: [user.value],
		});
		dispatch(setNewChatModal(null));
		setValue('');
	};

	useEffect(() => {
		return () => {
			setValue('');
		};
	}, []);

	return (
		<NewPmContentView
			value={value}
			onSearchChange={handleSearchChange}
			usersOptions={usersListOptions}
			onPmChatStart={handlePmChatStart}
		/>
	);
};

export { NewPmContent };
