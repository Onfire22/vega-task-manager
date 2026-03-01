import { useGetTasksQuery } from '../../api/queries/tasks.api.ts';
import { transformTasksDataToTable } from './utils.ts';
import { getFiltersSelector } from './selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { useDictionaries } from '../../api/hooks.ts';
import { BASE_DICTIONARIES_META } from './constants.ts';
import type { IDict } from './types.ts';

export const useTableData = () => {
	const { dictionaries } = useDictionaries(BASE_DICTIONARIES_META);
	const filters = useAppSelector(getFiltersSelector());

	const { tableData } = useGetTasksQuery(
		{ filters },
		{
			selectFromResult: (result) => {
				if (!result?.isSuccess || !Object.keys(dictionaries).length)
					return { tableData: [], isTableDataLoading: false };

				return {
					tableData: transformTasksDataToTable(result.data.tasks, dictionaries as IDict),
					isTableDataLoading: result.isLoading,
				};
			},
		},
	);

	return tableData;
};
