import type { TActiveTab } from '../../types.ts';
import React from 'react';
import { TableControls } from '../../table-controls';
import { Kanban } from '../../kanban';
import { TasksTable } from '../../tasks-table';
import './styles.less';

interface IProps {
	activeTab: TActiveTab;
}

const TasksView: React.FC<IProps> = ({ activeTab }) => {
	return (
		<div className="tasks">
			<TableControls activeTab={activeTab} />
			{activeTab === 'table' ? <TasksTable /> : <Kanban />}
		</div>
	);
};

export { TasksView };
