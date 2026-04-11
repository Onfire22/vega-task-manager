import { HeaderView } from '@/pages/chat/components/header/header.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getIsUsersControlsOpenSelector } from '@/pages/chat/selectors.ts';
import { setIsUsersControlsOpen } from '@/pages/chat/slice.ts';

const Header = () => {
	const dispatch = useAppDispatch();

	const isUsersControlsOpen = useAppSelector(getIsUsersControlsOpenSelector());

	const handleUserControlsToggle = () => {
		dispatch(setIsUsersControlsOpen(!isUsersControlsOpen));
	};

	return <HeaderView onUserControlsToggle={handleUserControlsToggle} isUsersControlsOpen={isUsersControlsOpen} />;
};

export { Header };
