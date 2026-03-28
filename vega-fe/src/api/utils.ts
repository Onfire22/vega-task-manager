import type { TDictionary } from './types.ts';

export const transformDictionaries = (dictionary: TDictionary) => {
	return dictionary.map((item) => {
		return { label: item.label, value: item.id, key: item.key, description: item.description };
	});
};
