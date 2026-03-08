import { format } from 'date-fns';
import { useTask } from '../../api/hooks.ts';
import { DATE_FORMAT, TASK_STATUS_NUMBER } from './constants.ts';

export const useTaskData = (uuid?: string) => {
	const { task, isTaskLoading } = useTask(uuid);

	if (!task) return { task: null, isTaskLoading, activeTaskStatus: 0 };

	const taskData = {
		...task,
		reporter: `${task.reporter?.name} ${task.reporter.secondName}`,
		assignee: task.assignee ? `${task.assignee.name} ${task.assignee.secondName}` : 'unassigned',
		updatedAt: format(new Date(task.updatedAt), DATE_FORMAT),
		createdAt: format(new Date(task.createdAt), DATE_FORMAT),
	};

	const activeTaskStatus = TASK_STATUS_NUMBER[task.taskStatus.name as keyof typeof TASK_STATUS_NUMBER];

	return {
		task: taskData,
		activeTaskStatus,
		isTaskLoading,
	};
};
