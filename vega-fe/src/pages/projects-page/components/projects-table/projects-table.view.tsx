import React from 'react';
import { TABLE_HEADER } from '../../table-header.ts';
import type { IProject } from '../../types.ts';
import { CustomTable } from '@/components/common/shared/custom-table.tsx';
import { CustomPagination } from '@/components/common/ui/custom-pagination.tsx';
import type { IPagination } from '@/pages/tasks-page/types.ts';

interface IProps {
	projects: IProject[];
	isLoading: boolean;
	pagination: IPagination;
	onRowDoubleClick: (uuid: string) => void;
	onPageClick: (page: number) => void;
	onPageLimitChange: (page: number) => void;
	onSideButtonClick: (side: 'next' | 'prev') => void;
}

const ProjectsTableView: React.FC<IProps> = ({
	projects,
	isLoading,
	onRowDoubleClick,
	pagination,
	onPageClick,
	onPageLimitChange,
	onSideButtonClick,
}) => {
	return (
		<div className="w-full">
			<CustomTable
				tableData={projects}
				headerData={TABLE_HEADER}
				onRowDoubleClick={onRowDoubleClick}
				isLoading={isLoading}
				outOfDataMessage="Проектов не найдено"
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

export { ProjectsTableView };
