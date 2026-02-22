import { Header } from '../../components/header';
import { PageContentWrapper } from '../../components/page-content-wrapper/page-content-wrapper.tsx';
import { CustomMenu } from './custom-menu';
import { CreateTaskWindow } from './create-task-window';
import { useGetStackListQuery, useGetTaskPrioritiesQuery } from '../../api/queries/dictionaries.api.ts';

const TasksPage = () => {
	const { data: taskPrioritiesData } = useGetTaskPrioritiesQuery();
	const { data: stackListData } = useGetStackListQuery();

	return (
		<>
			<Header menu={<CustomMenu />} />
			<PageContentWrapper offset={56}>
				<div>table</div>
				<CreateTaskWindow
					taskPrioritiesData={taskPrioritiesData?.payload}
					stackListData={stackListData?.payload}
				/>
			</PageContentWrapper>
		</>
	);
};

export { TasksPage };
