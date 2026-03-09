import { TasksTableView } from './tasks-table-view';
import { useUserTasks } from '../hooks.ts';
import { useNavigate } from 'react-router-dom';

const TasksTable = () => {
	const navigate = useNavigate();

	const { userTasks } = useUserTasks();

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return <TasksTableView tableData={userTasks} onRowDoubleClick={handleRowDoubleClick} />;
};

export { TasksTable };
