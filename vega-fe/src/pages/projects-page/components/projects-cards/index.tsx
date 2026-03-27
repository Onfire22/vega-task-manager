import { ProjectsCardsView } from './projects-cards-view';
import { useProjectsTableData } from '../../hooks.ts';
import { useNavigate } from 'react-router-dom';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';

const ProjectsCards = () => {
	const navigate = useNavigate();

	const { projects, isLoading } = useProjectsTableData();

	const handleCardClick = (uuid: string) => {
		navigate(`/project/${uuid}`);
	};

	return isLoading ? <CustomLoader /> : <ProjectsCardsView projects={projects} onCardClick={handleCardClick} />;
};

export { ProjectsCards };
