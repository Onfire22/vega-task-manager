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

export const getPaginationPages = (currentPage: number, totalPages: number) => {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	const first = [1, 2];
	const last = [totalPages - 1, totalPages];

	const middle = [currentPage - 1, currentPage, currentPage + 1].filter((p) => p > 2 && p < totalPages - 1);

	const pages = [...new Set([...first, ...middle, ...last])].sort((a, b) => a - b);

	const result: (number | null)[] = [];
	pages.forEach((p, i) => {
		if (i > 0 && p - pages[i - 1] > 1) {
			result.push(null);
		}
		result.push(p);
	});

	return result;
};

interface PluralOptions {
	one: string;
	few: string;
	many: string;
}

export const pluralValue = (value: number, variants: PluralOptions, locale = 'ru-RU') => {
	const key = new Intl.PluralRules(locale).select(value);
	return variants[key as keyof typeof variants] || '';
};

export const prepareSingleFileFormData = (values: Record<string, unknown>) => {
	const formData = new FormData();

	Object.entries(values).forEach(([key, value]) => {
		if (value instanceof Blob) {
			formData.append(key, value);
		} else {
			formData.append(key, String(value));
		}
	});

	return formData;
};
