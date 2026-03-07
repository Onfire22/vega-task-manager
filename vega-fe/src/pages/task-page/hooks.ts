import { format } from 'date-fns';
import { useGetTaskQuery } from '../../api/queries/tasks.api.ts';
import { useDictionaries, useUsers } from '../../api/hooks.ts';
import { DATE_FORMAT, DICTIONARIES_META } from './constants.ts';

export const useTask = (uuid?: string) => {
	const { dictionaries } = useDictionaries(DICTIONARIES_META);
	const { usersList } = useUsers();

	const { task, isTasksLoading } = useGetTaskQuery(uuid!, {
		skip: !uuid,
		selectFromResult: (result) => {
			if (!result?.isSuccess || !dictionaries) return { tasks: [], isTasksLoading: false };

			const { task_priority, stack_type, task_status } = dictionaries;

			const { data, isLoading } = result;

			const reporter = usersList.find((item) => item.id === data.task.reporterUuid);
			const assignee = usersList.find((item) => item.id === data.task.assigneeUuid);

			const reporterName = reporter ? `${reporter?.name} ${reporter?.secondName}` : '-';
			const assigneeName = assignee ? `${assignee?.name} ${assignee?.secondName}` : 'unassigned';

			const taskPriorityUuid = task_priority?.find((item) => item.id === data.task.taskPriorityUuid);
			const taskStackUuid = stack_type?.find((item) => item.id === data.task.taskStackUuid);
			const taskStatusUuid = task_status?.find((item) => item.id === data.task.taskStatusUuid);

			return {
				task: {
					...data.task,
					taskPriorityUuid: { name: taskPriorityUuid?.name || '-', color: taskPriorityUuid?.color },
					taskStackUuid: { name: taskStackUuid?.name || '-', color: taskStackUuid?.color },
					taskStatusUuid: { name: taskStatusUuid?.name || '-', color: taskStatusUuid?.color },
					reporterUuid: reporterName,
					assigneeUuid: assigneeName,
					updatedAt: format(new Date(data.task.updatedAt), DATE_FORMAT),
					createdAt: format(new Date(data.task.createdAt), DATE_FORMAT),
				},
				isTasksLoading: isLoading,
			};
		},
	});

	return { task, isTasksLoading };
};
