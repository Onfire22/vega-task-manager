import { SidebarView } from '@/pages/chat/components/sidebar/sidebar.view.tsx';
import type { TNewChatModal } from '@/pages/chat/types.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { setActiveChannelUuid, setNewChatModal, setSidebarSearchValue } from '@/pages/chat/slice.ts';
import { getActiveChannelUuidSelector, getSidebarSearchValueSelector } from '@/pages/chat/selectors.ts';
import { type ChangeEvent, useEffect } from 'react';
import { socket } from '@/api/websocket.ts';
import { useUserChannels } from '@/pages/chat/hooks.ts';

const Sidebar = () => {
	const dispatch = useAppDispatch();

	const activeChannelUuid = useAppSelector(getActiveChannelUuidSelector());

	const sidebarSearchValue = useAppSelector(getSidebarSearchValueSelector());

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

	const handleSearchChannels = (e: ChangeEvent<HTMLInputElement>) => {
		dispatch(setSidebarSearchValue(e.target.value));
	};

	return (
		<SidebarView
			onOpenModal={handleOpenModal}
			onSetActiveChannel={handleSetActiveChannel}
			onSearchChannels={handleSearchChannels}
			channels={channelGroups}
			activeChannelUuid={activeChannelUuid}
			searchValue={sidebarSearchValue}
		/>
	);
};

export { Sidebar };
