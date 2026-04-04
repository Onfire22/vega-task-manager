import { TIME_COEFFICIENTS } from '../constants';
import { ITime } from './types';

export const transformTimeToSeconds = (time?: string) => {
	if (!time) return 0;

	return time.split(' ').reduce((acc, item) => {
		const key = item.slice(-1) as keyof typeof TIME_COEFFICIENTS;
		const value = parseInt(item);
		return acc + Number(value) * (TIME_COEFFICIENTS[key] ?? 0);
	}, 0);
};

export const isDateEquals = (createdDate: Date, updatedDate?: Date) => {
	if (!updatedDate) return false;

	const date1 = new Date(createdDate);
	const date2 = new Date(updatedDate);

	return date1.getTime() === date2.getTime();
};

export const transformSecondsToTime = (seconds: number) => {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	let result = '';

	if (hours) {
		result += `${hours}h`;
	}

	if (minutes) {
		result += ` ${minutes}m`;
	}

	return result;
};
