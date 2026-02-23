import { TasksTableView } from './tasks-table-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector } from '../selectors.ts';
import { useGetTasksQuery } from '../../../api/queries/tasks.api.ts';

const TasksTable = () => {
	const { data } = useGetTasksQuery({ filters: { withAssignee: false } });

	console.log(data);

	const activeTab = useAppSelector(getActiveTabSelector());

	return <TasksTableView activeTab={activeTab} />;
};

export { TasksTable };
