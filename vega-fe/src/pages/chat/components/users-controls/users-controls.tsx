import { UsersControlsView } from '@/pages/chat/components/users-controls/users-controls.view.tsx';
import { getIsUsersControlsOpenSelector } from '@/pages/chat/selectors.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { useUserChannels } from '@/pages/chat/hooks.ts';

const UsersControls = () => {
	const { activeChannelUsers } = useUserChannels();

	const isUsersControlsOpen = useAppSelector(getIsUsersControlsOpenSelector());

	return <UsersControlsView isUsersControlsOpen={isUsersControlsOpen} activeChannelUsers={activeChannelUsers} />;
};

export { UsersControls };
