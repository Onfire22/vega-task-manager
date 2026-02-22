import { CustomMenuView } from './custom-menu-view';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../constants.ts';
import { useLogOutUserMutation } from '../../../api/queries/auth.api.ts';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setIsModalShown } from '../slice.ts';

const CustomMenu = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const [logOutUser] = useLogOutUserMutation();

	const [searchValue, setSearchValue] = useState('');

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
	};

	const handleProfileCLick = () => {
		navigate(FRONT_ROUTES.profile);
	};

	const handleLogOutClick = async () => {
		await logOutUser();
	};

	const handleModalOpen = () => {
		dispatch(setIsModalShown(true));
	};

	return (
		<CustomMenuView
			searchValue={searchValue}
			onSearchChange={handleSearchChange}
			onProfileCLick={handleProfileCLick}
			onLogOutClick={handleLogOutClick}
			onModalOpen={handleModalOpen}
		/>
	);
};

export { CustomMenu };
