import { ProjectTableView } from './project-table-view';
import { useProjectsTableData } from '../../hooks.ts';

const ProjectTable = () => {
	const { projects, isLoading } = useProjectsTableData();

	return <ProjectTableView projects={projects} isLoading={isLoading} />;
};

export { ProjectTable };
