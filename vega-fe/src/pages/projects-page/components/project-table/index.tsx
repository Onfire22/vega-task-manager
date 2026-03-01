import { ProjectTableView } from './project-table-view';
import { useProjects } from '../../hooks.ts';

const ProjectTable = () => {
	const { projects, isLoading } = useProjects();

	return <ProjectTableView projects={projects} isLoading={isLoading} />;
};

export { ProjectTable };
