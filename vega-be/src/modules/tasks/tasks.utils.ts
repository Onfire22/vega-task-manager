import { TIME_COEFFICIENTS } from '../../constants';
import { ITaskLog, ITime, TaskListItem, TPrismaTask } from './tasks.types';

export const isDateEquals = (createdDate: Date, updatedDate?: Date) => {
	if (!updatedDate) return false;

	const date1 = new Date(createdDate);
	const date2 = new Date(updatedDate);

	return date1.getTime() === date2.getTime();
};

export const transformTimeToSeconds = (time?: string) => {
	if (!time) return 0;

	return time.split(' ').reduce((acc, item) => {
		const key = item.slice(-1) as keyof typeof TIME_COEFFICIENTS;
		const value = parseInt(item);
		return acc + Number(value) * (TIME_COEFFICIENTS[key] ?? 0);
	}, 0);
};

export const transformSecondsToTime = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	const result: Partial<ITime> = {};

	if (hours) {
		result.hours = `${hours}h`;
	}

	if (minutes) {
		result.minutes = `${minutes}m`;
	}

	return result;
};

export const getTaskWithTransformedTime = (task: TPrismaTask | TaskListItem) => {
	const { estimateTime, remainingTime, ...rest } = task;

	const totalLoggedTimeInSecs = task.timeLogs.reduce((acc, log) => {
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

	return {
		...rest,
		logInfo,
		timeLogs:
			task.timeLogs.length > 0
				? task.timeLogs.map((log) => {
						const { updatedAt, ...rest } = log;

						return {
							...rest,
							...(isDateEquals(log.createdAt, updatedAt) ? {} : { updatedAt: log.updatedAt }),
							loggedTime: log.loggedTime ? transformSecondsToTime(log.loggedTime) : null,
							loggedTimeInSecs: log.loggedTime,
						};
					})
				: [],
	};
};
