import { useGetTasksQuery } from '@/api/tasks/tasks.api.ts';
import { getFiltersSelector } from './selectors.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';
import { useMemo } from 'react';
import { getPaginationPages } from '@/app/utils.ts';
import { useDictionaries } from '@/api/dictionaries/dictionaries.hooks.ts';

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
			assignee: item.assignee ? `${item.assignee.name} ${item.assignee.secondName}` : null,
			reporter: `${item.reporter?.name} ${item.reporter?.secondName}`,
			estimatedTime: item.logInfo?.estimateTime?.time || '-',
			loggedTime: item.logInfo?.totalLoggedTime?.time || '-',
			createdAt: format(item.createdAt, DATE_FORMAT),
			updatedAt: format(item.updatedAt, DATE_FORMAT),
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
							key: item.key,
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
