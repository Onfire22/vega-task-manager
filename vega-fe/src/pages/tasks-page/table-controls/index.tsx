import { TableControlsView } from './table-controls-view';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { setActiveTab, setIsAssignee } from '../slice.ts';
import { getActiveTabSelector, getIsAssigneeSelector } from '../selectors.ts';
import { useDictionariesOptions } from '../../../api/hooks.ts';
import { BASE_DICTIONARIES_META } from '../constants.ts';

const TableControls = () => {
	const isAssignee = useAppSelector(getIsAssigneeSelector());
	const activeTab = useAppSelector(getActiveTabSelector());
	const { dictionariesOptions, isDictionariesLoading } = useDictionariesOptions(BASE_DICTIONARIES_META);

	const dispatch = useAppDispatch();

	const handleTabClick = (tab: string | null) => {
		dispatch(setActiveTab(tab));
	};

	const handleSwitchClick = () => {
		dispatch(setIsAssignee(!isAssignee));
	};

	return (
		<TableControlsView
			activeTab={activeTab}
			isAssignee={isAssignee}
			dictionariesOptions={dictionariesOptions}
			isDictionariesLoading={isDictionariesLoading}
			onTabClick={handleTabClick}
			onSwitchClick={handleSwitchClick}
		/>
	);
};

export { TableControls };
