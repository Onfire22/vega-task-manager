import { TaskView } from './task-view';
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';
import { useTask } from '../hooks.ts';

const Task = () => {
	const params = useParams();

	const { isTasksLoading, task } = useTask(params?.uuid);

	if (!task) return null;

	return isTasksLoading ? <Loader /> : <TaskView task={task} />;
};

export { Task };
