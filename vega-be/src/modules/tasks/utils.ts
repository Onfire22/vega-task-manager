import { TIME_COEFFICIENTS } from '../../constants';
import { ITask, ITaskTransformed, ITime, ITimeLog } from './tasks.types';

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

export const getTaskWithTransformedTime = <T extends Pick<ITask, 'estimateTime' | 'timeLogs'>>(
	task: T,
): Omit<T, 'estimateTime' | 'timeLogs'> & {
	estimateTime: Partial<ITime> | null;
	timeLogs: Array<Omit<ITimeLog, 'loggedTime'> & { loggedTime: Partial<ITime> | null }>;
} => {
	return {
		...task,
		estimateTime: task.estimateTime ? transformSecondsToTime(task.estimateTime) : null,
		timeLogs:
			task.timeLogs.length > 0
				? task.timeLogs.map((log) => {
						const { updatedAt, ...rest } = log;

						return {
							...rest,
							...(isDateEquals(log.createdAt, updatedAt) ? {} : { updatedAt: log.updatedAt }),
							loggedTime: log.loggedTime ? transformSecondsToTime(log.loggedTime) : null,
						};
					})
				: [],
	};
};
