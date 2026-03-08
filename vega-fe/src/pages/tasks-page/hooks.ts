import { useGetTasksQuery } from '../../api/queries/tasks.api.ts';
import { getFiltersSelector } from './selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';

export const useTableData = () => {
	const filters = useAppSelector(getFiltersSelector());
	const { data, isSuccess, isLoading } = useGetTasksQuery({ filters });

	if (!isSuccess) return { tableData: [], isTasksLoading: isLoading };

	const tasks = data.tasks.map((item) => {
		return {
			...item,
			createdAt: format(item.createdAt, DATE_FORMAT),
		};
	});

	return { tableData: tasks, isTasksLoading: isLoading };
};
