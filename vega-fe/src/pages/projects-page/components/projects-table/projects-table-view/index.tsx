import React from 'react';
import { TABLE_HEADER } from '../../../table-header.ts';
import type { IProject } from '../../../types.ts';
import { CustomTable } from '@/components/common/custom-table.tsx';

interface IProps {
	projects: IProject[];
	isLoading: boolean;
	onRowDoubleClick: (uuid: string) => void;
}

const ProjectsTableView: React.FC<IProps> = ({ projects, isLoading, onRowDoubleClick }) => {
	return (
		<div className="w-full">
			<CustomTable
				tableData={projects}
				headerData={TABLE_HEADER}
				onRowDoubleClick={onRowDoubleClick}
				isLoading={isLoading}
				outOfDataMessage="Проектов не найдено"
			/>
		</div>
	);
};

export { ProjectsTableView };
