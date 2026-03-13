import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FRONT_ROUTES } from '../../../../app/constants.ts';
import { setIsSidebarOpened } from '../../slice.ts';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { BaseCustomMenuView } from './base-custom-menu-view';
import { getIsSidebarOpenedSelector } from '../../selectors.ts';
import { setActiveModal } from '../../../../modules/modals/slice.ts';
import { BREADCRUMBS } from '../../contsants.ts';

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

	const breadCrumbs = useMemo(() => {
		if (location.pathname === '/') return 'Задачи';

		const key = Object.keys(BREADCRUMBS).find((item) => location.pathname.includes(item));

		if (key) {
			return BREADCRUMBS[key as keyof typeof BREADCRUMBS];
		}

		return '';
	}, [location.pathname]);

	return (
		<BaseCustomMenuView
			searchValue={searchValue}
			isSidebarOpened={isSidebarOpened}
			path={location.pathname}
			breadCrumbs={breadCrumbs}
			onSearchChange={handleSearchChange}
			onProfileCLick={handleProfileCLick}
			onModalOpen={handleModalOpen}
			onBurgerClick={handleBurgerClick}
			onGoBack={handleGoBack}
		/>
	);
};

export { BaseCustomMenu };
