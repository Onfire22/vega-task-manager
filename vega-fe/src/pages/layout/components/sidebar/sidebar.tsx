import { SidebarView } from './sidebar.view.tsx';
import { useLocation } from 'react-router-dom';
import { useLogOutUserMutation } from '../../../../api/auth/auth.api.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { getIsSidebarOpenedSelector } from '../../selectors.ts';
import { setToken } from '@/store/authSlice.ts';
import { baseApi } from '@/api';

const Sidebar = () => {
	const location = useLocation();
	const dispatch = useAppDispatch();

	const isSidebarOpened = useAppSelector(getIsSidebarOpenedSelector());

	const [logOutUser] = useLogOutUserMutation();

	const handleLogOutClick = async () => {
		await logOutUser();
		dispatch(setToken(null));
		dispatch(baseApi.util.resetApiState());
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
