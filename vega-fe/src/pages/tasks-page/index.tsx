import { Header } from '../../components/header';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { CustomMenu } from './custom-menu';
import { CreateTaskModal } from './create-task-modal';
import { TasksTable } from './tasks-table';

const TasksPage = () => {
	return (
		<>
			<Header menu={<CustomMenu />} />
			<PageContentWrapper offset={56}>
				<TasksTable />
				<CreateTaskModal />
			</PageContentWrapper>
		</>
	);
};

export { TasksPage };
