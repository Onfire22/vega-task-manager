import { Header } from '../../components/header';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { CustomMenu } from './custom-menu';
import { TasksTable } from './tasks-table';
import { useAppSelector } from '../../store/hooks.ts';
import { getActiveModalSelector } from './selectors.ts';
import { modal } from './modals';

const TasksPage = () => {
	const activeModal = useAppSelector(getActiveModalSelector());

	const ActiveModal = activeModal ? modal[activeModal] : null;

	return (
		<>
			<Header menu={<CustomMenu />} />
			<PageContentWrapper offset={56}>
				<TasksTable />
			</PageContentWrapper>
			{ActiveModal && <ActiveModal />}
		</>
	);
};

export { TasksPage };
