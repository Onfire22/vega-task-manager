import { Header } from '../../components/header';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { CustomMenu } from './custom-menu';
import { CreateTaskModal } from './create-task-modal';
import { TasksTable } from './tasks-table';
import { useAppSelector } from '../../store/hooks.ts';
import { getPrioritiesResultSelector, getStackListResultSelector } from './selectors.ts';
import { useGetDictionariesHook } from '../../api/hooks.ts';

const TasksPage = () => {
	useGetDictionariesHook({
		refetchOnMountOrArgChange: false,
		refetchOnFocus: false,
		refetchOnReconnect: false,
	});

	const stackListData = useAppSelector(getStackListResultSelector());
	const taskPrioritiesData = useAppSelector(getPrioritiesResultSelector());

	return (
		<>
			<Header menu={<CustomMenu />} />
			<PageContentWrapper offset={56}>
				<TasksTable />
				<CreateTaskModal
					taskPrioritiesData={taskPrioritiesData?.data?.payload}
					stackListData={stackListData?.data?.payload}
				/>
			</PageContentWrapper>
		</>
	);
};

export { TasksPage };
