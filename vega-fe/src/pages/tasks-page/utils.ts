import type { IDict, IDictionary, ITask } from './types.ts';
import { format } from 'date-fns';
import { DATE_FORMAT } from './constants.ts';

export const transformDictionaries = (dictionary: Array<IDictionary>) => {
	return dictionary.map((item) => {
		return { label: item.name, value: item.id };
	});
};

export const transformTasksDataToTable = (tasks: Array<ITask>, dictionaries: IDict) => {
	if (!tasks.length || !dictionaries) return [];

	return tasks.map((task) => {
		const taskStack = dictionaries.stack_type.find((item) => item.id === task.taskStackUuid);
		const taskStatus = dictionaries.task_status.find((item) => item.id === task.taskStatusUuid);
		const taskPriority = dictionaries.task_priority.find((item) => item.id === task.taskPriorityUuid);

		return {
			...task,
			createdAt: format(new Date(task.createdAt), DATE_FORMAT),
			taskPriorityUuid: {
				name: taskPriority?.name || '-',
				color: taskPriority?.color ?? '#fff',
			},
			taskStackUuid: {
				name: taskStack?.name ?? '-',
				color: taskStack?.color ?? '#fff',
			},
			taskStatusUuid: {
				name: taskStatus?.name ?? '-',
				color: taskStatus?.color ?? '#fff',
			},
		};
	});
};
