import type { TTaskList } from '../../types.ts';
import React from 'react';
import { TABLE_HEADER } from '../../table-header.ts';
import { CustomTable } from '@/components/common/shared/custom-table.tsx';

interface IProps {
	tableData: TTaskList;
	onRowDoubleClick: (uuid: string) => void;
}

const TasksTableView: React.FC<IProps> = ({ tableData, onRowDoubleClick }) => {
	return (
		<div className="w-full">
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
