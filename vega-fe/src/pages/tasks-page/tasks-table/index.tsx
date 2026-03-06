import { TasksTableView } from './tasks-table-view';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActiveTabSelector } from '../selectors.ts';
import { useTableData } from '../hooks.ts';
import { useNavigate } from 'react-router-dom';

const TasksTable = () => {
	const navigate = useNavigate();

	const tableData = useTableData();

	const activeTab = useAppSelector(getActiveTabSelector());

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return <TasksTableView activeTab={activeTab} tableData={tableData} onRowDoubleClick={handleRowDoubleClick} />;
};

export { TasksTable };
