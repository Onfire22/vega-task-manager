import { format } from 'date-fns';
import { useTask } from '../../api/hooks.ts';
import { DATE_FORMAT, DATE_TIME_FORMAT } from './constants.ts';

export const useTaskData = (uuid?: string) => {
	const { task, isTaskLoading } = useTask(uuid);

	if (!task) return { task: null, isTaskLoading };

	const remainingPercents = task.remainingTimeInSecs ? (task.remainingTimeInSecs * 100) / task.estimateTimeInSecs : 0;

	const loggedPercents = task.totalLoggedTimeInSecs
		? (task.totalLoggedTimeInSecs * 100) / task.estimateTimeInSecs
		: 0;

	const taskData = {
		...task,
		remainingPercents,
		loggedPercents,
		reporter: `${task.reporter?.name} ${task.reporter.secondName}`,
		assignee: task.assignee ? `${task.assignee.name} ${task.assignee.secondName}` : null,
		remainingTime:
			task?.remainingTime?.hours || task?.remainingTime?.minutes
				? `${task.remainingTime.hours || ''} ${task.remainingTime.minutes || ''}`
				: '',
		estimateTime:
			task?.estimateTime?.hours || task?.estimateTime?.minutes
				? `${task.estimateTime.hours || ''} ${task.estimateTime.minutes || ''}`
				: '',
		totalLoggedTime:
			task?.totalLoggedTime?.hours || task?.totalLoggedTime?.minutes
				? `${task.totalLoggedTime.hours || ''} ${task.totalLoggedTime.minutes || ''}`
				: '',
		timeLogs: task.timeLogs.map((log) => {
			return {
				...log,
				loggedTime: `${log.loggedTime.hours || ''} ${log.loggedTime.minutes || ''}`,
				createdAt: format(log.createdAt, DATE_TIME_FORMAT),
			};
		}),
		updatedAt: format(new Date(task.updatedAt), DATE_FORMAT),
		createdAt: format(new Date(task.createdAt), DATE_FORMAT),
	};

	return {
		task: taskData,
		isTaskLoading,
	};
};
