import { ProjectTableView } from './project-table-view';
import { useProjectsTableData } from '../../hooks.ts';
import { useNavigate } from 'react-router-dom';

const ProjectTable = () => {
	const navigate = useNavigate();

	const { projects, isLoading } = useProjectsTableData();

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/project/${uuid}`);
	};

	return <ProjectTableView projects={projects} isLoading={isLoading} onRowDoubleClick={handleRowDoubleClick} />;
};

export { ProjectTable };
