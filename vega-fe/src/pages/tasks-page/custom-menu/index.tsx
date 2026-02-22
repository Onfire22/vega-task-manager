import { CustomMenuView } from './custom-menu-view';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../constants.ts';
import { useLogOutUserMutation } from '../../../api/auth/api.ts';

const CustomMenu = () => {
	const navigate = useNavigate();

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

	return (
		<CustomMenuView
			searchValue={searchValue}
			onSearchChange={handleSearchChange}
			onProfileCLick={handleProfileCLick}
			onLogOutClick={handleLogOutClick}
		/>
	);
};

export { CustomMenu };
