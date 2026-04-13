import { NewChatModalView } from '@/pages/chat/components/new-chat-modal/new-chat-modal.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getNewChatModalSelector } from '@/pages/chat/selectors.ts';
import { setNewChatModal } from '@/pages/chat/slice.ts';
import { socket } from '@/api/websocket.ts';
import { useForm } from 'react-hook-form';
import { FORM_DEFAULT_VALUES } from '@/pages/chat/constants.ts';
import type { IUserOption, TCreateChannel } from '@/pages/chat/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateChannelValidationSchema } from '@/pages/chat/validation.ts';
import React, { useState } from 'react';
import { useDebounce } from '@/app/utils.ts';
import { useUsersWithFilters } from '@/pages/chat/hooks.ts';
import { usersApi } from '@/api/users/users.api.ts';

const NewChatModal = () => {
	const dispatch = useAppDispatch();

	const [value, setValue] = useState('');

	const debauncedValue = useDebounce(value, 1000);

	const modalType = useAppSelector(getNewChatModalSelector());

	const usersOptions = useUsersWithFilters(debauncedValue);

	const form = useForm<TCreateChannel>({
		defaultValues: FORM_DEFAULT_VALUES,
		resolver: zodResolver(CreateChannelValidationSchema),
	});

	const handleSubmitForm = form.handleSubmit((values) => {
		socket.emit('channel:create', {
			...values,
			channelType: modalType?.toUpperCase(),
		});
		dispatch(setNewChatModal(null));
		form.reset();
	});

	const handleCloseModal = () => {
		dispatch(setNewChatModal(null));
		setValue('');
		form.reset();
		dispatch(usersApi.util.invalidateTags(['Users']));
	};

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

	return (
		<NewChatModalView
			modalType={modalType}
			form={form}
			value={value}
			usersOptions={usersOptions.usersListOptions}
			onCloseModal={handleCloseModal}
			onSubmitForm={handleSubmitForm}
			onSearchChange={handleSearchChange}
			onPmChatStart={handlePmChatStart}
		/>
	);
};

export { NewChatModal };
