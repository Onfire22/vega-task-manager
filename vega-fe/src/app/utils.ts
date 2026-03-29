import { useEffect, useState } from 'react';

export const getAvatarColor = (uuid?: string) => {
	if (!uuid) return '';

	let hash = 0;
	for (let i = 0; i < uuid.length; i++) {
		hash = uuid.charCodeAt(i) + ((hash << 5) - hash);
	}
	const hue = Math.abs(hash) % 360;
	return `hsl(${hue}, 55%, 38%)`;
};

export const typedKeys = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[];

export const typedEntries = <T extends object>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][];

export const typedValues = <T extends object>(obj: T): T[keyof T][] => Object.values(obj) as T[keyof T][];

export const parseDate = (date: string | null) => {
	if (!date) return;

	const [day, month, year] = date.split('.');
	return new Date(Number(year), Number(month) - 1, Number(day));
};

export const useDebounce = <T>(value: T, delay: number): T => {
	const [debounced, setDebounced] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debounced;
};
