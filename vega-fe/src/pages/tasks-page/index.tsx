import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { TasksTable } from './tasks-table';

const TasksPage = () => {
	return (
		<PageContentWrapper offset={56}>
			<TasksTable />
		</PageContentWrapper>
	);
};

export { TasksPage };
