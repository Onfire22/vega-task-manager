import { TasksTableView } from './tasks-table-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector, getTableDataSelector } from '../selectors.ts';
import { useGetTasksQuery } from '../../../api/queries/tasks.api.ts';

const TasksTable = () => {
	useGetTasksQuery({ filters: { withAssignee: false } });

	const tableData = useAppSelector(getTableDataSelector());

	const activeTab = useAppSelector(getActiveTabSelector());

	return <TasksTableView activeTab={activeTab} tableData={tableData} />;
};

export { TasksTable };
