import { SidebarView } from './sidebar-view';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getIsSidebarOpenedSelector } from '../../selectors.ts';
import { setIsSidebarOpened } from '../../slice.ts';
import { useLocation } from 'react-router-dom';
import { useGetCurrentUserQuery, useLogOutUserMutation } from '../../../../api/queries/auth.api.ts';

const Sidebar = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const [logOutUser] = useLogOutUserMutation();

	const { data } = useGetCurrentUserQuery();

	const isSidebarOpened = useAppSelector(getIsSidebarOpenedSelector());

	const handleCloseSidebar = () => {
		dispatch(setIsSidebarOpened(false));
	};

	const handleLogOutClick = async () => {
		await logOutUser();
		dispatch(setIsSidebarOpened(false));
	};

	return (
		<SidebarView
			isSidebarOpened={isSidebarOpened}
			pathname={location.pathname}
			userData={{ name: data?.currentUser?.name, secondName: data?.currentUser?.secondName }}
			onCloseSidebar={handleCloseSidebar}
			onLogOutClick={handleLogOutClick}
		/>
	);
};

export { Sidebar };
