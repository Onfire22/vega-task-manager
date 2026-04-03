import { ITaskLog, TaskListItem, TPrismaTask } from './tasks.types';
import { transformSecondsToTime } from '../../common/utils';

export const getTaskWithTransformedTime = (task: TPrismaTask | TaskListItem) => {
	const { estimateTime, remainingTime, timeLogs, ...rest } = task;

	const totalLoggedTimeInSecs = timeLogs.reduce((acc, log) => {
		if (log.loggedTime) {
			acc += log.loggedTime;
		}

		return acc;
	}, 0);

	const remainingPercents =
		task.remainingTime && task?.estimateTime ? (task.remainingTime * 100) / task.estimateTime : 0;

	const loggedPercents =
		totalLoggedTimeInSecs && task.estimateTime ? (totalLoggedTimeInSecs * 100) / task.estimateTime : 0;

	const logInfo: ITaskLog = {
		estimateTime: null,
		remainingTime: null,
		totalLoggedTime: null,
	};

	if (task.estimateTime) {
		logInfo.estimateTime = {
			time: transformSecondsToTime(task.estimateTime),
			timeInPercents: 100,
		};
	}

	if (task.remainingTime) {
		logInfo.remainingTime = {
			time: transformSecondsToTime(task.remainingTime),
			timeInPercents: remainingPercents,
		};
	}

	if (totalLoggedTimeInSecs) {
		logInfo.totalLoggedTime = {
			time: transformSecondsToTime(totalLoggedTimeInSecs),
			timeInPercents: loggedPercents,
		};
	}

	return { ...rest, logInfo };
};
