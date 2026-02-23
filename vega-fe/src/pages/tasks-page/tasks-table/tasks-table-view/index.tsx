import './styles.less';
import { TableControls } from '../../table-controls';
import type { TActiveTab } from '../../types.ts';
import React from 'react';

interface IProps {
	activeTab: TActiveTab;
}

const TasksTableView: React.FC<IProps> = ({ activeTab }) => {
	return (
		<div className="tasks-table">
			<TableControls activeTab={activeTab} />
		</div>
	);
};

export { TasksTableView };
