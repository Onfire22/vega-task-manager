import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { Header } from '../../components/header';
import { ProjectTable } from './components/project-table';

const ProjectsPage = () => {
	return (
		<>
			<Header menu />
			<PageContentWrapper>
				<ProjectTable />
			</PageContentWrapper>
		</>
	);
};

export { ProjectsPage };
