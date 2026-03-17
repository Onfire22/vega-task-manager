import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../../app/constants.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { BaseCustomMenuView } from './base-custom-menu-view';
import { setActiveModal } from '../../../../modules/modals/slice.ts';
import { getIsSidebarOpenedSelector } from '../../selectors.ts';
import { setIsSidebarOpened } from '../../slice.ts';

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

	const handleGoBack = () => {
		if (location.pathname === '/') return;
		navigate(-1);
	};

	const handleMenuButtonClick = () => {
		dispatch(setIsSidebarOpened(!isSidebarOpened));
	};

	return (
		<BaseCustomMenuView
			path={location.pathname}
			searchValue={searchValue}
			isSidebarOpened={isSidebarOpened}
			onSearchChange={handleSearchChange}
			onProfileCLick={handleProfileCLick}
			onModalOpen={handleModalOpen}
			onGoBack={handleGoBack}
			onMenuButtonClick={handleMenuButtonClick}
		/>
	);
};

export { BaseCustomMenu };
