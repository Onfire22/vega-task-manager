import { NewChatModalView } from '@/pages/chat/components/new-chat-modal/new-chat-modal.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getNewChatModalSelector } from '@/pages/chat/selectors.ts';
import { setNewChatModal } from '@/pages/chat/slice.ts';
import { useForm } from 'react-hook-form';
import { FORM_DEFAULT_VALUES } from '@/pages/chat/constants.ts';
import type { TCreateChannel } from '@/pages/chat/types.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateChannelValidationSchema } from '@/pages/chat/validation.ts';
import { usersApi } from '@/api/users/users.api.ts';
import { NewChannelContent } from '@/pages/chat/components/new-channel-content/new-channel-content.tsx';
import { NewPmContent } from '@/pages/chat/components/new-pm-content/new-pm-content.tsx';
import { ChannelJoin } from '@/pages/chat/components/channel-join/channel-join.tsx';

const channelContent = {
	channel: NewChannelContent,
	pm: NewPmContent,
	channel_join: ChannelJoin,
};

const NewChatModal = () => {
	const dispatch = useAppDispatch();

	const modalType = useAppSelector(getNewChatModalSelector());

	const form = useForm<TCreateChannel>({
		defaultValues: FORM_DEFAULT_VALUES,
		resolver: zodResolver(CreateChannelValidationSchema),
	});

	const handleCloseModal = () => {
		dispatch(setNewChatModal(null));
		form.reset();
		dispatch(usersApi.util.invalidateTags(['Users']));
	};

	const modalContent = modalType ? channelContent[modalType] : null;

	return <NewChatModalView modalType={modalType} modalContent={modalContent} onCloseModal={handleCloseModal} />;
};

export { NewChatModal };
