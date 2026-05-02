import { type KeyboardEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '@/app/constants.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { BaseCustomMenuView } from './base-custom-menu.view.tsx';
import { setActiveModal } from '@/modules/modals/slice.ts';
import { getIsSidebarOpenedSelector, getSearchValueSelector } from '../../selectors.ts';
import { setIsSidebarOpened, setSearchValue } from '../../slice.ts';

const BaseCustomMenu = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const isSidebarOpened = useAppSelector(getIsSidebarOpenedSelector());

	const searchValue = useAppSelector(getSearchValueSelector());

	const handleSearchChange = (value: string) => {
		dispatch(setSearchValue(value));
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

	const handleSearchClick = () => {
		navigate(`/search?search=${searchValue}`);
	};

	const handleEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (!searchValue) return;

		if (e.key === 'Enter') {
			handleSearchClick();
		}
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
			onSearchClick={handleSearchClick}
			onEnterPress={handleEnterPress}
		/>
	);
};

export { BaseCustomMenu };
