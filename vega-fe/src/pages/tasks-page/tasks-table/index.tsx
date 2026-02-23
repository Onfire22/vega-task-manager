import { TasksTableView } from './tasks-table-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector } from '../selectors.ts';

const TasksTable = () => {
	const activeTab = useAppSelector(getActiveTabSelector());

	return <TasksTableView activeTab={activeTab} />;
};

export { TasksTable };
