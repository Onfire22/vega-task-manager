import { TableControlsView } from './table-controls-view';
import type { TActiveTab } from '../types.ts';
import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks.ts';
import { setActiveTab } from '../slice.ts';

interface IProps {
	activeTab: TActiveTab;
}

const TableControls: React.FC<IProps> = ({ activeTab }) => {
	const [switchStatus, setSwitchStatus] = useState(false);

	const dispatch = useAppDispatch();

	const handleTabClick = (tab: TActiveTab) => {
		dispatch(setActiveTab(tab));
	};

	const handleSwitchClick = () => {
		setSwitchStatus((prev) => !prev);
	};

	return (
		<TableControlsView
			activeTab={activeTab}
			switchStatus={switchStatus}
			onTabClick={handleTabClick}
			onSwitchClick={handleSwitchClick}
		/>
	);
};

export { TableControls };
