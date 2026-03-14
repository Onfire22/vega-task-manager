import { SidebarView } from './sidebar-view';
import { useAppDispatch } from '../../../../store/hooks.ts';
import { setIsSidebarOpened } from '../../slice.ts';
import { useLocation } from 'react-router-dom';
import { useLogOutUserMutation } from '../../../../api/queries/auth.api.ts';

const Sidebar = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const [logOutUser] = useLogOutUserMutation();

	const handleLogOutClick = async () => {
		await logOutUser();
		dispatch(setIsSidebarOpened(false));
	};

	return <SidebarView pathname={location.pathname} onLogOutClick={handleLogOutClick} />;
};

export { Sidebar };
