import type { IPagination, TTaskList } from '../../types.ts';
import React from 'react';
import { TABLE_HEADER } from '../../table-header.ts';
import { CustomTable } from '@/components/common/shared/custom-table.tsx';
import { CustomPagination } from '@/components/common/ui/custom-pagination.tsx';

interface IProps {
	tableData: TTaskList;
	pagination: IPagination;
	onRowDoubleClick: (uuid: string) => void;
	onPageClick: (page: number) => void;
	onPageLimitChange: (page: number) => void;
	onSideButtonClick: (side: 'next' | 'prev') => void;
}

const TasksTableView: React.FC<IProps> = ({
	tableData,
	onRowDoubleClick,
	pagination,
	onPageClick,
	onPageLimitChange,
	onSideButtonClick,
}) => {
	return (
		<div className="w-full">
			<CustomTable
				headerData={TABLE_HEADER}
				onRowDoubleClick={onRowDoubleClick}
				tableData={tableData}
				outOfDataMessage="Задач не найдено"
			/>
			<div className="py-5">
				<CustomPagination
					pagination={pagination}
					onPageClick={onPageClick}
					onPageLimitChange={onPageLimitChange}
					onSideButtonClick={onSideButtonClick}
				/>
			</div>
		</div>
	);
};

export { TasksTableView };
