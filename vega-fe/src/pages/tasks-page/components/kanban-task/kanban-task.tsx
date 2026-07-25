import React from 'react';
import type { ITask } from '@/pages/tasks-page/types.ts';
import { KanbanTaskView } from '@/pages/tasks-page/components/kanban-task/kanban-task.view.tsx';
import { useNavigate } from 'react-router-dom';

interface IProps {
	task: ITask;
}

const KanbanTask: React.FC<IProps> = ({ task }) => {
	const navigate = useNavigate();

	const handleTaskDoubleClick = (uuid: string) => {
		navigate(`/task/${uuid}`);
	};

	return <KanbanTaskView task={task} onTaskDoubleClick={handleTaskDoubleClick} />;
};

export { KanbanTask };
