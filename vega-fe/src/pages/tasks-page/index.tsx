import { Header } from '../../components/header';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { CustomMenu } from './custom-menu';
import { CreateTaskModal } from './create-task-modal';
import { TasksTable } from './tasks-table';
import { useAppSelector } from '../../store/hooks.ts';
import { useGetDictionariesQuery } from '../../api/queries/dictionaries.api.ts';
import { BASE_DICTIONARIES_META } from './constants.ts';
import { getSelectorsValuesSelector } from './selectors.ts';

const TasksPage = () => {
	useGetDictionariesQuery(BASE_DICTIONARIES_META, {
		refetchOnMountOrArgChange: false,
		refetchOnFocus: false,
		refetchOnReconnect: false,
	});

	const { priorities, stackTypes } = useAppSelector(getSelectorsValuesSelector());

	return (
		<>
			<Header menu={<CustomMenu />} />
			<PageContentWrapper offset={56}>
				<TasksTable />
				<CreateTaskModal taskPrioritiesData={priorities} stackListData={stackTypes} />
			</PageContentWrapper>
		</>
	);
};

export { TasksPage };
