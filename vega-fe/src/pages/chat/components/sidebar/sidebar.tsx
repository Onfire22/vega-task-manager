import { SidebarView } from '@/pages/chat/components/sidebar/sidebar.view.tsx';
import type { IMappedChannel, TNewChatModal } from '@/pages/chat/types.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setActiveChannelUuid, setNewChatModal } from '@/pages/chat/slice.ts';
import { useGetChannelsQuery } from '@/api/channels/channels.api.ts';
import { getActiveChannelSelector, getChannelsGroupsSelector } from '@/pages/chat/selectors.ts';

const Sidebar = () => {
	useGetChannelsQuery();
	const dispatch = useAppDispatch();

	const channelGroups = useAppSelector(getChannelsGroupsSelector());
	const activeChannel = useAppSelector(getActiveChannelSelector());

	const handleOpenModal = (modalType: TNewChatModal) => {
		dispatch(setNewChatModal(modalType));
	};

	const handleSetActiveChannel = (channel: IMappedChannel) => {
		dispatch(setActiveChannelUuid(channel));
		localStorage.setItem('activeChannelUuid', channel.id);
	};

	console.log(channelGroups);

	return (
		<SidebarView
			onOpenModal={handleOpenModal}
			onSetActiveChannel={handleSetActiveChannel}
			channels={channelGroups}
			activeChannelUuid={activeChannel?.id}
		/>
	);
};

export { Sidebar };
