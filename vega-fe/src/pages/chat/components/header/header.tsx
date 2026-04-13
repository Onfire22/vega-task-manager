import { HeaderView } from '@/pages/chat/components/header/header.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
	getActiveChannelSelector,
	getChannelHeaderDataSelector,
	getIsUsersButtonDisabledSelector,
	getIsUsersControlsOpenSelector,
} from '@/pages/chat/selectors.ts';
import { setIsUsersControlsOpen } from '@/pages/chat/slice.ts';
import { useEffect } from 'react';

const Header = () => {
	const dispatch = useAppDispatch();

	const isUsersControlsOpen = useAppSelector(getIsUsersControlsOpenSelector());
	const activeChannel = useAppSelector(getActiveChannelSelector());
	const headerData = useAppSelector(getChannelHeaderDataSelector());
	const isUsersButtonDisabled = useAppSelector(getIsUsersButtonDisabledSelector());

	useEffect(() => {
		if (activeChannel?.channelType === 'pm') {
			dispatch(setIsUsersControlsOpen(false));
		}
	}, [activeChannel?.channelType, dispatch]);

	const handleUserControlsToggle = () => {
		dispatch(setIsUsersControlsOpen(!isUsersControlsOpen));
	};

	return (
		<HeaderView
			onUserControlsToggle={handleUserControlsToggle}
			isUsersControlsOpen={isUsersControlsOpen}
			isButtonDisabled={isUsersButtonDisabled}
			headerData={headerData}
		/>
	);
};

export { Header };
