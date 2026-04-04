import { useGetTasksQuery } from '../../api/queries/tasks.api.ts';
import { getFiltersSelector } from './selectors.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';
import { useDictionaries } from '../../api/hooks.ts';
import { useMemo } from 'react';
import { getPaginationPages } from '@/app/utils.ts';

export const useUserTasks = () => {
	const filters = useAppSelector(getFiltersSelector());

	const { data, isSuccess, isLoading } = useGetTasksQuery(filters);

	if (!isSuccess)
		return {
			userTasks: [],
			pagination: { pages: [], activePage: 1, totalPages: 0, hasNext: false, hasPrev: false },
			isTasksLoading: isLoading,
		};

	const paginationPages = getPaginationPages(data.meta.page, data.meta.totalPages);

	const tasks = data.tasks.map((item) => {
		return {
			...item,
			estimatedTime: item.logInfo?.estimateTime?.time || '-',
			loggedTime: item.logInfo?.totalLoggedTime?.time || '-',
			createdAt: format(item.createdAt, DATE_FORMAT),
		};
	});

	const pagination = {
		pages: paginationPages,
		activePage: data.meta.page,
		totalPages: data.meta.totalPages,
		hasNext: data.meta.hasNext,
		hasPrev: data.meta.hasPrev,
	};

	return { userTasks: tasks, pagination, isTasksLoading: isLoading };
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
