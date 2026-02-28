import { TaskView } from './task-view';
import { Loader } from '@mantine/core';
import { useDictionaries } from '../../../shared/hooks.ts';
import { TASK_STATUS_NUMBER } from '../constants.ts';
import { useParams } from 'react-router-dom';
import { useTask } from '../hooks.ts';
import { useUpdateTaskStatusMutation } from '../../../api/queries/task.api.ts';

const Task = () => {
	const params = useParams();
	const { dictionaries } = useDictionaries();
	const [updateTaskStatus] = useUpdateTaskStatusMutation();

	const { isTasksLoading, task } = useTask(params?.uuid);

	if (!task) return null;

	const activeTaskStatus = TASK_STATUS_NUMBER[task.taskStatusUuid as keyof typeof TASK_STATUS_NUMBER];

	const handleTaskStatusUpdate = (uuid: string, status: string) => {
		updateTaskStatus({ uuid, status });
	};

	return isTasksLoading ? (
		<Loader />
	) : (
		<TaskView
			task={task}
			activeTaskStatus={activeTaskStatus}
			taskStatuses={dictionaries?.task_status}
			onTaskStatusUpdate={handleTaskStatusUpdate}
		/>
	);
};

export { Task };
