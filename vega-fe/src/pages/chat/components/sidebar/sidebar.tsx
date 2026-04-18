import { SidebarView } from '@/pages/chat/components/sidebar/sidebar.view.tsx';
import type { TNewChatModal } from '@/pages/chat/types.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setActiveChannelUuid, setNewChatModal } from '@/pages/chat/slice.ts';
import { getActiveChannelUuidSelector } from '@/pages/chat/selectors.ts';
import { useEffect } from 'react';
import { socket } from '@/api/websocket.ts';
import { useUserChannels } from '@/pages/chat/hooks.ts';

const Sidebar = () => {
	const dispatch = useAppDispatch();

	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());
	const { channelGroups, channelsUuids } = useUserChannels();

	useEffect(() => {
		if (channelsUuids.length > 0) {
			socket.emit('channel:join', channelsUuids);
		}
	}, [channelsUuids]);

	useEffect(() => {
		const activeChannelUuid = localStorage.getItem('activeChannelUuid');
		if (activeChannelUuid) {
			dispatch(setActiveChannelUuid(activeChannelUuid));
		}
	}, [dispatch]);

	const handleOpenModal = (modalType: TNewChatModal) => {
		dispatch(setNewChatModal(modalType));
	};

	const handleSetActiveChannel = (channelUuid: string) => {
		dispatch(setActiveChannelUuid(channelUuid));
		localStorage.setItem('activeChannelUuid', channelUuid);
	};

	return (
		<SidebarView
			onOpenModal={handleOpenModal}
			onSetActiveChannel={handleSetActiveChannel}
			channels={channelGroups}
			activeChannelUuid={activeChannelUuid}
		/>
	);
};

export { Sidebar };
