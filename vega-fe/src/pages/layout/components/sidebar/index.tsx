import { SidebarView } from './sidebar-view';
import { useLocation } from 'react-router-dom';
import { useLogOutUserMutation } from '../../../../api/queries/auth.api.ts';
import { useAppSelector } from '../../../../store/hooks.ts';
import { getIsSidebarOpenedSelector } from '../../selectors.ts';

const Sidebar = () => {
	const location = useLocation();

	const isSidebarOpened = useAppSelector(getIsSidebarOpenedSelector());

	const [logOutUser] = useLogOutUserMutation();

	const handleLogOutClick = async () => {
		await logOutUser();
	};

	return (
		<SidebarView
			pathname={location.pathname.split('/')[1]}
			isSidebarOpened={isSidebarOpened}
			onLogOutClick={handleLogOutClick}
		/>
	);
};

export { Sidebar };
