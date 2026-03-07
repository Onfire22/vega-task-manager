import './styles.less';
import { TableControls } from '../../table-controls';
import type { ITaskTableData, TActiveTab } from '../../types.ts';
import React from 'react';
import { TABLE_HEADER } from '../../table-header.ts';
import { CustomTable } from '../../../../components/custom-table';

interface IProps {
	activeTab: TActiveTab;
	tableData: ITaskTableData[];
	onRowDoubleClick: (uuid: string) => void;
}

const TasksTableView: React.FC<IProps> = ({ activeTab, tableData, onRowDoubleClick }) => {
	return (
		<div className="tasks-table">
			<TableControls activeTab={activeTab} />
			<CustomTable
				headerData={TABLE_HEADER}
				onRowDoubleClick={onRowDoubleClick}
				tableData={tableData}
				outOfDataMessage="Задач не найдено"
			/>
		</div>
	);
};

export { TasksTableView };
