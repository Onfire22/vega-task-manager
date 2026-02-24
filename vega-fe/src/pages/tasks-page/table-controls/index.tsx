import { TableControlsView } from './table-controls-view';
import type { TActiveTab } from '../types.ts';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { setActiveTab, setIsAssignee } from '../slice.ts';
import { getIsAssigneeSelector } from '../selectors.ts';

interface IProps {
	activeTab: TActiveTab;
}

const TableControls: React.FC<IProps> = ({ activeTab }) => {
	const isAssignee = useAppSelector(getIsAssigneeSelector());

	const dispatch = useAppDispatch();

	const handleTabClick = (tab: TActiveTab) => {
		dispatch(setActiveTab(tab));
	};

	const handleSwitchClick = () => {
		dispatch(setIsAssignee(!isAssignee));
	};

	return (
		<TableControlsView
			activeTab={activeTab}
			isAssignee={isAssignee}
			onTabClick={handleTabClick}
			onSwitchClick={handleSwitchClick}
		/>
	);
};

export { TableControls };
