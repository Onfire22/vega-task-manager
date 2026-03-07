import React from 'react';
import { TABLE_HEADER } from '../../../table-header.ts';
import './styles.less';
import type { IProject } from '../../../types.ts';
import { CustomTable } from '../../../../../components/custom-table';

interface IProps {
	projects: IProject[];
	isLoading: boolean;
	onRowDoubleClick: (uuid: string) => void;
}

const ProjectTableView: React.FC<IProps> = ({ projects, isLoading, onRowDoubleClick }) => {
	return (
		<div className="projects-table">
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

export { ProjectTableView };
