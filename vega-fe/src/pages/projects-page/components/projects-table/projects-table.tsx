import { ProjectsTableView } from './projects-table.view.tsx';
import { useProjectsTableData } from '../../hooks.ts';
import { useNavigate } from 'react-router-dom';

const ProjectsTable = () => {
	const navigate = useNavigate();

	const { projects, isLoading } = useProjectsTableData();

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/project/${uuid}`);
	};

	return <ProjectsTableView projects={projects} isLoading={isLoading} onRowDoubleClick={handleRowDoubleClick} />;
};

export { ProjectsTable };
