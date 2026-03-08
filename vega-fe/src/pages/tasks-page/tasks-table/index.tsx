import { TasksTableView } from './tasks-table-view';
import { useTableData } from '../hooks.ts';
import { useNavigate } from 'react-router-dom';

const TasksTable = () => {
	const navigate = useNavigate();

	const { tableData } = useTableData();

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return <TasksTableView tableData={tableData} onRowDoubleClick={handleRowDoubleClick} />;
};

export { TasksTable };
