import { useGetDictionariesQuery } from '@/api/dictionaries/dictionaries.api.ts';
import { CACHING_SETTINGS } from '@/app/constants.ts';
import { useMemo } from 'react';
import { transformDictionaries } from '@/api/utils.ts';
import type { TDictionariesRequest } from '@/api/dictionaries/dictionaries.types.ts';

export const useDictionaries = (meta: TDictionariesRequest) => {
	const { data, isLoading, isSuccess } = useGetDictionariesQuery(meta, CACHING_SETTINGS);

	const dictionaries = useMemo(() => {
		return isSuccess ? data.dictionaries : {};
	}, [data, isSuccess]);

	return { dictionaries, isDictionariesLoading: isLoading };
};

export const useDictionariesOptions = (meta: TDictionariesRequest) => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(meta);

	const dictionariesOptions = useMemo(() => {
		return (Object.keys(dictionaries) as Array<keyof typeof dictionaries>).reduce(
			(acc, key) => {
				if (dictionaries[key]) {
					return {
						...acc,
						[key]: transformDictionaries(dictionaries[key]),
					};
				}
				return acc;
			},
			{} as Record<keyof typeof dictionaries, ReturnType<typeof transformDictionaries>>,
		);
	}, [dictionaries]);

	return { dictionariesOptions, isDictionariesLoading };
};
