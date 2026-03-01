import { useGetTasksQuery } from '../../api/queries/tasks.api.ts';
import { useGetUsersQuery } from '../../api/queries/users.api.ts';
import { transformTasksDataToTable } from './utils.ts';
import { getFiltersSelector } from './selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { useDictionaries } from '../../shared/hooks.ts';
import { BASE_DICTIONARIES_META } from './constants.ts';

export const useTableData = () => {
	const { dictionaries } = useDictionaries(false, BASE_DICTIONARIES_META);
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

export const useUsersData = () => {
	const { data, isLoading } = useGetUsersQuery();

	const userList =
		data?.usersList.map((item) => ({ value: item.id, label: `${item.name} ${item.secondName}` })) ?? [];

	return {
		userList,
		isLoading,
	};
};
