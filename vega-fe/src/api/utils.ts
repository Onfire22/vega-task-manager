import type { IDictionary } from './types.ts';

export const transformDictionaries = (dictionary: Array<IDictionary>) => {
	return dictionary.map((item) => {
		return { label: item.label, value: item.id, key: item.key, description: item.description };
	});
};
