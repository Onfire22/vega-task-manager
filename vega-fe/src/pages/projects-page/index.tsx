import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { ProjectTable } from './components/project-table';

const ProjectsPage = () => {
	return (
		<PageContentWrapper offset={56}>
			<ProjectTable />
		</PageContentWrapper>
	);
};

export { ProjectsPage };
