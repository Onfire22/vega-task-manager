import { KanbanView } from './kanban-view';
import { Loader } from '@mantine/core';
import { useKanbanTasks } from '../hooks.ts';
import { useNavigate } from 'react-router-dom';

const Kanban = () => {
	const navigate = useNavigate();

	const { columns, isColumnsLoading } = useKanbanTasks();

	const handleTaskDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return isColumnsLoading ? <Loader /> : <KanbanView columns={columns} onTaskDoubleClick={handleTaskDoubleClick} />;
};

export { Kanban };
