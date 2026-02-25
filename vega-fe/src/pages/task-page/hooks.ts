import { useGetDictionariesQuery } from '../../api/queries/dictionaries.api.ts';
import { BASE_DICTIONARIES_META, DATE_FORMAT } from '../tasks-page/constants.ts';
import { useGetTaskQuery } from '../../api/queries/task.api.ts';
import { format } from 'date-fns';

export const useDictionaries = () => {
	const {
		data: dictionaries,
		isLoading,
		isSuccess,
	} = useGetDictionariesQuery(BASE_DICTIONARIES_META, {
		refetchOnMountOrArgChange: false,
		refetchOnFocus: false,
		refetchOnReconnect: false,
	});

	if (isSuccess) {
		return { dictionaries: dictionaries.payload, isDictionariesLoading: isLoading };
	}

	return { dictionaries: null, selectorsData: null };
};

export const useTasks = (uuid?: string) => {
	const { dictionaries } = useDictionaries();

	const { task, isTasksLoading } = useGetTaskQuery(uuid!, {
		skip: !uuid,
		selectFromResult: (result) => {
			if (!result?.isSuccess || !dictionaries) return { tasks: [], isTasksLoading: false };

			const { task_priority, stack_type, task_status } = dictionaries;

			const { data, isLoading } = result;

			return {
				task: {
					...data.task,
					taskPriorityUuid: task_priority.find((item) => item.id === data.task.taskPriorityUuid)?.name ?? '-',
					taskStackUuid: stack_type.find((item) => item.id === data.task.taskStackUuid)?.name ?? '-',
					taskStatusUuid: task_status.find((item) => item.id === data.task.taskStatusUuid)?.name ?? '-',
					updatedAt: format(new Date(data.task.updatedAt), DATE_FORMAT),
					createdAt: format(new Date(data.task.createdAt), DATE_FORMAT),
				},
				isTasksLoading: isLoading,
			};
		},
	});

	return { task, isTasksLoading };
};
