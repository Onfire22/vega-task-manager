import { TasksTableView } from './tasks-table.view.tsx';
import { useNavigate } from 'react-router-dom';
import { useProjectTasks } from '../../hooks.ts';

const TasksTable = () => {
	const navigate = useNavigate();

	const { tasks, isProjectLoading } = useProjectTasks();

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return <TasksTableView onRowDoubleClick={handleRowDoubleClick} tableData={tasks} isLoading={isProjectLoading} />;
};

export { TasksTable };
