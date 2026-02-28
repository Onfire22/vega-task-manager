import { useGetTasksQuery } from '../../api/queries/tasks.api.ts';
import { transformTasksDataToTable } from './utils.ts';
import { getFiltersSelector } from './selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { useDictionaries } from '../../shared/hooks.ts';

export const useTableData = () => {
	const { dictionaries } = useDictionaries();
	const filters = useAppSelector(getFiltersSelector());

	const { tableData } = useGetTasksQuery(
		{ filters },
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
