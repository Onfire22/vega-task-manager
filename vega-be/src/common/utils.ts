import { TIME_COEFFICIENTS } from '../constants';

export const transformTimeToSeconds = (time?: string) => {
	if (!time) return 0;

	return time.split(' ').reduce((acc, item) => {
		const key = item.slice(-1) as keyof typeof TIME_COEFFICIENTS;
		const value = parseInt(item);
		return acc + Number(value) * (TIME_COEFFICIENTS[key] ?? 0);
	}, 0);
};
