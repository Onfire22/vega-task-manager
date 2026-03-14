import React from 'react';
import { CustomTable } from '../../../../../components/custom-table';
import { TABLE_HEADER } from '../../../table-header.ts';
import type { IProjectTask } from '../../../types.ts';

interface IProps {
	tableData: Array<IProjectTask>;
	onRowDoubleClick: (uuid: string) => void;
	isLoading: boolean;
}

const TasksTableView: React.FC<IProps> = ({ tableData, onRowDoubleClick }) => {
	return (
		<div className="tasks-table">
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
