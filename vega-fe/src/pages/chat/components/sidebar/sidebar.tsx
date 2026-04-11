import { SidebarView } from '@/pages/chat/components/sidebar/sidebar.view.tsx';
import type { TNewChatModal } from '@/pages/chat/types.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setActiveChannelUuid, setNewChatModal } from '@/pages/chat/slice.ts';
import { useGetChannelsQuery } from '@/api/channels/channels.api.ts';
import { getActiveChannelUuidSelector, getChannelsGroupsSelector } from '@/pages/chat/selectors.ts';
import { useEffect } from 'react';

const Sidebar = () => {
	useGetChannelsQuery();
	const dispatch = useAppDispatch();

	const channels = useAppSelector(getChannelsGroupsSelector());
	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());

	useEffect(() => {
		const activeChannelUuidCached = localStorage.getItem('activeChannelUuid');
		if (activeChannelUuidCached) {
			dispatch(setActiveChannelUuid(activeChannelUuidCached));
		}
	}, []);

	const handleOpenModal = (modalType: TNewChatModal) => {
		dispatch(setNewChatModal(modalType));
	};

	const handleSetActiveChannel = (id: string) => {
		dispatch(setActiveChannelUuid(id));
		localStorage.setItem('activeChannelUuid', id);
	};

	return (
		<SidebarView
			onOpenModal={handleOpenModal}
			onSetActiveChannel={handleSetActiveChannel}
			channels={channels}
			activeChannelUuid={activeChannelUuid}
		/>
	);
};

export { Sidebar };
