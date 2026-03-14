import { TasksTableView } from './tasks-table-view';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectTasks } from '../../hooks.ts';

const TasksTable = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { tasks, isProjectLoading } = useProjectTasks(params.uuid);

	const handleRowDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return <TasksTableView onRowDoubleClick={handleRowDoubleClick} tableData={tasks} isLoading={isProjectLoading} />;
};

export { TasksTable };
