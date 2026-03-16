import { useGetTasksQuery } from '../../api/queries/tasks.api.ts';
import { getFiltersSelector } from './selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';
import { useDictionaries } from '../../api/hooks.ts';
import { useMemo } from 'react';

export const useUserTasks = () => {
	const filters = useAppSelector(getFiltersSelector());
	const { data, isSuccess, isLoading } = useGetTasksQuery(filters);

	if (!isSuccess) return { userTasks: [], isTasksLoading: isLoading };

	const tasks = data.tasks.map((item) => {
		return {
			...item,
			createdAt: format(item.createdAt, DATE_FORMAT),
		};
	});

	return { userTasks: tasks, isTasksLoading: isLoading };
};

export const useKanbanTasks = () => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(['TASK_STATUS']);
	const { userTasks, isTasksLoading } = useUserTasks();

	const isColumnsLoading = isDictionariesLoading || isTasksLoading;

	const columns = useMemo(
		() =>
			isColumnsLoading
				? []
				: dictionaries?.taskStatus?.map((item) => {
						return {
							id: item.id,
							label: item.label,
							tasks: userTasks.filter((task) => task.taskStatus.id === item.id),
						};
					}),
		[dictionaries?.taskStatus, userTasks, isColumnsLoading],
	);

	return {
		columns,
		isColumnsLoading,
	};
};
