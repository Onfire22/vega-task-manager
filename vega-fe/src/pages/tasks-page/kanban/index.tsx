import { KanbanView } from './kanban-view';
import { useKanbanTasks } from '../hooks.ts';
import { useNavigate } from 'react-router-dom';
import { CustomLoader } from '@/components/common/ui/custom-loader.tsx';

const Kanban = () => {
	const navigate = useNavigate();

	const { columns, isColumnsLoading } = useKanbanTasks();

	const handleTaskDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return isColumnsLoading ? (
		<CustomLoader />
	) : (
		<KanbanView columns={columns} onTaskDoubleClick={handleTaskDoubleClick} />
	);
};

export { Kanban };
