import { NewChannelContentView } from '@/pages/chat/components/new-channel-content/new-channel-content.view.tsx';
import { useForm } from 'react-hook-form';
import type { TCreateChannel } from '@/pages/chat/types.ts';
import { FORM_DEFAULT_VALUES } from '@/pages/chat/constants.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateChannelValidationSchema } from '@/pages/chat/validation.ts';
import { socket } from '@/api/websocket.ts';
import { setNewChatModal } from '@/pages/chat/slice.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getNewChatModalSelector } from '@/pages/chat/selectors.ts';
import { useUsersWithFilters } from '@/pages/chat/hooks.ts';
import { usersApi } from '@/api/users/users.api.ts';

const NewChannelContent = () => {
	const dispatch = useAppDispatch();

	const modalType = useAppSelector(getNewChatModalSelector());

	const { usersListOptions } = useUsersWithFilters();

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
		form.reset();
		dispatch(usersApi.util.invalidateTags(['Users']));
	};

	return (
		<NewChannelContentView
			form={form}
			onSubmitForm={handleSubmitForm}
			usersOptions={usersListOptions}
			onCloseModal={handleCloseModal}
		/>
	);
};

export { NewChannelContent };
