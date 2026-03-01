import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../../constants.ts';
import { setActiveModal, setIsSidebarOpened } from '../../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { BaseCustomMenuView } from './base-custom-menu-view';
import { getIsSidebarOpenedSelector } from '../../selectors.ts';

const BaseCustomMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const dispatch = useAppDispatch();

	const [searchValue, setSearchValue] = useState('');

	const isSidebarOpened = useAppSelector(getIsSidebarOpenedSelector());

	const handleSearchChange = (value: string) => {
		setSearchValue(value);
	};

	const handleProfileCLick = () => {
		navigate(FRONT_ROUTES.profile);
	};

	const handleModalOpen = (modal: 'task' | 'project') => {
		dispatch(setActiveModal(modal));
	};

	const handleBurgerClick = () => {
		dispatch(setIsSidebarOpened(true));
	};

	const handleGoBack = () => {
		if (location.pathname === '/') return;
		navigate(-1);
	};

	return (
		<BaseCustomMenuView
			searchValue={searchValue}
			isSidebarOpened={isSidebarOpened}
			path={location.pathname}
			onSearchChange={handleSearchChange}
			onProfileCLick={handleProfileCLick}
			onModalOpen={handleModalOpen}
			onBurgerClick={handleBurgerClick}
			onGoBack={handleGoBack}
		/>
	);
};

export { BaseCustomMenu };
