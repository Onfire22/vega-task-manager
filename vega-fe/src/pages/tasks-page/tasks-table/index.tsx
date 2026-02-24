import { TasksTableView } from './tasks-table-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector } from '../selectors.ts';
import { useTableData } from '../hooks.ts';

const TasksTable = () => {
	const tableData = useTableData();

	const activeTab = useAppSelector(getActiveTabSelector());

	return <TasksTableView activeTab={activeTab} tableData={tableData} />;
};

export { TasksTable };
