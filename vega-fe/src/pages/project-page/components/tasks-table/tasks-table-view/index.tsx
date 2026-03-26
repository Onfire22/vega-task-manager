import React from 'react';
import { TABLE_HEADER } from '../../../table-header.ts';
import type { IProjectTask } from '../../../types.ts';
import { CustomTable } from '@/components/common/shared/custom-table.tsx';

interface IProps {
	tableData: Array<IProjectTask>;
	onRowDoubleClick: (uuid: string) => void;
	isLoading: boolean;
}

const TasksTableView: React.FC<IProps> = ({ tableData, onRowDoubleClick }) => {
	return (
		<CustomTable
			headerData={TABLE_HEADER}
			onRowDoubleClick={onRowDoubleClick}
			tableData={tableData}
			outOfDataMessage="Задач не найдено"
		/>
	);
};

export { TasksTableView };
