import { useGetDictionariesQuery } from '../../api/queries/dictionaries.api.ts';
import { BASE_DICTIONARIES_META } from './constants.ts';
import { useGetTasksQuery } from '../../api/queries/tasks.api.ts';
import { transformDictionaries, transformTasksDataToTable } from './utils.ts';
import { getIsAssigneeSelector } from './selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';

export const useDictionaries = () => {
	const { data, isLoading, isSuccess } = useGetDictionariesQuery(BASE_DICTIONARIES_META, {
		refetchOnMountOrArgChange: false,
		refetchOnFocus: false,
		refetchOnReconnect: false,
	});

	if (isSuccess) {
		const { stack_type, task_priority } = data.dictionaries;

		const selectorsData = {
			stackTypes: transformDictionaries(stack_type),
			priorities: transformDictionaries(task_priority),
		};

		return { dictionaries: data.dictionaries, isDictionariesLoading: isLoading, selectorsData };
	}

	return { dictionaries: null, selectorsData: null };
};

export const useTableData = () => {
	const isAssignee = useAppSelector(getIsAssigneeSelector());
	const { dictionaries } = useDictionaries();

	const { tableData } = useGetTasksQuery(
		{ filters: { withAssignee: isAssignee } },
		{
			selectFromResult: (result) => {
				if (!result?.isSuccess || !dictionaries) return { tableData: [], isTableDataLoading: false };

				return {
					tableData: transformTasksDataToTable(result.data.tasks, dictionaries),
					isTableDataLoading: result.isLoading,
				};
			},
		},
	);

	return tableData;
};
