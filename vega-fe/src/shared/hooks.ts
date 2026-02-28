import { useGetDictionariesQuery } from '../api/queries/dictionaries.api.ts';
import { BASE_DICTIONARIES_META } from '../pages/tasks-page/constants.ts';
import { transformDictionaries } from '../pages/tasks-page/utils.ts';
import { CACHING_SETTINGS } from './constants.ts';

export const useDictionaries = (isFormDictionaries: boolean = false) => {
	const { data, isLoading, isSuccess } = useGetDictionariesQuery(BASE_DICTIONARIES_META, CACHING_SETTINGS);

	if (isSuccess) {
		let selectorsData = null;

		if (isFormDictionaries) {
			const { stack_type, task_priority } = data.dictionaries;

			selectorsData = {
				stackTypes: transformDictionaries(stack_type),
				priorities: transformDictionaries(task_priority),
			};
		}

		return { dictionaries: data.dictionaries, isDictionariesLoading: isLoading, selectorsData };
	}

	return { dictionaries: null, isDictionariesLoading: isLoading, selectorsData: null };
};
