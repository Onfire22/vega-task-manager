import { format } from 'date-fns';
import { useDictionaries, useTask, useUsers } from '../../api/hooks.ts';
import { DATE_FORMAT, DICTIONARIES_META, TASK_STATUS_NUMBER } from './constants.ts';

export const useTaskData = (uuid?: string) => {
	const { dictionaries, isDictionariesLoading } = useDictionaries(DICTIONARIES_META);
	const { usersList, isUsersLoading } = useUsers();
	const { task, isTaskLoading } = useTask(uuid);

	const idTaskDataLoading = isTaskLoading || isDictionariesLoading || isUsersLoading;

	if (!task || !usersList.length || !Object.keys(dictionaries).length)
		return { task: null, isTaskLoading: idTaskDataLoading, activeTaskStatus: 0 };

	const { task_priority, stack_type, task_status } = dictionaries;

	const reporter = usersList.find((item) => item.id === task.reporterUuid);
	const assignee = usersList.find((item) => item.id === task.assigneeUuid);

	const reporterName = reporter ? `${reporter?.name} ${reporter?.secondName}` : '-';
	const assigneeName = assignee ? `${assignee?.name} ${assignee?.secondName}` : 'unassigned';

	const taskPriorityUuid = task_priority?.find((item) => item.id === task.taskPriorityUuid);
	const taskStackUuid = stack_type?.find((item) => item.id === task.taskStackUuid);
	const taskStatusUuid = task_status?.find((item) => item.id === task.taskStatusUuid);

	const taskData = {
		...task,
		taskPriorityUuid: { name: taskPriorityUuid?.name || '-', color: taskPriorityUuid?.color },
		taskStackUuid: { name: taskStackUuid?.name || '-', color: taskStackUuid?.color },
		taskStatusUuid: { name: taskStatusUuid?.name || '-', color: taskStatusUuid?.color },
		reporterUuid: reporterName,
		assigneeUuid: assigneeName,
		updatedAt: format(new Date(task.updatedAt), DATE_FORMAT),
		createdAt: format(new Date(task.createdAt), DATE_FORMAT),
	};

	const activeTaskStatus = TASK_STATUS_NUMBER[taskData.taskStatusUuid.name as keyof typeof TASK_STATUS_NUMBER];

	return {
		task: taskData,
		activeTaskStatus,
		isTasksLoading: idTaskDataLoading,
	};
};
