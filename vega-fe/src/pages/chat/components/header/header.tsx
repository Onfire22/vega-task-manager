import { HeaderView } from '@/pages/chat/components/header/header.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getActiveChannelSelector, getIsUsersControlsOpenSelector } from '@/pages/chat/selectors.ts';
import { setIsUsersControlsOpen } from '@/pages/chat/slice.ts';
import { useEffect, useMemo } from 'react';

const Header = () => {
	const dispatch = useAppDispatch();

	const isUsersControlsOpen = useAppSelector(getIsUsersControlsOpenSelector());
	const activeChannel = useAppSelector(getActiveChannelSelector());

	useEffect(() => {
		if (activeChannel?.channelType === 'PM') {
			dispatch(setIsUsersControlsOpen(false));
		}
	}, [activeChannel?.channelType, dispatch]);

	const handleUserControlsToggle = () => {
		dispatch(setIsUsersControlsOpen(!isUsersControlsOpen));
	};

	const isButtonDisabled = useMemo(() => !activeChannel || activeChannel.channelType === 'PM', [activeChannel]);

	return (
		<HeaderView
			onUserControlsToggle={handleUserControlsToggle}
			isUsersControlsOpen={isUsersControlsOpen}
			isButtonDisabled={isButtonDisabled}
		/>
	);
};

export { Header };
