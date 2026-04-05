import type { TDictionary } from '@/api/dictionaries/dictionaries.types.ts';

export const transformDictionaries = (dictionary: TDictionary) => {
	return dictionary.map((item) => {
		return { label: item.label, value: item.id, key: item.key, description: item.description };
	});
};
