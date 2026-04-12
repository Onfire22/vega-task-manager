import { UsersControlsView } from '@/pages/chat/components/users-controls/users-controls.view.tsx';
import { getActiveChannelUsers, getIsUsersControlsOpenSelector } from '@/pages/chat/selectors.ts';
import { useAppSelector } from '@/store/hooks.ts';

const UsersControls = () => {
	const isUsersControlsOpen = useAppSelector(getIsUsersControlsOpenSelector());
	const activeChannelUsers = useAppSelector(getActiveChannelUsers());

	return <UsersControlsView isUsersControlsOpen={isUsersControlsOpen} activeChannelUsers={activeChannelUsers} />;
};

export { UsersControls };
