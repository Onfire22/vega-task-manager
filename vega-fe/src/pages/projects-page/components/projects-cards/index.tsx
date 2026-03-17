import { ProjectsCardsView } from './projects-cards-view';
import { useProjectsTableData } from '../../hooks.ts';
import { Loader } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const ProjectsCards = () => {
	const navigate = useNavigate();

	const { projects, isLoading } = useProjectsTableData();

	const handleCardClick = (uuid: string) => {
		navigate(`/project/${uuid}`);
	};

	return isLoading ? <Loader /> : <ProjectsCardsView projects={projects} onCardClick={handleCardClick} />;
};

export { ProjectsCards };
