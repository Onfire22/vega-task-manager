import { UsersControlsView } from '@/pages/chat/components/users-controls/users-controls.view.tsx';
import { getIsUsersControlsOpenSelector } from '@/pages/chat/selectors.ts';
import { useAppSelector } from '@/store/hooks.ts';

const UsersControls = () => {
	const isUsersControlsOpen = useAppSelector(getIsUsersControlsOpenSelector());

	return <UsersControlsView isUsersControlsOpen={isUsersControlsOpen} />;
};

export { UsersControls };
