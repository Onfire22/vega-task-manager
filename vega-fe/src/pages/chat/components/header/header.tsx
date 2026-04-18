import { HeaderView } from '@/pages/chat/components/header/header.view.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { getIsUsersControlsOpenSelector } from '@/pages/chat/selectors.ts';
import { setIsUsersControlsOpen } from '@/pages/chat/slice.ts';
import { useEffect, useMemo } from 'react';
import { useUserChannels } from '@/pages/chat/hooks.ts';

const Header = () => {
	const dispatch = useAppDispatch();

	const { activeChannel, headerData } = useUserChannels();

	const isUsersControlsOpen = useAppSelector(getIsUsersControlsOpenSelector());

	useEffect(() => {
		if (activeChannel?.channelType === 'pm') {
			dispatch(setIsUsersControlsOpen(false));
		}
	}, [activeChannel?.channelType, dispatch]);

	const handleUserControlsToggle = () => {
		dispatch(setIsUsersControlsOpen(!isUsersControlsOpen));
	};

	const isUsersButtonDisabled = useMemo(() => !activeChannel || activeChannel.channelType === 'pm', [activeChannel]);

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
