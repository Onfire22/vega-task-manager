import { TableControlsView } from './table-controls.view.tsx';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks.ts';
import { setActiveTab, setFilters, setIsAssignee } from '../../slice.ts';
import { getActiveTabSelector, getIsAssigneeSelector, isAllFiltersButtonDisabled } from '../../selectors.ts';
import { useDictionariesOptions } from '../../../../api/hooks.ts';
import { BASE_DICTIONARIES_META, FILTERS_INITIAL_VALUES } from '../../constants.ts';
import { useEffect } from 'react';

const TableControls = () => {
	const isAssignee = useAppSelector(getIsAssigneeSelector());
	const activeTab = useAppSelector(getActiveTabSelector());
	const isAllFiltersButton = useAppSelector(isAllFiltersButtonDisabled());

	const { dictionariesOptions, isDictionariesLoading } = useDictionariesOptions(BASE_DICTIONARIES_META);

	const dispatch = useAppDispatch();

	useEffect(() => {
		const activeTab = localStorage.getItem('activeTab');
		if (activeTab) {
			dispatch(setActiveTab(activeTab));
		}

		const isAssignee = localStorage.getItem('isAssignee');
		if (isAssignee) {
			dispatch(setIsAssignee(JSON.parse(isAssignee)));
		}
	}, [dispatch]);

	const handleTabClick = (tab: string) => {
		dispatch(setActiveTab(tab));
		localStorage.setItem('activeTab', tab);
	};

	const handleSwitchClick = () => {
		dispatch(setIsAssignee(!isAssignee));
		localStorage.setItem('isAssignee', JSON.stringify(!isAssignee));
	};

	const handleResetAllFiltersClick = () => {
		dispatch(setFilters(FILTERS_INITIAL_VALUES));
	};

	return (
		<TableControlsView
			activeTab={activeTab}
			isAssignee={isAssignee}
			dictionariesOptions={dictionariesOptions}
			isDictionariesLoading={isDictionariesLoading}
			isAllFiltersButton={isAllFiltersButton}
			onTabClick={handleTabClick}
			onSwitchClick={handleSwitchClick}
			onResetAllFiltersClick={handleResetAllFiltersClick}
		/>
	);
};

export { TableControls };
