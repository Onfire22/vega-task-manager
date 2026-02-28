import { format } from 'date-fns';
import { useGetTaskQuery } from '../../api/queries/task.api.ts';
import { useGetUsersQuery } from '../../api/queries/users.api.ts';
import { useDictionaries } from '../../shared/hooks.ts';
import { DATE_FORMAT } from '../tasks-page/constants.ts';

export const useTask = (uuid?: string) => {
	const { dictionaries } = useDictionaries();
	const { data: usersListData } = useGetUsersQuery();

	const { task, isTasksLoading } = useGetTaskQuery(uuid!, {
		skip: !uuid,
		selectFromResult: (result) => {
			if (!result?.isSuccess || !dictionaries) return { tasks: [], isTasksLoading: false };

			const { task_priority, stack_type, task_status } = dictionaries;

			const { data, isLoading } = result;

			const reporter = usersListData?.usersList.find((item) => item.id === data.task.reporterUuid);
			const assignee = usersListData?.usersList.find((item) => item.id === data.task.assigneeUuid);

			const reporterName = reporter ? `${reporter?.name} ${reporter?.secondName}` : '-';
			const assigneeName = assignee ? `${assignee?.name} ${assignee?.secondName}` : 'unassigned';

			return {
				task: {
					...data.task,
					taskPriorityUuid: task_priority.find((item) => item.id === data.task.taskPriorityUuid)?.name ?? '-',
					taskStackUuid: stack_type.find((item) => item.id === data.task.taskStackUuid)?.name ?? '-',
					taskStatusUuid: task_status.find((item) => item.id === data.task.taskStatusUuid)?.name ?? '-',
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
