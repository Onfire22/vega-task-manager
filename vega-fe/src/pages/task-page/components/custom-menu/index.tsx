import { CustomMenuView } from './custom-menu-view';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery, useLogOutUserMutation } from '../../../../api/queries/auth.api.ts';
import { FRONT_ROUTES } from '../../../../constants.ts';

const CustomMenu = () => {
	const navigate = useNavigate();

	const [logOutUser] = useLogOutUserMutation();

	const { data } = useGetCurrentUserQuery();

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
			userData={{ name: data?.name, secondName: data?.secondName }}
			onSearchChange={handleSearchChange}
			onProfileCLick={handleProfileCLick}
			onLogOutClick={handleLogOutClick}
		/>
	);
};

export { CustomMenu };
