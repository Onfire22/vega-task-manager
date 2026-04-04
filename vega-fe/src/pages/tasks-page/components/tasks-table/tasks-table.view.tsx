import type { IPagination, TTaskList } from '../../types.ts';
import React from 'react';
import { TABLE_HEADER } from '../../table-header.ts';
import { CustomTable } from '@/components/common/shared/custom-table.tsx';
import { CustomPagination } from '@/components/common/ui/custom-pagination.tsx';

interface IProps {
	tableData: TTaskList;
	pagination: IPagination;
	onRowDoubleClick: (uuid: string) => void;
	onPaginationPageClick: (page: number) => void;
	onPageLimitChange: (page: number) => void;
	onPaginationSideButtonsClick: (side: 'next' | 'prev') => void;
}

const TasksTableView: React.FC<IProps> = ({
	tableData,
	onRowDoubleClick,
	pagination,
	onPaginationPageClick,
	onPageLimitChange,
	onPaginationSideButtonsClick,
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
					onPageClick={onPaginationPageClick}
					onPageLimitChange={onPageLimitChange}
					onPaginationSideButtonsClick={onPaginationSideButtonsClick}
				/>
			</div>
		</div>
	);
};

export { TasksTableView };
